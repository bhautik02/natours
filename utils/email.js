const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //   1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //   const transporter = nodemailer.createTransport({
  //     host: 'sandbox.smtp.mailtrap.io',
  //     port: 2525,
  //     auth: {
  //       user: '36567a3573a7ee',
  //       pass: '182173c1833912',
  //     },
  //   });

  // 2) Define the email options
  const mailOptions = {
    from: 'bhautik jani <test@2.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3)
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
