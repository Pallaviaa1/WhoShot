const db = require("../../db/dbConnection");

const getPastHunt = (req, res) => {
  const resultData = [];

  if (!req.body.user_id || req.body.user_id === "" || req.body.user_id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide User Id",
    });
    return;
  }

  //Function For Count Hunt Result
  const countHuntResult = (huntId, callback) => {
    const dataArr = [];
    db.query(
      'SELECT SUM(no_of_killed) AS killed, SUM(no_of_wound) AS wound, SUM(no_of_missed) AS missed, SUM(no_of_fire) AS fire FROM tbl_what_about_shot WHERE hunt_id = "' +
        huntId +
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

  //Function For Count Hunt Result

  // db.query(
  //   'SELECT * FROM tbl_hunt WHERE end_date IS NOT NULL AND end_time IS NOT NULL OR cancel_hunt = 1 AND user_id = "' +
  //     req.body.user_id +
  //     '"',
  //   (err, data) => {
  //     if (err) {
  //       res.status(500).send({
  //         success: "false",
  //         message: err,
  //       });
  //       return;
  //     }

  //     if (data.length == 0) {
  //       res.status(201).send({
  //         success: "false",
  //         message: "No Data Found",
  //       });
  //       return;
  //     } else {
  //       data.forEach((e) => {
  //         var obj = {};
  //         obj["Id"] = e.id;
  //         obj["userID"] = e.user_id;
  //         obj["huntName"] = e.hunt_name;
  //         obj["huntImage"] = e.hunt_image;
  //         obj["date"] = e.date;
  //         countHuntResult(e.id, function (result) {
  //           obj["totalKilled"] = result[0].killed;
  //           obj["totalMissed"] = result[0].missed;
  //           obj["totalWound"] = result[0].wound;
  //           obj["totalFire"] = result[0].fire;
  //         });
  //         resultData.push(obj);
  //       });

  //       setTimeout(() => {
  //         res.status(200).send({
  //           success: "true",
  //           data: resultData,
  //         });
  //       }, 1000);
  //     }
  //   }
  // );


  db.query('SELECT b.* FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id WHERE (b.end_date IS NOT NULL AND b.end_time IS NOT NULL || b.cancel_hunt = 1) AND a.hunter_id = "'+req.body.user_id+'" ORDER BY b.updated_date DESC',(err,data)=>{
    if(err){
      res.status(500).send({
        success: "false",
        message: err
      })
      return;
    }

    if (data.length == 0) {
            res.status(201).send({
              success: "false",
              message: "No Data Found",
            });
            return;
          }
    else{
      data.forEach((e) => {
                var obj = {};
                obj["Id"] = e.id;
                obj["userID"] = e.user_id;
                obj["huntName"] = e.hunt_name;
                obj["huntImage"] = e.hunt_image;
                obj["date"] = e.date;
                countHuntResult(e.id, function (result) {
                  obj["totalKilled"] = result[0].killed;
                  obj["totalMissed"] = result[0].missed;
                  obj["totalWound"] = result[0].wound;
                  obj["totalFire"] = result[0].fire;
                });
                resultData.push(obj);
              });

              setTimeout(() => {
                        res.status(200).send({
                          success: "true",
                          data: resultData,
                        });
                      }, 1000);
      
    }
  })
};

module.exports = getPastHunt;
