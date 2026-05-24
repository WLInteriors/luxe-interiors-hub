import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Westchester Luxury Interiors'

interface Props {
  name?: string
  email?: string
  phone?: string
  projectType?: string
  message?: string
}

const ConsultationNotificationEmail = ({
  name, email, phone, projectType, message,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New consultation inquiry from {name || 'a website visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Consultation Inquiry</Heading>
        <Text style={text}>A visitor submitted the consultation form on {SITE_NAME}.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Project Type</Text>
          <Text style={value}>{projectType || '—'}</Text>
          <Text style={label}>Message</Text>
          <Text style={value}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Reply directly to {email || 'the visitor'} to follow up.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ConsultationNotificationEmail,
  subject: (d: Record<string, any>) =>
    `New consultation inquiry${d?.name ? ` from ${d.name}` : ''}`,
  to: 'info@westchesterluxuryinteriors.com',
  displayName: 'Consultation inquiry (business notification)',
  previewData: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(914) 555-1234',
    projectType: 'Kitchen Renovation',
    message: 'Looking to fully renovate my kitchen in Rye.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'normal', color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 16px' }
const label = { fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#9a8350', margin: '12px 0 4px', fontFamily: 'Arial, sans-serif' }
const value = { fontSize: '15px', color: '#1a1a1a', margin: '0 0 8px', whiteSpace: 'pre-wrap' as const, fontFamily: 'Arial, sans-serif' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999', margin: '20px 0 0' }
