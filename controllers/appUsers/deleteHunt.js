const db = require("../../db/dbConnection");

const deleteHunt = (req, res) => {
  if (!req.body.id || req.body.id == null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Hunt Id",
    });
    return;
  }

  db.query(
    'UPDATE tbl_hunt SET hunt_delete = 1 WHERE id = "' + req.body.id + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Hunt Deleted Successfully",
        });
        return;
      }
    }
  );
};

module.exports = deleteHunt;
