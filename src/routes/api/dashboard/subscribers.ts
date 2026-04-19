import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

export const Route = createFileRoute('/api/dashboard/subscribers')({
  server: {
    handlers: {
      GET: async () => {
        const apiKey = process.env.BUTTON_API;
        if (!apiKey) {
          return Response.json({ count: 0 });
        }

        const response = await axios.get('https://api.buttondown.email/v1/subscribers', {
          headers: { Authorization: `Token ${apiKey}` },
        });

        const { count } = response.data;
        return Response.json({ count });
      },
    },
  },
});
