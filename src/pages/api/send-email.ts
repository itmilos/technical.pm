import type { APIRoute } from 'astro';
import * as SibApiV3Sdk from '@getbrevo/brevo';

// Initialize Brevo API clients
const emailApiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const contactsApiInstance = new SibApiV3Sdk.ContactsApi();

// Set API key for both clients
const apiKey = process.env.PUBLIC_BREVO_API_KEY;
emailApiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);
contactsApiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey);

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

    // Create contact attributes
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.attributes = {
      FIRSTNAME: name.split(' ')[0],
      LASTNAME: name.split(' ').slice(1).join(' '),
      COMPANY: company || '',
      LAST_CONTACT: new Date().toISOString(),
      FORM_TYPE: formType,
      ...additionalFields
    };
    createContact.listIds = [2]; // Add to your contact list
    createContact.updateEnabled = true;

    try {
      // Try to create the contact
      await contactsApiInstance.createContact(createContact);
    } catch (error: any) {
      if (error.status === 400) {
        // Contact already exists, update it
        const updateContact = new SibApiV3Sdk.UpdateContact();
        updateContact.attributes = createContact.attributes;
        updateContact.listIds = createContact.listIds;
        
        await contactsApiInstance.updateContact(email, updateContact);
      } else {
        console.error('Error in contact management:', error);
        // Don't throw - we still want to try sending the email
      }
    }

    // Format additional fields if present
    const additionalFieldsHtml = Object.entries(additionalFields)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join('');

    // Format the email content based on form type
    const formTypeTitles = {
      contact: 'Contact Form',
      consultation: 'Consultation Request',
      project: 'Project Request',
      engagement: 'Engagement Request'
    } as const;

    const formTypeTitle = formTypeTitles[formType as keyof typeof formTypeTitles] || 'Contact Form';

    // Create email content
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = `${formTypeTitle}: ${subject}`;
    sendSmtpEmail.htmlContent = `
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

    sendSmtpEmail.sender = { 
      name: "Milos Rujevic Contact Form", 
      email: process.env.PUBLIC_CONTACT_EMAIL
    };
    sendSmtpEmail.to = [{ 
      email: process.env.PUBLIC_CONTACT_EMAIL || '', 
      name: 'Milos Rujevic' 
    }];
    sendSmtpEmail.replyTo = { 
      email: email, 
      name: name 
    };

    // Send the email
    await emailApiInstance.sendTransacEmail(sendSmtpEmail);

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
    console.error('Error sending email:', error);
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