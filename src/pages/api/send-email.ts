import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      name,
      email,
      company,
      subject,
      message,
      formType = 'contact',
      additionalFields = {}
    } = data;

    // Format additional fields if present
    const additionalFieldsHtml = Object.entries(additionalFields)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join('');

    // Format the email content based on form type
    const formTypeTitles = {
      contact: 'Contact Form',
      consultation: 'Consultation Request',
      project: 'Project Request',
      engagement: 'Engagement Request',
      process: 'Process Inquiry'
    } as const;

    const formTypeTitle = formTypeTitles[formType as keyof typeof formTypeTitles] || 'Contact Form';

    // Create email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6B46C1;">New ${formTypeTitle}</h2>

        <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4B5563; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        </div>

        ${additionalFieldsHtml ? `
          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4B5563; margin-top: 0;">Additional Information</h3>
            ${additionalFieldsHtml}
          </div>
        ` : ''}

        <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4B5563; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="color: #6B7280; font-size: 0.875rem; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
          <p>This email was sent from the contact form on technical.pm</p>
          <p>Form Type: ${formTypeTitle}</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Send the email
    await sgMail.send({
      to: {
        email: process.env.RECIPIENT_EMAIL || process.env.PUBLIC_CONTACT_EMAIL || '',
        name: 'Milos Rujevic'
      },
      from: {
        name: 'Milos Rujevic Contact Form',
        email: process.env.PUBLIC_CONTACT_EMAIL || ''
      },
      replyTo: {
        email,
        name
      },
      subject: `${formTypeTitle}: ${subject}`,
      html: htmlContent
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.error('Error sending email:', error?.response?.body || error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Failed to send email'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
