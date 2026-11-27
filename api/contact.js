// Vercel Function: receives the consultation form and emails it to the
// CLM inbox through the existing info@ mailbox (SMTP).
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   SMTP_HOST   mail server, e.g. premium144.web-hosting.com
//   SMTP_PORT   465 (SSL)
//   SMTP_USER   the mailbox that sends, e.g. info@clmconsultants.co.tz
//   SMTP_PASS   that mailbox's password (entered by the owner, never in code)
//   CONTACT_TO  where requests are delivered (defaults to SMTP_USER)
import { metric } from '@vercel/functions'
import nodemailer from 'nodemailer'

const LIMITS = {
  name: 200,
  organisation: 200,
  organisation_type: 60,
  email: 255,
  phone: 40,
  service_of_interest: 120,
  preferred_language: 30,
  deadline: 40,
  message: 5000,
}
const REQUIRED = ['name', 'organisation', 'organisation_type', 'email', 'service_of_interest', 'preferred_language', 'message']
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

const json = (body, status = 200) => Response.json(body, { status })

function clean(value, max) {
  return typeof value === 'string' ? value.replace(/[\r\u0000]/g, '').trim().slice(0, max) : ''
}

function validate(input) {
  const data = {}
  const errors = {}
  for (const [field, max] of Object.entries(LIMITS)) data[field] = clean(input[field], max)
  for (const field of REQUIRED) {
    if (!data[field]) errors[field] = ['This field is required.']
  }
  if (data.email && !EMAIL_PATTERN.test(data.email)) errors.email = ['Please enter a valid email address.']
  if (data.message && data.message.length < 10) errors.message = ['Please write at least a short sentence.']
  return { data, errors }
}

function sameSite(request) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === new URL(request.url).host
  } catch {
    return false
  }
}

export async function POST(request) {
  const startedAt = performance.now()
  const done = (outcome, body, status) => {
    metric('contact_form.submitted', 1, { outcome })
    metric('contact_form.duration_ms', performance.now() - startedAt, { outcome })
    return json(body, status)
  }

  if (!sameSite(request)) return done('rejected', { message: 'Not allowed.' }, 403)

  let input
  try {
    input = await request.json()
  } catch {
    return done('invalid', { message: 'Invalid request.' }, 400)
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(input?.company_website, 200)) return done('spam', { ok: true }, 200)

  const { data, errors } = validate(input || {})
  if (Object.keys(errors).length) return done('invalid', { message: 'Please check the form.', errors }, 422)

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('contact: SMTP settings are missing')
    return done('not_configured', { message: 'The form is not set up yet.' }, 503)
  }

  const port = Number(SMTP_PORT || 465)
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const text = [
    'New consultation request from clmconsultants.co.tz',
    '',
    `Name: ${data.name}`,
    `Organisation: ${data.organisation} (${data.organisation_type})`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || '-'}`,
    `Service of interest: ${data.service_of_interest}`,
    `Preferred language: ${data.preferred_language}`,
    `Report or evaluation due: ${data.deadline || "-"}`,
    '',
    'Message:',
    data.message,
  ].join('\n')

  try {
    await transport.sendMail({
      from: `"CLM website" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
      subject: `Consultation request: ${data.service_of_interest} - ${data.organisation}`,
      text,
    })
  } catch (error) {
    console.error('contact: sending failed', error?.code || error?.message)
    return done('send_failed', { message: 'We could not send your request just now.' }, 502)
  }

  return done('success', { ok: true }, 200)
}
