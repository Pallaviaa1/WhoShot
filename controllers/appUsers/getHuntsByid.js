const db = require("../../db/dbConnection");

const getHuntById = (req, res) => {
  const huntData = [];
  // const joinedHunt = [];

  if (!req.body.user_id || req.body.user_id == "" || req.body.user_id === null) {
    res.status(400).send({
      success: false,
      message: "Plese Provide User Id",
    });
    return;
  }

  //function
  
  const getHuntMember = (id, callback) => {
    db.query(
      'SELECT COUNT(hunter_id) AS joined FROM tbl_hunters WHERE hunt_id = "' +
        id +
        '" AND hunter_remove_status = 0',
      (err, data) => {
        if (err) {
          res.status(500).send({
            success: "false",
            message: err,
          });
          return;
        } else {
          return callback(data[0].joined);
        }
      }
    );
  };


  //function


  db.query(
    'SELECT a.* FROM tbl_hunt a WHERE a.user_id = "' +
      req.body.user_id +
      '" AND end_date IS NULL AND end_time IS NULL AND a.cancel_hunt = 0 ORDER BY a.created_date desc',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      } else {
        data.forEach((e) => {
          var dataArr = {};
          dataArr["hunt_id"] = e.id;
          dataArr["user_id"] = e.user_id;
          dataArr["huntName"] = e.hunt_name;
          dataArr["date"] = e.date;
          dataArr["startDate"] = e.start_date;
          dataArr["startTime"] = e.start_time;
          dataArr["huntImage"] = e.hunt_image;
          getHuntMember(e.id, function (result) {
            dataArr["totalJoinedHunt"] = result;
          });

          huntData.push(dataArr);
        });





        // 2nd query
        db.query('SELECT * FROM tbl_hunters WHERE hunter_id = "'+req.body.user_id+'" AND hunter_id != admin_id',(error,datas)=>{
          if(error){
              res.status(500).send({
                  success: "false",
                  message: error
              })
              return;
          }

          else{                   
              datas.forEach((e)=>{
                  db.query('SELECT a.*, b.full_name AS Admin FROM tbl_hunt a INNER JOIN tbl_app_users b ON a.user_id = b.id WHERE a.id = "'+e.hunt_id+'"',(err,dataa)=>{
                      if(err){
                          res.status(500).send({
                              success: 'false',
                              message: err
                          })
                          return;
                      }

                      else{
                          
                          // joinedHunt.push(dataa[0])

                          dataa.forEach((e) => {
                            var dataArr1 = {};
                            dataArr1["hunt_id"] = e.id;
                            dataArr1["user_id"] = e.user_id;
                            dataArr1["huntName"] = e.hunt_name;
                            dataArr1["date"] = e.date;
                            dataArr1["startDate"] = e.start_date;
                            dataArr1["startTime"] = e.start_time;
                            dataArr1["huntImage"] = e.hunt_image;
                            dataArr1["huntAdmin"] = e.Admin;
                            getHuntMember(e.id, function (result) {
                              dataArr1["totalJoinedHunt"] = result;
                            });
                  
                            huntData.push(dataArr1);
                          });

                      }
                  })
              })
             
              
          }
      })
      // 2nd query

      result={};
      result['MyHunts']=huntData;

      // result['joinedHunt']=joinedHunt;
      


        setTimeout(() => {
          res.status(200).send({
            success: "true",
            message: "Data Collected Successfully",
            data: result,
          });
          return;
        }, 1000);
      }
    }
  );
};

module.exports = getHuntById;
