const db = require("../../db/dbConnection");

const getNotificationById = (req, res) => {
  const notificationID = req.body.id;
  const resultData = [];
  //get adminName

  const getHuntName = (userId, callback) => {
    db.query(
      'SELECT a.hunt_name AS name FROM tbl_hunt a INNER JOIN tbl_notification b ON b.user_id = a.id WHERE b.type = 1 AND b.id = "' +
        userId +
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

  //Function For get Hunt Name

  const getHunterName = (userId, callback) => {
    db.query(
      'SELECT a.full_name AS name FROM tbl_app_users a INNER JOIN tbl_notification b ON a.id = b.user_id WHERE b.type = 2 AND b.id = "' +
        userId +
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

  //get adminName

  if (notificationID == "" || notificationID == null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }

  db.query(
    'SELECT * FROM tbl_notification WHERE id = "' + notificationID + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      } else {
        data.forEach((e) => {
          var arr = {};
          arr["id"] = e.id;
          arr["type"] = e.type;
          arr["subType"] = e.sub_type;
          arr["user_id"] = e.user_id;
          arr["title"] = e.subject;
          arr["message"] = e.description;
          arr["date"] = e.date;
          if (e.type === 1) {
            getHuntName(e.id, function (result) {
              arr["Name"] = result[0].name;
            });
          }
          if (e.type === 2) {
            getHunterName(e.id, function (resultt) {
              arr["Name"] = resultt[0].name;
            });
          }
          resultData.push(arr);
        });

        setTimeout(() => {
          res.status(200).send({
            success: true,
            message: "Getting Notification Details",
            notificationDetails: resultData[0],
          });
        }, 1000);
      }
    }
  );
};

module.exports = getNotificationById;
