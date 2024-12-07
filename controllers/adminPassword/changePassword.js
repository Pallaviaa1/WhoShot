const db = require("../../db/dbConnection");
const CryptoJS = require("crypto-js");
const moment = require('moment')

const changePassword = (req, res) => {
  // const password = req.body.password;
  const newpassword = req.body.newpassword;
  const HashNewPassword = CryptoJS.MD5(newpassword);

  if(!req.body.id  || req.body.id === null){
    res.status(400).send({
      success: "Please Provide Id"
    })
    return;
  }

  if(req.body.newpassword == "" || req.body.newpassword == null){
    res.status(400).send({
      success: "false",
      message: "Please Enter New Password"
    })
    return;
  }

  db.query('SELECT forgot_password_date FROM tbl_users WHERE email = "mobappssolutions153@gmail.com"',(err,data)=>{
    if(err){
      res.status(500).send({
        success: "false",
        message: err
      })
      return;
    }

var currentDate = Date.now()
      
var diff = Math.abs(new Date(data[0].forgot_password_date) - new Date(currentDate));

var minutes = Math.floor((diff/1000)/60);


      if(minutes > 10){
        
        res.status(201).send({
          success: "false",
          message: "Link has been Expired"
        })
        return;
      }

      else{
        db.query(
          'UPDATE tbl_users SET password = "' +
            HashNewPassword +
            '"  WHERE id ="' +
            req.body.id +
            '"',
          function (errNext, respNext) {
            if (errNext) {
              res.status(500).send({ message: errNext });
              return;
            } else {
              res.status(200).send({
                success: true,
                message: "Password Updated Successfully",
              });
              return;
            }
          }
        );

      }
    
  })

        
      
    }
  


module.exports = changePassword;