const db = require("../../db/dbConnection");

const groupDetail = (req, res) => {
  const resultData = [];
  //Function
  const totalHunter = (huntId, callback) => {
    db.query(
      'SELECT COUNT(hunter_id) AS total FROM tbl_hunters WHERE hunt_id = "' +
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

  db.query("SELECT * FROM tbl_hunt", (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    } else {
      data.forEach((e) => {
        var arr = {};
        arr["huntId"] = e.id;
        arr["huntName"] = e.hunt_name;
        arr["createdDate"] = e.date;
        totalHunter(e.id, function (result) {
          arr["totalHunter"] = result[0].total;
        });
        resultData.push(arr);
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

module.exports = groupDetail;
