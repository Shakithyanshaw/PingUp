import nodemaiiler from 'nodemailer';

//Create a transporter object using SMTP settions
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sentEmail = async ({ to, subject, body }) => {
  const response = await transporter.sentEmail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
  });
  return response;
};

export default sentEmail;
