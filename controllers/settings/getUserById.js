const db = require("../../db/dbConnection");

const getUserById = (req, res) => {
  if (!req.body.id || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide User Id",
    });
    return;
  }

  db.query(
    'SELECT * FROM tbl_users WHERE id = "' + req.body.id + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      } else {
        res.status(200).send({
          success: true,
          message: "Data Collected Successfully",
          data: data,
        });
        return;
      }
    }
  );
};

module.exports = getUserById;
