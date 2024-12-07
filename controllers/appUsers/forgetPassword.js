const db = require("../../db/dbConnection");
const CryptoJS = require("crypto-js");

const forgetPassword = (req, res) => {
  var newpassword = req.body.newpassword;

  if (!req.body.id || req.body.id === "" || req.body.id === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Id",
    });
    return;
  }

  if (!req.body.newpassword || req.body.newpassword === "" || req.body.newpassword === null) {
    res.status(400).send({
      success: "false",
      message: "Please Enter New Password",
    });
    return;
  }

  const HashNewPassword = CryptoJS.MD5(newpassword);

  db.query(
    'UPDATE tbl_app_users SET password = "' +
      HashNewPassword +
      '" WHERE id = "' +
      req.body.id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      } else {
        res.status(200).send({
          success: "true",
          message: "Password Changed Successfully",
        });
        return;
      }
    }
  );
};

module.exports = forgetPassword;
