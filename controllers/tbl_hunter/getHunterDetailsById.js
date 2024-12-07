const db = require("../../db/dbConnection");

const getHunterDetailsById = (req, res) => {
  const dataArr = [];

  //Function For Hunter Details


  const getHunterShots = (huntId, hunterId, callback)=>{
    const dta = []
    db.query('SELECT SUM(no_of_killed) AS killed, SUM(no_of_wound)AS wound, SUM(no_of_fire) AS fire, SUM(no_of_missed)AS missed, SUM(no_of_killed + no_of_wound + no_of_missed) AS totalShots FROM tbl_what_about_shot WHERE hunt_id = "'+huntId+'" AND hunter_id = "'+hunterId+'"',(err,data)=>{
      if(err){
        res.status(500).send({
          success: "false",
          message: err
        })
        return;
      }

      else{
        dta.push(data[0])
      }
    })
    setTimeout(()=>{
      return callback(dta)
    },1000)
  }
 
  

  const getHunterDetails = (hunterId) => {
    var arr = [];
    db.query(
      'SELECT a.hunt_id, a.hunter_id,a.no_of_killed, a.no_of_missed, a.no_of_wound, a.no_of_fire, a.date AS joinedDate, b.hunt_name,b.hunt_image, (a.no_of_missed + a.no_of_wound + a.no_of_killed + a.no_of_fire) AS totalShots FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id WHERE a.hunter_id = "' +
        hunterId +
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
            var hunterData = {};
            hunterData["huntId"] = e.hunt_id;
            hunterData["hunterId"] = e.hunter_id;
            getHunterShots(e.hunt_id,e.hunter_id, function(result){
            hunterData["killed"] = result[0].killed;
            hunterData["missed"] = result[0].missed;
            hunterData["wound"] = result[0].wound;
            hunterData["fire"] = result[0].fire;
            hunterData["totalShots"] = result[0].totalShots;
            })
            hunterData["huntJoinedDate"] = e.joinedDate;
            hunterData["huntName"] = e.hunt_name;
            hunterData["huntProfile"] = e.hunt_image;
            //hunterData["totalShots"] = e.totalShots;

            arr.push(hunterData);
          });
        }
      }
    );
    return arr;
  };

  //Function For Hunters Details

  db.query(
    'SELECT a.hunter_id,b.full_name, b.profile,Count(a.hunt_id) AS totalJoinedHunts, b.date FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id WHERE a.hunter_id = "' +
      req.body.hunter_id +
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
          arrObj["hunterId"] = e.hunter_id;
          arrObj["hunterName"] = e.full_name;
          arrObj["profile"] = e.profile;
          arrObj["date"] = e.date;
          arrObj["totalJoinedHunts"] = e.totalJoinedHunts;
          arrObj["hunter"] = getHunterDetails(e.hunter_id);
          dataArr.push(arrObj);
        });

        setTimeout(() => {
          res.status(200).send({
            success: true,
            message: "Data Collected Succcessfully",
            data: dataArr[0],
          });
          return;
        }, 10000);
      }
    }
  );
};

module.exports = getHunterDetailsById;
