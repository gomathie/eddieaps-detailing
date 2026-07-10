import type { H3Event } from 'h3'

/**
 * Sends an admin notification email via Resend. No-op (safe) when the
 * RESEND_API_KEY / NOTIFY_EMAIL secrets are not configured, so form
 * submissions never fail because of email problems.
 */
export async function sendNotification(event: H3Event, subject: string, html: string) {
  const config = useRuntimeConfig(event)
  const apiKey = config.resendApiKey
  const to = config.notifyEmail

  if (!apiKey || !to) return // notifications not configured yet

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: {
        from: config.notifyFrom || 'Eddie APS Detailing <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      },
    })
  } catch (error) {
    console.error('Notification email failed to send:', error)
  }
}
