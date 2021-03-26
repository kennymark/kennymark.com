
// adapted from https://leerob.io/snippets/buttondown
import axios from 'axios'

const URL = 'https://api.buttondown.email/v1/subscribers'
const API_KEY = process.env.BUTTON_API;


export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await axios.post(URL, { email },
      {
        headers: { Authorization: `Token ${API_KEY}`, },
      }
    );

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`
      });
    }

    return res.status(201).json({ message: 'Sucessfully subscribed to the newsletter' });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: `There was an error subscribing to the newsletter, you're either already subscribed or please try again` });
  }
};