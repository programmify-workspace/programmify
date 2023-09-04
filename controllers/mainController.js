const nodemailer = require('nodemailer');
const messageModel = require('../models/messageModel');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:  process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
});

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
        from: email,
        to: 'rachaelfavour2005@gmail.com',
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
