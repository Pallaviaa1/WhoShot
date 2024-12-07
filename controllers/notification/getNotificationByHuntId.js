const db = require("../../db/dbConnection");
const moment = require("moment");

const getNotificationByHuntId = (req, res) => {
  const resultData = [];

  if (!req.body.user_id || req.body.user_id == "" || req.body.user_id === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide User Id",
    });
    return;
  }

  //Function
  const getHuntName = (user_id, callback) => {
    db.query(
      'SELECT hunt_name, hunt_image AS profile FROM tbl_hunt WHERE id = "' +
        user_id +
        '"',
      (err, data) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: err,
          });
          return;
        } else {
          return callback(data);
        }
      }
    );
  };

  //Function

  db.query(
    'SELECT * FROM tbl_notification  WHERE user_id = "' +
      req.body.user_id +
      '" AND user_delete = 0', 
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      } else {
        data.forEach((e) => {
          var arr = {};
          arr["id"] = e.id;
          arr["user_id"] = e.user_id;
          arr["type"] = e.type;
          arr["subType"] = e.sub_type;
          if (e.type === 1) {
            getHuntName(e.user_id, function (result) {
              arr["huntName"] = result[0].hunt_name;
              arr["profile"] = result[0].profile;
            });
          }

          arr["subject"] = e.subject;
          arr["message"] = e.description;
          arr["adminDelete"] = e.admin_delete;
          arr["userDelete"] = e.user_delete;
          arr["date"] = e.date;
          resultData.push(arr);
        });

        db.query(
          'UPDATE tbl_notification SET notification_read = 1 WHERE user_id = "' +
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

        setTimeout(() => {
          res.status(200).send({
            success: "true",
            notification: resultData,
          });
          return;
        }, 1000);
      }
    }
  );
};

module.exports = getNotificationByHuntId;
