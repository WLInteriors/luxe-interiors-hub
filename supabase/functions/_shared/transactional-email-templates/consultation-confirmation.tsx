import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Westchester Luxury Interiors'

interface Props {
  name?: string
}

const ConsultationConfirmationEmail = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Thank you, ${name}.` : 'Thank you for reaching out.'}
        </Heading>
        <Text style={text}>
          We've received your inquiry and a member of our team will be in touch
          within 24 hours to discuss your project.
        </Text>
        <Text style={text}>
          In the meantime, feel free to call us at <strong>(914) 467-0807</strong> if
          you have any questions.
        </Text>
        <Text style={footer}>— The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ConsultationConfirmationEmail,
  subject: 'Thanks for contacting Westchester Luxury Interiors',
  displayName: 'Consultation confirmation (visitor)',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '40px 28px', maxWidth: '560px' }
const h1 = { fontSize: '24px', fontWeight: 'normal', color: '#1a1a1a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#55575d', lineHeight: '1.7', margin: '0 0 18px', fontFamily: 'Arial, sans-serif' }
const footer = { fontSize: '13px', color: '#9a8350', margin: '30px 0 0', fontFamily: 'Arial, sans-serif' }
