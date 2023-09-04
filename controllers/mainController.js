const nodemailer = require('nodemailer');
const messageModel = require('../models/messageModel');

if (process.env.NODE_ENV === 'production') {
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_PROD_PORT,
    secure: true,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS
    }
  })
} else {
  // Development environment configuration
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_DEV_PORT,
    secure: false,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS
    }
  });
}

module.exports = {
  joinWaitlist: (req, res) => {
    const { full_name, email } = req.body;

    // Save the message to the database
    messageModel.saveMessage({ full_name, email }, (err, result) => {
      if (err) {
        console.error('Error saving message to the database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Send the email
      const mailOptions = {
        from: process.env.ZOHO_ADMIN_EMAIL,
        to: process.env.ZOHO_ADMIN_EMAIL,
        subject: 'New Message from Programmify waitlist',
        text: `Name: ${full_name}\nEmail: ${email}`,
      };

      // Use transporter.sendMail, not transporter.joinWaitlist
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Internal Server Error');
          return;
        }

        // Show SweetAlert message on success
        res.send('Message sent successfully');
      });
    });
  },
};
