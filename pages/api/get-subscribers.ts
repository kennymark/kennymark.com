import axios from 'axios'


//adapted from https://leerob.io/snippets/buttondown-subscribers


export default async (_, res) => {
  const API_KEY = process.env.BUTTONDOWN_API_KEY;
  const response = await axios.get('https://api.buttondown.email/v1/subscribers', {
    headers: {
      Authorization: `Token ${API_KEY}`,
      'Content-Type': 'application/json'
    },
  });

  const { count } = await response.data;

  return res.status(200).json({ count });
};