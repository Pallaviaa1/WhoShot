const db = require("../../db/dbConnection");

const clearAllNotification = (req, res) => {
  if (!req.body.user_id || req.body.user_id === "" || req.body.user_id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide User Id",
    });
    return;
  }

  db.query(
    'SELECT user_id FROM tbl_notification WHERE user_id = "' +
      req.body.user_id +
      '"',
    (error, dataa) => {
      if (error) {
        res.status(500).send({
          success: false,
          message: error,
        });
        return;
      }

      if (dataa.length === 0) {
        res.status(201).send({
          success: "false",
          message: "User id does not exist",
        });
        return;
      } else {
        db.query(
          'UPDATE tbl_notification SET user_delete = 1 WHERE user_id = "' +
            req.body.user_id +
            '"',
          (err, data) => {
            if (err) {
              res.status(500).send({
                success: "false",
                message: err,
              });
              return;
            }
          }
        );

        res.status(200).send({
          success: "true",
          message: "Notification Deleted Successfully",
        });
        return;
      }
    }
  );
};

module.exports = clearAllNotification;
