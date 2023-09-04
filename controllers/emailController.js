const path = require('path');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({
  storage: storage,
}).single('image');

function sendEmailController(req, res) {

  // execute the middleware to upload the image
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end('Something went wrong');
    }

    const { to, subject, body } = req.body;
    const filePath = req.file.path;

    console.log(to);
    console.log(subject);
    console.log(body);
    console.log(filePath);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rachaelfavour2005@gmail.com',
        pass: 'yasgxvdxrtbkordk',
      },
      connectionTimeout: 5 * 60 * 1000,
    });

    let mailOptions = {
      from: 'rachaelfavour2005@gmail.com',
      to: to,
      subject: subject,
      text: body,
      attachments: [
        {
          path: filePath,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return res.end('Something went wrong');
      } 
      
      else {
        console.log('Email Sent: ' + info.response);
        return res.redirect('index.html');
      }
    });
  });
}

module.exports = {
  sendEmailController,
};
