import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CHURCH_NOTIFY_EMAIL } = process.env;
const transporter = SMTP_HOST
  ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 587, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  : null;

export async function notifyChurch({ name, email, phone, message }) {
  if (!transporter) return; // email not configured: the message is still saved in the database
  await transporter.sendMail({
    from: `"EAR Kacyiru website" <${SMTP_USER}>`,
    to: CHURCH_NOTIFY_EMAIL,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\nPhone: ${phone || 'n/a'}\n\n${message}`,
  });
}
