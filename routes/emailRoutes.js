var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
require("dotenv");

module.exports = function(app) {

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
          user: process.env.email,
          pass: process.env.password
        }
    }));

    // Post request when user submits a message
    app.post("/send-email", function(req, res) {
        console.log(req.body.message);
        let mailOptions = {
            from: `${req.body.email}`, // sender address
            to: process.env.email, // receiver address
            subject: `${req.body.name}`, // Sender's name as subject line
            text: `${req.body.message}`, // Message body
            replyTo: `${req.body.email}`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(mailOptions);
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        res.redirect("/");
    });
}