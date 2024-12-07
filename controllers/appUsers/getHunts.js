const db = require("../../db/dbConnection");

const getHunts = (req, res) => {
  const resultData = [];

  //Function For Total Participants

  const totalParticipants = (hunt_id, callback) => {
    db.query(
      'SELECT COUNT(hunter_id) AS total FROM tbl_hunters WHERE hunt_id = "' +
        hunt_id +
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

  //Function For Total Participants

  db.query("SELECT * FROM tbl_hunt WHERE hunt_delete = 0 ORDER BY date DESC", (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
    } else {
      data.forEach((e) => {
        var arrObj = {};
        arrObj["huntID"] = e.id;
        arrObj["huntName"] = e.hunt_name;
        arrObj["huntProfile"] = e.hunt_image;
        arrObj["createdDate"] = e.date;
        arrObj["endDate"] = e.end_date;
        arrObj["huntStatus"] = e.hunt_status;
        totalParticipants(e.id, function (result) {
          arrObj["totalParticipants"] = result[0].total;
        });
        resultData.push(arrObj);
      });

      setTimeout(() => {
        res.status(200).send({
          success: true,
          message: "Data Collected Successfully",
          Hunts: resultData,
        });
      }, 1000);
    }
  });
};

module.exports = getHunts;
