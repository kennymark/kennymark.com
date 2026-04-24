import sgMail from '@sendgrid/mail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email, subject, message, name } = await request.json();
        const apiKey = process.env.EMAIL_API_KEY;

        if (!apiKey) {
          return Response.json({ error: 'EMAIL_API_KEY is missing' }, { status: 500 });
        }

        sgMail.setApiKey(apiKey);

        try {
          await sgMail.send({
            to: 'geniounico@outlook.com',
            from: email,
            subject,
            name,
            text: message,
          });
          return Response.json({ message: 'Email has been successfully sent' });
        } catch {
          return Response.json({ error: 'Error sending email' }, { status: 500 });
        }
      },
    },
  },
});
