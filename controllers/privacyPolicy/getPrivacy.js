const db = require("../../db/dbConnection");

const GetPrivacy = (req, res) => {
  db.query("SELECT * FROM tbl_privacy_policy", function (err, rows) {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }

    res.status(200).send({
      success: true,
      message: "Success",
      data: rows[0],
    });
    return;
  });
};

module.exports = GetPrivacy;
