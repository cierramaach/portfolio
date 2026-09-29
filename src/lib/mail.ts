export type MailDraft = {
  name: string
  from: string
  message: string
  to: string
}

export async function sendMail({ name, from, message, to }: MailDraft) {
  const subject = `Portfolio from ${name || from}`
  const key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

  if (key) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject,
        name: name || from,
        email: from,
        message,
      }),
    })
    if (!response.ok) throw new Error('send-failed')
    return
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: name || 'Portfolio',
        email: from,
        message,
        _subject: subject,
      }),
    },
  )

  if (response.ok) return

  const params = new URLSearchParams({
    subject,
    body: `${message}\n\n— ${name ? `${name} · ` : ''}${from}`,
  })
  window.location.href = `mailto:${to}?${params.toString()}`
}

export function destinationAddress(saved: string) {
  return saved || (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || ''
}
