const db = require("../../db/dbConnection");

const notificationCount = (req, res) => {
  if (!req.body.user_id ||req.body.user_id == "" || req.body.user_id == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide User Id",
    });
    return;
  }

  db.query(
    'SELECT count(user_id) AS totalCount FROM tbl_notification WHERE user_id = "' +
      req.body.user_id +
      '" AND notification_read = 0',
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
          message: "Success",
          notification: data[0],
        });
      }
    }
  );
};

module.exports = notificationCount;
