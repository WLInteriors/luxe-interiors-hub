import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const MAX_NAME = 200
const MAX_EMAIL = 320
const MAX_PHONE = 50
const MAX_PROJECT = 100
const MAX_MESSAGE = 5000
const MAX_ATTACHMENTS = 5
const ALLOWED_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif',
  'video/mp4', 'video/quicktime', 'video/webm',
])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function bad(msg: string, status = 400) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return bad('Method not allowed', 405)

  const url = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(url, serviceKey)

  let body: any
  try { body = await req.json() } catch { return bad('Invalid JSON') }

  const id: string = typeof body.id === 'string' && /^[0-9a-f-]{36}$/i.test(body.id) ? body.id : crypto.randomUUID()
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, MAX_PHONE) : ''
  const projectType = typeof body.project_type === 'string' ? body.project_type.trim().slice(0, MAX_PROJECT) : ''
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE) : ''
  const attachmentsIn: any[] = Array.isArray(body.attachments) ? body.attachments : []

  if (!name || name.length > MAX_NAME) return bad('Invalid name')
  if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) return bad('Invalid email')
  if (attachmentsIn.length > MAX_ATTACHMENTS) return bad('Too many attachments')

  // Validate attachments: must reference real objects in our bucket under id/ prefix
  const attachments: { name: string; path: string; size: number; type: string }[] = []
  for (const a of attachmentsIn) {
    if (!a || typeof a.path !== 'string' || typeof a.name !== 'string' || typeof a.type !== 'string') {
      return bad('Invalid attachment')
    }
    if (!ALLOWED_TYPES.has(a.type)) return bad('Disallowed attachment type')
    if (!a.path.startsWith(`${id}/`)) return bad('Attachment path mismatch')
    // Confirm the object exists in storage
    const { data: head, error } = await supabase.storage
      .from('consultation-uploads')
      .createSignedUrl(a.path, 60)
    if (error || !head) return bad('Attachment not found')
    attachments.push({
      name: String(a.name).slice(0, 255),
      path: a.path,
      size: Number(a.size) || 0,
      type: a.type,
    })
  }

  const { error: insertErr } = await supabase.from('consultation_inquiries').insert({
    id,
    name,
    email,
    phone: phone || null,
    project_type: projectType || null,
    message: message || null,
    attachments,
  })
  if (insertErr) {
    console.error('Insert failed', insertErr)
    return bad('Failed to save inquiry', 500)
  }

  // Fire notification + confirmation via service-role authenticated invocation.
  const sendEmail = (payload: Record<string, unknown>) =>
    fetch(`${url}/functions/v1/send-transactional-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify(payload),
    }).catch((e) => console.error('Email dispatch failed', e))

  await sendEmail({
    templateName: 'consultation-notification',
    idempotencyKey: `consult-notify-${id}`,
    templateData: { name, email, phone, projectType, message, attachments },
  })

  await sendEmail({
    templateName: 'consultation-confirmation',
    recipientEmail: email,
    idempotencyKey: `consult-confirm-${id}`,
    templateData: { name },
  })

  return new Response(JSON.stringify({ success: true, id }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
