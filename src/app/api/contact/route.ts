import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Configure nodemailer transporter
    // IMPORTANT: Store these credentials in environment variables, not directly in code!
    // Create a .env.local file in your project root and add:
    // EMAIL_SERVER_USER=your_email_address
    // EMAIL_SERVER_PASSWORD=your_email_password
    // EMAIL_TO=recipient_email_address
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email provider
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER, // Sender address
      to: process.env.EMAIL_TO, // List of receivers
      replyTo: email, // So you can reply directly to the sender
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Message:</strong></li>
        </ul>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    // It's good practice to check the error type if possible
    // For example, if (error instanceof NodemailerError) { ... }
    return NextResponse.json({ message: 'Error sending email', error: (error as Error).message }, { status: 500 });
  }
} 