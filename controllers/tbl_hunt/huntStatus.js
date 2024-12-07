const db = require("../../db/dbConnection");

const huntStatus = (req, res) => {
  if (!req.body.id || req.body.id === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide User Id",
    });
    return;
  }

  if (req.body.hunt_status == "" || req.body.hunt_status == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Hunt Status",
    });
    return;
  }

  db.query(
    'UPDATE tbl_hunt SET hunt_status = "' +
      req.body.hunt_status +
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
        if (req.body.hunt_status == 0) {
          res.status(200).send({
            success: "true",
            message: "Hunt Active",
          });
        } else {
          res.status(200).send({
            success: "true",
            message: "Hunt Inactive",
          });
        }
      }
    }
  );
};

module.exports = huntStatus;
