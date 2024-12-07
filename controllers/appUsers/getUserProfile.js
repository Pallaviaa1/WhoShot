const db = require("../../db/dbConnection");

const getUserProfile = (req, res) => {
  if (!req.body.id || req.body.id === "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }

  db.query(
    'SELECT full_name, email, phone, profile FROM tbl_app_users WHERE id = "' +
      req.body.id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      }

      if (data.length == 0) {
        res.status(201).send({
          success: "false",
          message: "Data Not Found",
        });
        return;
      } else {
        res.status(200).send({
          success: "true",
          data: data[0],
        });
        return;
      }
    }
  );
};

module.exports = getUserProfile;
