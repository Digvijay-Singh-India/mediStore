const nodemailer = require('nodemailer');

// Email sender utility function
async function sendEmail(to, subject, text) {
 try {
  // Create a transporter with your SMTP configuration
  let transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
    user: 'yourEmail@gmail.com', // Your Gmail email address
    pass: 'yourPassword', // Your Gmail password
   },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
   from: '"Your Name" <yourEmail@gmail.com>', // sender address
   to: to, // list of receivers
   subject: subject, // Subject line
   text: text, // plain text body
   // html: '<b>Hello world?</b>' // html body
  });

  console.log('Message sent: %s', info.messageId);
  return info;
 } catch (error) {
  console.error(error);
  throw error;
 }
}

// Example usage
sendEmail(
 'recipient@example.com',
 'Test Subject',
 'This is a test email from Node.js'
)
 .then(() => console.log('Email sent successfully'))
 .catch((err) => console.error('Error sending email:', err));
