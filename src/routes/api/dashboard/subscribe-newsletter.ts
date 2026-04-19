import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

const URL = 'https://api.buttondown.email/v1/subscribers';

export const Route = createFileRoute('/api/dashboard/subscribe-newsletter')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email } = await request.json();
        const apiKey = process.env.BUTTON_API;

        if (!email) {
          return Response.json({ error: 'Email is required' }, { status: 400 });
        }
        if (!apiKey) {
          return Response.json({ error: 'BUTTON_API is missing' }, { status: 500 });
        }

        try {
          const response = await axios.post(
            URL,
            { email },
            {
              headers: { Authorization: `Token ${apiKey}` },
            },
          );

          if (response.status >= 400) {
            return Response.json(
              { error: 'There was an error subscribing to the newsletter.' },
              { status: 400 },
            );
          }

          return Response.json(
            { message: 'Successfully subscribed to the newsletter' },
            { status: 201 },
          );
        } catch {
          return Response.json(
            {
              error:
                "There was an error subscribing to the newsletter. You're either already subscribed or please try again.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
