const db = require("../../db/dbConnection");

const hunterDelete = (req, res) => {
  const user_id = req.body.id;

  if (!req.body.id || req.body.id === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide User Id",
    });
    return;
  }

  db.query(
    'UPDATE tbl_app_users SET deleteStatus = 1 WHERE id= "' + user_id + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      }
      else {
        res.status(200).send({
          success: "true",
          message: "Hunter Deleted Successfully",
        });
        return;
      }
    }
  );
};

module.exports = hunterDelete;
