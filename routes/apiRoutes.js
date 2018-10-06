var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var user = require("../email");

module.exports = function(app) {

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
          user: user.email,
          pass: user.password
        }
    }));

    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: account.user, // generated ethereal user
    //         pass: account.pass // generated ethereal password
    //     }
    // });

    app.post("/send-email", function(req, res) {
        console.log(req.body.message);
        let mailOptions = {
            from: `${req.body.email}`, // sender address
            to: user.email, // receiver address
            subject: `${req.body.name}`, // Sender's name as subject line
            text: `${req.body.message}`, // Message body
            replyTo: `${req.body.email}`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
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