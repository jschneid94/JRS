var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(app) {

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
          user: 'jschneid94@gmail.com',
          pass: 'Lucyarchie7449j$'
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
        let mailOptions = {
            from: `${req.body.name} <${req.body.email}>`, // sender address
            to: `jschneid94@gmail.com`, // list of receivers
            subject: `Portfolio Visitor`, // Subject line
            text: req.body.message, // plain text body
            html: `<p>${req.body.message}</p>` // html body
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