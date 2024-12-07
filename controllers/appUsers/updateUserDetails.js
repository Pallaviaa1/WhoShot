const { read } = require("pdfkit");
const db = require("../../db/dbConnection");

const updateAppUser = (req, res) => {
  const user_id = req.body.id;

  if (!user_id || user_id == "" || user_id == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide User Id",
    });
    return;
  }

  if (!req.body.full_name || req.body.full_name == "" || req.body.full_name == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Name",
    });
    return;
  }

  if (!req.body.email || req.body.email == "" || req.body.email == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Email",
    });
    return;
  }

  if (!req.body.phone || req.body.phone == "" || req.body.phone == null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Phone Number",
    });
    return;
  }

  if (req.body.profile == "") {
    var sqls =
      'UPDATE tbl_app_users SET full_name = "' +
      req.body.full_name +
      '", email = "' +
      req.body.email +
      '", phone = "' +
      req.body.phone +
      '" WHERE id = "' +
      user_id +
      '"';
  } else {
    var sqls =
      'UPDATE tbl_app_users SET full_name = "' +
      req.body.full_name +
      '", email = "' +
      req.body.email +
      '", phone = "' +
      req.body.phone +
      '", profile = "' +
      req.file.filename +
      '" WHERE id = "' +
      user_id +
      '"';
  }

  db.query(sqls, (err) => {
    if (err) {
      res.status(500).send({
        success: "false",
        message: err,
      });
    } else {
      res.status(200).send({
        success: "true",
        message: "Updated Successfully",
      });
    }
  });
};

module.exports = updateAppUser;
