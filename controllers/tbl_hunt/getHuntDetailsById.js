const db = require("../../db/dbConnection");

const getHuntDetailsById = (req, res) => {
  const resultData = [];

  //Function

  const getHunterDetailss = (huntID, callback) => {
    db.query(
      'SELECT a.full_name AS hunter, SUM(b.no_of_killed + no_of_wound +  no_of_fire + no_of_missed) AS total, b.no_of_killed , b.no_of_missed, b.no_of_fire, b.no_of_wound FROM tbl_app_users a INNER JOIN tbl_what_about_shot b ON a.id = b.hunter_id WHERE hunt_id = "' +
        huntID +
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


  const getHunterDetails = (huntID, callback) => {
    db.query(
      'SELECT a.full_name AS hunter, SUM(b.no_of_killed + no_of_wound +  no_of_fire + no_of_missed) AS total, b.no_of_killed , b.no_of_missed, b.no_of_fire, b.no_of_wound FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id WHERE hunt_id = "' +
        huntID +
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
    'SELECT a.*, b.full_name AS admin FROM tbl_hunt a INNER JOIN tbl_app_users b ON a.user_id = b.id WHERE a.id = "' +
      req.body.id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      } else {
        data.forEach((e) => {
          var arrObj = {};
          arrObj["huntID"] = e.id;
          arrObj["huntName"] = e.hunt_name;
          arrObj["huntAdmin"] = e.admin;
          arrObj["huntProfile"] = e.hunt_image;
          arrObj["DateCreated"] = e.date;
          arrObj["huntLive"] = e.start_hunt_status;
          getHunterDetails(e.id, function (result) {
            arrObj["hunterName"] = result[0].hunter;
            arrObj["totalShots"] = result[0].total;
            arrObj["killed"] = result[0].no_of_killed;
            arrObj["missed"] = result[0].no_of_missed;
            arrObj["fired"] = result[0].no_of_fire;
            arrObj["wound"] = result[0].no_of_wound;
          });
          resultData.push(arrObj);
        });

        setTimeout(() => {
          res.status(200).send({
            success: true,
            message: "Data Collected Successfully",
            data: resultData[0],
          });
          return;
        }, 1000);
      }
    }
  );
};

module.exports = getHuntDetailsById;
