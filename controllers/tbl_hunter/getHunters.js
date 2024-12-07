const db = require("../../db/dbConnection");

const getAllHunters = (req, res) => {
  //function for total joined hunts
  const totalJoinedHunts = (hunter_id, callback) => {
    db.query(
      'SELECT COUNT(hunt_id) AS totalJoinedHunts FROM tbl_hunters WHERE hunter_id = "' +
        hunter_id +
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

  //function for total joined hunts
  const resultData = [];
  db.query(
    "SELECT a.* FROM tbl_app_users a WHERE a.deleteStatus = 0 ORDER BY date DESC",
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
      } else {
        data.forEach((e) => {
          var arrObj = {};
          arrObj["id"] = e.id;
          arrObj["fullName"] = e.full_name;
          arrObj["profile"] = e.profile;
          arrObj["email"] = e.email;
          arrObj["hunterStatus"] = e.hunter_status;
          arrObj["userType"] = e.user_type;
          arrObj["date"] = e.date;
          totalJoinedHunts(e.id, function (result) {
            arrObj["totalJoinedHunts"] = result[0].totalJoinedHunts;
          });
          resultData.push(arrObj);
        });

        setTimeout(() => {
          res.status(200).send({
            success: true,
            message: "Data Collected Successfully",
            hunters: resultData,
          });
        }, 1000);
      }
    }
  );
};

module.exports = getAllHunters;
