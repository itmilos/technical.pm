interface EmailData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  formType: 'contact' | 'consultation' | 'project' | 'engagement';
  additionalFields?: Record<string, string>;
}

export async function sendEmail(data: EmailData): Promise<void> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    if (!result.success) {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error in sendEmail:', error);
    throw error;
  }
} 