const db = require("../../db/dbConnection");

const huntDetailsByID = (req, res) => {
  const resultData = [];



  const getShots = (huntId,hunterId,callback)=>{
    const data1 = []
    db.query('SELECT SUM(no_of_killed) AS killed, SUM(no_of_missed) AS missed, SUM(no_of_wound) AS wound, SUM(no_of_fire) AS fire, SUM(no_of_wound + no_of_missed + no_of_killed) AS totalShots FROM tbl_what_about_shot WHERE hunt_id = "'+huntId+'" AND hunter_id = "'+hunterId+'"',(err,dataa)=>{
      if(err){
        res.status(500).send({
          success: "false",
          message: err
        })
        return;
      }
      else{
        dataa.forEach((r)=>{
          data1.push(r)
        })
       
      }
    })
    setTimeout(()=>{
        return callback(data1)
    },1000)
  }

  //Function
  const getHuntDetail = (huntId, callback) => {
    const hunt = [];
    db.query(
      'SELECT a.full_name AS hunter,a.id, a.profile, b.no_of_killed AS killed, b.no_of_missed AS missed, b.no_of_fire AS fire, b.no_of_wound AS wound, (b.no_of_killed + b.no_of_missed + b.no_of_wound + b.no_of_fire) AS totalShots FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id WHERE b.hunt_id = "' +
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
          data.forEach((item) => {
            const huntData = {};
            huntData["hunterName"] = item.hunter;
            huntData["hunterId"] = item.id;
            huntData["hunterProfile"] = item.profile;
            // huntData["totalShots"] = item.totalShots;
            getShots(huntId,item.id,function(result){
                huntData["noOfKilled"] = result[0]?.killed;
                huntData["noOfMissed"] = result[0]?.missed;
                huntData["noOfWound"] = result[0]?.wound;
                huntData["noOfFire"] = result[0]?.fire;
                huntData["totalShots"] = result[0]?.totalShots;
              })

              hunt.push(huntData);
                 
          });
        }
      }
    );
     
      return hunt
    
  };


  const getTotalShot = (huntId, callback)=>{
    const dta = []
    db.query('SELECT SUM(no_of_killed) AS totalKilled, SUM(no_of_missed) AS totalMissed, SUM(no_of_wound) AS totalWound, SUM(no_of_fire) AS totalFire FROM tbl_what_about_shot WHERE hunt_id = "'+huntId+'"',(err,data)=>{
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

  //Function
  db.query(
    'SELECT a.*, COUNT(b.hunter_id) AS totalParticipants, SUM(b.no_of_killed) AS totalKilled, SUM(b.no_of_missed) AS totalMissed, SUM(b.no_of_wound) AS totalWound, SUM(b.no_of_fire) AS totalFire, c.full_name AS adminName FROM tbl_hunt a INNER JOIN tbl_hunters b ON a.id = b.hunt_id INNER JOIN tbl_app_users c ON a.user_id = c.id  WHERE a.id = "' +
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
          var arr = {};
          arr["huntId"] = e.id;
          arr["adminId"] = e.user_id;
          arr['adminName'] = e.adminName;
          arr["huntName"] = e.hunt_name;
          arr["huntProfile"] = e.hunt_image;
          arr["createdDate"] = e.date;
          arr["totalParticipants"] = e.totalParticipants;
          getTotalShot(e.id,function(result){
          arr["totalKilled"] = result[0].totalKilled;
          arr["totalMissed"] = result[0].totalMissed;
          arr["totalWound"] = result[0].totalWound;
          arr["totalFire"] = result[0].totalFire;
          })
          arr["huntDetail"] = getHuntDetail(e.id);
          resultData.push(arr);
        });

        setTimeout(() => {
          res.status(200).send({
            success: true,
            message: "Data Collecting Successfully",
            data: resultData,
          });
        }, 10000);
      }
    }
  );
};

module.exports = huntDetailsByID;
