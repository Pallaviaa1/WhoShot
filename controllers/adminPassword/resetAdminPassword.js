const db = require("../../db/dbConnection");
const CryptoJS = require("crypto-js");

const resetAdminPassword = (req, res) => {
  const password = req.body.password;
  const newpassword = req.body.newpassword;
  const HashNewPassword = CryptoJS.MD5(newpassword);
  var encryptPassword = CryptoJS.MD5(password);

  if (!req.body.id || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }

  if (req.body.password == "" || req.body.password == null) {
    res.status(400).send({
      success: false,
      message: "Please Enter Old Password",
    });
    return;
  }

  db.query(
    'SELECT * FROM tbl_users WHERE password = "' +
      encryptPassword +
      '" AND id = "' +
      req.body.id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }

      if (data.length > 0) {
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
                data: data[0],
              });
              return;
            }
          }
        );
      } else {
        res.status(201).send({
          success: false,
          message: "Please Enter Correct Password",
        });
        return;
      }
    }
  );
};

module.exports = resetAdminPassword;
