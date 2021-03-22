import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, subject, message, name } = req.body
  const msg = {
    to: 'geniounico@outlook.com',
    from: email,
    subject,
    name,
    text: message,
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been successfully sent` })
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' })
  }
}
