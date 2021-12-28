const nodemailer = require('nodemailer');
const httpMsgs = require("http-msgs");
module.exports.send_mail = function(req, res, next) {
    var transporter = nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        auth: {
            user: 'testnodemailmang@gmail.com', //mail account 
            pass: 'anhmang123' // password maiil account
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
      <div style="padding: 10px; background-color: #003375">
          <div style="padding: 10px; background-color: white;">
              <h4 style="color: #0085ff">Cảm ơn bạn đã đăng ký </h4>
              <span style="color: black">Chúng tôi sẽ sớm lên hệ và gửi các thông tin sớm đến bạn</span>
          </div>
      </div>
  `;
    var mainOptions = { // Content send mail
        from: 'testnodemailmang@gmail.com',
        to: req.body.testmail,
        subject: 'Thư cảm ơn',
        html: content // content above
    }
    transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
            console.log(err);

        } else {
            res.redirect('./')
        }
    });
}
module.exports.send_mail2 = function(req, res, next) {
    var data = req.body;
    var transporter = nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        auth: {
            user: 'testnodemailmang@gmail.com', //mail account 
            pass: 'anhmang123' // password maiil account
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
      <div style="padding: 10px; background-color: #003375">
          <div style="padding: 10px; background-color: white;">
              <h4 style="color: #0085ff">Cảm ơn bạn đã đăng ký </h4>
              <span style="color: black">Chúng tôi sẽ sớm lên hệ và gửi các thông tin sớm đến bạn</span>
          </div>
      </div>
  `;
    var mainOptions = { // Content send mail
        from: 'testnodemailmang@gmail.com',
        to: data.data,
        subject: 'Thư cảm ơn',
        html: content // content above
    }
    transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            httpMsgs.sendJSON(req, res,{'boolean': true})
        }
    });
}