const BREVO_API_KEY = import.meta.env.PUBLIC_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

if (!BREVO_API_KEY) {
  throw new Error('PUBLIC_BREVO_API_KEY environment variable is not set');
}

interface EmailData {
  name?: string;
  email?: string;
  company?: string;
  subject: string;
  message?: string;
  [key: string]: string | undefined; // For additional fields
}

export async function sendEmail(data: Partial<EmailData> & { subject: string }) {
  // Ensure required fields are present
  if (!data.email) {
    throw new Error('Email is required');
  }
  if (!data.name) {
    throw new Error('Name is required');
  }
  if (!data.message) {
    throw new Error('Message is required');
  }

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: data.name,
        email: data.email,
      },
      to: [{
        email: 'milosrujevic@gmail.com',
        name: 'Milos Rujevic',
      }],
      subject: `[${data.subject}] New Contact Form Submission from ${data.name}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        ${Object.entries(data)
          .filter(([key]) => !['name', 'email', 'company', 'subject', 'message'].includes(key))
          .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
          .join('')}
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send email');
  }

  return response.json();
} 