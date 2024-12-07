const db = require("../../db/dbConnection");

const updateHuntStatus = (req, res) => {
  if (req.body.id === "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }
  db.query(
    'UPDATE tbl_hunt SET status = "' +
      req.body.status +
      '" WHERE id = "' +
      req.body.id +
      '"',
    (err) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Status Updated Successfully",
        });
      }
    }
  );
};

module.exports = updateHuntStatus;
