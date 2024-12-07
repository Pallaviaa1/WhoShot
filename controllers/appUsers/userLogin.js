const db = require("../../db/dbConnection");
const md5Hash = require("crypto-js");


const userLogin = (req, res) => {
  if (!req.body.email ||req.body.email == " " || req.body.email == null) {
    return res.status(400).send({
      success: "false",
      msg: "email  is empty!",
    });
  }
  if (!req.body.password || req.body.password == " " || req.body.password == null) {
    return res.status(400).send({
      success: "false",
      msg: "password is empty!",
    });
  }

  var encryptPassowrd = md5Hash.MD5(req.body.password);


  db.query('SELECT delete_account,hunter_status FROM tbl_app_users WHERE email = "'+req.body.email+'"',(err,dataa)=>{
    if(err){
      res.status(500).send({
        success: "false",
        message: err
      })
      return;
    }

    if (!dataa.length) {
      res.status(400).send({
        success: "false",
        message: "Email Or Password Incorrect",
      });
      return;
    }

   
    if(dataa[0].delete_account == 2){
      res.status(201).send({
        success: "false",
        message: "Your Account is Deleted"
      })
      return;
    }

    if(dataa[0].hunter_status == 2){
      res.status(201).send({
        success: 'false',
        message: 'Your Acccount Is Deactivated Please Contact Administrator'
      })
      return;
    }


    else{

      db.query(
        'SELECT * FROM tbl_app_users WHERE password="' +
          encryptPassowrd +
          '" AND email ="' +
          req.body.email +
          '"',
        async (err, results) => {
          if (err) {
            res.status(500).send({
              success: "false",
              message: err,
            });
          }
     
          if (!results.length) {
            res.status(400).send({
              success: "false",
              message: "Email Or Password Incorrect",
            });
          } else {
            db.query(
              'UPDATE tbl_app_users SET device_token = "' +
                req.body.device_token +
                '" WHERE email = "' +
                req.body.email +
                '"',
              (err) => {
                if (err) {
                  res.status(500).send({
                    success: false,
                    message: err,
                  });
                  return;
                }
              }
            );
    
            res.status(200).send({
              success: "true",
              message: "Login Successfully",
              user: results[0],
            });
          }
        }
      );





    }
  })

};

module.exports = userLogin;
