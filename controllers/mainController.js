const nodemailer = require('nodemailer');
const messageModel = require('../models/messageModel');

// Ensure transporter is declared properly
let transporter;

if (process.env.NODE_ENV === 'production') {
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_PROD_PORT,
    secure: true,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS,
    },
  });
} else {
  // Development environment configuration
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_DEV_PORT,
    secure: false,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS,
    },
  });
}

module.exports = {
  joinWaitlist: async (req, res) => {
    const { full_name, email } = req.body;

    try {
      // Save the message to the database
      await messageModel.saveMessage({ full_name, email });

      // Fetch the waitlist count from the database
      const waitlistCount = await messageModel.getWaitlistCount();

      // Send a confirmation email to the user
      const userMailOptions = {
        from: process.env.ZOHO_ADMIN_EMAIL,
        to: email,
        subject: '🚀 Welcome to Programmify: Your Waitlist Confirmation!',
        html: `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #003a77;
            color: #fff;
            text-align: center;
            padding: 20px 0;
          }
          .content {
            padding: 20px;
            background-color: #f8f8f8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #fff;">Welcome to Programmify</h1>
            <p style="color: #fff;">Your Waitlist Confirmation</p>
          </div>
          <div class="content">
            <p>Hey ${full_name},</p>
            <p>Awesome news! You're officially on the waitlist for Programmify's big launch. You're #${waitlistCount} in line – get ready for something exciting!</p>
            <p style="color: #333;">Here's the lowdown: Programmify is all about helping programmers (like you!) unleash their creative tech genius. We're here to inspire innovation, spark personal growth, and make a real impact through code.</p>
            <!-- Continue with your content -->
            <p>Our first product? Our flagship product? Space! Imagine Space as a grand stage to spotlight your code-driven creations. Here, you can showcase your innovations, share your code-based masterpieces, receive ratings, and collaborate with fellow developers. What sets us apart? Programmify propels your creation into the spotlight for millions to see.</p>
            <p>But here's the fun part: We want YOU to be part of our journey. Help us spread the word – tell your friends!</p>
            <p>Share the excitement here: <a href="https://twitter.com/intent/tweet?text=Excited%20to%20join%20the%20Programmify%20waitlist!%20Sign%20up%20now:%20https%3A%2F%2Fprogrammify.org%2F" target="_blank"> Tweet about it</a></p>
            <p>Stay tuned for more updates!</p>
            <p>Cheers,<br />Tony Cletus - CEO<br />Programmify Ltd</p><br>
            <img src="cid:logoImage" alt="Programmify Image" width="300">
          </div>
        </div>
      </body>
    </html>
  `,
  attachments: [
    {
      filename: 'logo.png',
      path: 'public/image/logo.png',
      cid: 'logoImage', 
    },
  ],
      };

      // Send the confirmation email
      await transporter.sendMail(userMailOptions);

      // Send the email to the admin
      const adminMailOptions = {
        from: process.env.ZOHO_ADMIN_EMAIL,
        to: process.env.ZOHO_ADMIN_EMAIL,
        subject: 'New Message from Programmify waitlist',
        text: `Name: ${full_name}\nEmail: ${email}`,
      };

      await transporter.sendMail(adminMailOptions);

      // Respond to the client with a success message
      res.send('Message sent successfully');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};
