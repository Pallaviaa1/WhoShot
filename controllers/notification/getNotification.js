const db = require("../../db/dbConnection");

const getNotification = (req, res) => {
  const resultData = [];
  //Function For get Hunt Name
  const getHuntName = (userId, callback) => {
    db.query(
      'SELECT a.hunt_name AS name, a.hunt_image AS profile FROM tbl_hunt a INNER JOIN tbl_notification b ON b.user_id = a.id WHERE b.type = 1 AND b.user_id = "' +
        userId +
        '"',
      (err, data) => {
        if (err) {
          res.status(500).send({
            success: "false",
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
      'SELECT a.full_name AS name, a.profile AS profile FROM tbl_app_users a INNER JOIN tbl_notification b ON a.id = b.user_id WHERE b.type = 2 AND b.user_id = "' +
        userId +
        '"',
      (err, data) => {
        if (err) {
          res.status(500).send({
            success: "false",
            message: err,
          });
          return;
        } else {
          return callback(data);
        }
      }
    );
  };

  

  db.query(
    "SELECT * FROM tbl_notification WHERE admin_delete =  0 ORDER BY date DESC",
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
      } else {
        data.forEach((e) => {
          var arr = {};
          arr["id"] = e.id;
          arr["user_id"] = e.user_id;
          arr["type"] = e.type;
          arr["subject"] = e.subject;
          arr["description"] = e.description;
          arr["date"] = e.date;
          if (e.type === 1) {
            getHuntName(e.user_id, function (result) {
              arr["Name"] = result[0] ?.name;
              arr["profile"] = result[0] ?.profile;
            });
          }
          if (e.type === 2) {
            getHunterName(e.user_id, function (resultt) {
              arr["Name"] = resultt[0] ?.name;
              arr["profile"] = resultt[0] ?.profile;
            });
          }

          resultData.push(arr);
        });

        setTimeout(() => {
          res.status(200).send({
            success: "true",
            message: "Data Collecting Successfully",
            data: resultData,
          });
        }, 1000);
      }
    }
  );
};

module.exports = getNotification;
