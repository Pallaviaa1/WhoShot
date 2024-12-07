const db = require("../../db/dbConnection");

const participateHunt = (req, res) => {
  const resultData = [];
  if (!req.body.hunter_id || req.body.hunter_id == "" || req.body.hunter_id == null) {
    res.status(400).send({
      success: "false",
      message: "Please Enter hunter_id",
    });
    return;
  }

  //function
  const getHunterShots = (huntID,hunterID,callback)=>{

    const data1 = []

    db.query('SELECT SUM(no_of_wound) AS wound, SUM(no_of_fire) AS fire, SUM(no_of_missed) AS missed, SUM(no_of_killed) AS killed FROM tbl_what_about_shot WHERE hunter_id = "'+hunterID+'" AND hunt_id = "'+huntID+'"',(err,dataa)=>{
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

  //function

  db.query(
    'SELECT a.id, a.hunt_id, a.hunter_id, a.admin_id, b.date AS CreatedDate, b.hunt_name, b.hunt_image AS huntProfile, c.full_name AS AdminName FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON a.admin_id = c.id WHERE hunter_id = "' +
      req.body.hunter_id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      }

      if (data.length === 0) {
        res.status(201).send({
          success: "false",
          message: "Hunter Does not exist",
        });
        return;
      } else {
       
        data.forEach((e)=>{
          let arr = {}
          arr['id'] = e.id;
          arr['hunt_id'] = e.hunt_id;
          arr['hunter_id'] = e.hunter_id;
          arr['admin_id'] = e.admin_id;
          arr['CreatedDate'] = e.CreatedDate;
          arr['hunt_name'] = e.hunt_name;
          arr['huntProfile'] = e.huntProfile;
          arr['AdminName'] = e.AdminName;
          getHunterShots(e.hunt_id,e.hunter_id,function(result){
            arr['wound'] = result[0].wound;
            arr['fire'] = result[0].fire;
            arr['missed'] = result[0].missed;
            arr['killed'] = result[0].killed;

          })
          
          resultData.push(arr);
        })
      
     

       
        setTimeout(()=>{
          res.status(200).send({
          success: "true",
          data: resultData,
        });
        },1000)
      
      }
     
    }
    
  );
};

module.exports = participateHunt;
