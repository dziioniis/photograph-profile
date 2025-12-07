import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/types/models';

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Send an email to yourself with the form data
    // 2. Send a confirmation email to the customer
    // 3. Store the inquiry in a database
    // 4. Potentially integrate with a CRM

    // For now, we'll just log it
    console.log('Contact form submission:', formData);

    // TODO: Implement email sending
    // Example using nodemailer or a service like SendGrid/Resend:
    /*
    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      subject: `New contact form submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
        <p><strong>Event Type:</strong> ${formData.eventType || 'N/A'}</p>
        <p><strong>Event Date:</strong> ${formData.eventDate || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    });

    await sendEmail({
      to: formData.email,
      subject: 'Thank you for contacting us',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${formData.name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Photographer</p>
      `,
    });
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
