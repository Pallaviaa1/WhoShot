const db = require("../../db/dbConnection");

const basicReport = (req, res) => {
  const resultData = [];

  //Function
  const groupDetails = (huntId, callback) => {
    db.query(
      'SELECT Count(a.hunter_id) AS totalRegistration, SUM(c.no_of_killed +c.no_of_missed + c.no_of_wound) AS totalShots, MAX(c.no_of_killed) AS topScore, a.hunter_id, b.full_name AS topHunter FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id INNER JOIN tbl_what_about_shot c ON b.id = c.hunter_id WHERE a.hunt_id = "' +
        huntId +
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
  db.query("SELECT * FROM tbl_hunt WHERE end_date IS NOT NULL", (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    } else {
      data.forEach((e) => {
        var arrObj = {};
        arrObj['huntID'] = e.id;
        arrObj['huntName'] = e.hunt_name;
        arrObj['startDate'] = e.start_date;
        arrObj['endDate'] = e.end_date;
        groupDetails(e.id, function (result) {
          arrObj['totalRegistration'] = result[0].totalRegistration;
          arrObj['totalShots'] = result[0].totalShots;
          arrObj['topScore']  = result[0].topScore;
          arrObj['topHunter']  = result[0].topHunter;
        });
        resultData.push(arrObj);
      });

      setTimeout(() => {
        res.status(200).send({
          success: true,
          message: "Data Collected Successfully",
          data: resultData,
        });
        return;
      }, 1000);
    }
  });
};

module.exports = basicReport;
