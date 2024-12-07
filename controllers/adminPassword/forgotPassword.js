const db = require("../../db/dbConnection");
var nodemailer = require("nodemailer");
const moment = require('moment');

const forgotPassword = (req, res) => {
  var email = req.body.email;

  var currentDate = new Date().toLocaleString()
  var currentTime = moment().format('LT')
  
  if (req.body.email == "" || req.body.email == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Email",
    });
    return;
  }

  db.query(
    'SELECT name,email FROM tbl_users WHERE email = "' + req.body.email + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      }
      if (data.length === 0) {
        res.status(201).send({
          success: "false",
          message: "Please Provide Valid Email",
        });
        return;
      } else {

        db.query('UPDATE tbl_users SET forgot_password_date = "'+currentDate+'" WHERE email = "' + req.body.email + '"',(err,data)=>{
          if(err){
            res.status(500).send({
              success: 'false',
              message: err
            })
            return;
          }
        })
        var link = "http://18.179.42.37:3000/#/resetnew-password";
        //fd
        var emailText =
          "You have been invited for change password by " +
          "Who Shot App" +
          ". Click " +
          link;

        var UserName = "Hello " + data[0].name;

        var message =
          '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="http://3.112.240.86:8000/image/1674809103469.jpg" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' +
          UserName +
          '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' +
          emailText +
          '</td></tr><tr><td style="text-align:center;" ></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">WHO SHOT © 2023</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By WhoShot App</a></p></td></tr></table></div></div></body></html>';
        var subject = "WhoShot- Update your password with WhoShot";

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "mobappssolutions131@gmail.com",
            pass: "rjncjdcsyopzycqg",
          },
        });
        var mailOptions = {
          from: "mobappssolutions131@gmail.com",
          to: email,
          subject: subject,
          html: message,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

         

        setTimeout(() => {
          res.status(200).send({
            success: "true",
            message: "Email Send Successfully",
          });
          return;
        }, 1000);

        //fd
      }
    }
  );
};

module.exports = forgotPassword;
