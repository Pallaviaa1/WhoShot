const db = require("../../db/dbConnection");
const moment = require('moment');

const startHunt = (req, res) => {

  if (!req.body.id || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }

  if(req.body.hunt_id == "" || req.body.hunt_id === null){
    res.status(400).send({
      success: "false",
      message: "Please Provide hunt Id"
    })
    return;
  }

  if(!req.body.hunter_id || req.body.hunter_id === null){
    res.status(400).send({
      success: "false",
      message: "Please Provide hunter Id"
    })
    return;
  }

 
  db.query(
    'SELECT hunt_name, start_date, start_time FROM tbl_hunt WHERE id = "' +
      req.body.id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      }

      let date = moment(new Date()).format("DD-MM-YYYY")
      

      // let date = moment().format('L')
      let time = moment().format('LT'); 

     
      if(data[0].start_date !== date || data[0].start_time > time){
        res.status(201).send({
          success: "false",
          message: "Hunt Start On Time"
        })
        return;
      }
      
      else {

        db.query('SELECT hunt_id, hunter_id FROM tbl_hunt_start WHERE hunt_id = "'+req.body.hunt_id+'" AND hunter_id = "'+req.body.hunter_id+'"',(err,dataa)=>{
          if(err){
            res.status(500).send({
              success: "false",
              message: err
            })
          }

          if(dataa.length){
            res.status(201).send({
              success: "true",
              message: "Hunt Started Already"
            })
            return;
          }

          else{

            db.query(`INSERT INTO tbl_hunt_start(hunt_id,hunter_id,latitude,longitude,start_hunt_status) VALUES('${req.body.hunt_id}', '${req.body.hunter_id}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.start_hunt_status}')`,(err,data)=>{
              if(err){
                res.status(500).send({
                  success: "false",
                  message: err
                })
                return;
              }
              

              res.status(200).send({
                success: "true",
                message: "Hunt Started Successfully",
                data: data[0]
              });
              return;
              
    
            })


          }
        })

        
       
      }
    }
  );
};

module.exports = startHunt;
