const db = require("../../db/dbConnection");

const deleteNotificationByUser = (req, res) => {
  if (!req.body.id || req.body.id === "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }
  db.query(
    'UPDATE tbl_notification SET user_delete = 1 WHERE id = "' +
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
        res.status(200).send({
          success: "true",
          message: "Notification Deleted Successfully",
        });
        return;
      }
    }
  );
};

module.exports = deleteNotificationByUser;
