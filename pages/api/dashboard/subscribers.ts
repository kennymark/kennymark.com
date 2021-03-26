import axios from 'axios'


//adapted from https://leerob.io/snippets/buttondown-subscribers
const API_KEY = process.env.BUTTON_API;


export default async (_, res) => {
  const response = await axios.get('https://api.buttondown.email/v1/subscribers', {
    headers: { Authorization: `Token ${API_KEY}` },
  });

  const { count } = await response.data;

  return res.status(200).json({ count });
};