const db = require("../../db/dbConnection");
const CryptoJS = require("crypto-js");

const changeUserPassword = (req, res) => {
  var password = req.body.password;
  var newpassword = req.body.newpassword;
  const HashNewPassword = CryptoJS.MD5(newpassword);
  var encryptPassowrd = CryptoJS.MD5(password);

  if (!req.body.id || req.body.id === "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }

  if (!req.body.password || req.body.password === "" || req.body.password === null) {
    res.status(400).send({
      success: false,
      message: "Please Enter Password",
    });
    return;
  }

  db.query(
    'SELECT * FROM tbl_app_users WHERE password ="' +
      encryptPassowrd +
      '" AND id ="' +
      req.body.id +
      '"',
    function (err, resp) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (resp.length > 0) {
        db.query(
          'UPDATE tbl_app_users SET password = "' +
            HashNewPassword +
            '"  WHERE id ="' +
            req.body.id +
            '"',
          function (errNext, respNext) {
            if (errNext) {
              res.status(500).send({ message: errNext });
              return;
            }

            res.status(200).send({
              success: "true",
              message: "Password Updated Successfully",
            });
            return;
          }
        );
      } else {
        res.status(400).send({
          success: "false",
          message: "Please Enter Correct Password",
        });
      }
    }
  );
};

module.exports = changeUserPassword;
