const db = require("../../db/dbConnection");
const moment = require("moment");
var momentTime = require("moment-timezone");
var FCM = require("fcm-node");

const startHuntByAdmin = (req, res) => {
   
  if (!req.body.id || req.body.id == "" || req.body.id === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Hunt Id",
    });
    return;
  }

  if (
    !req.body.hunter_id ||
    req.body.hunter_id == "" ||
    req.body.hunter_id === null
  ) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Hunter Id",
    });
    return;
  }

  if (
    !req.body.joinLiveHuntStatus ||
    req.body.joinLiveHuntStatus == "" ||
    req.body.joinLiveHuntStatus === null
  ) {
    res.status(400).send({
      success: "false",
      message: "Please Enter JoinLiveHunts Status",
    });
    return;
  }


  //function
  const getHunterDeviceToken = (hunterId,callback)=>{
    var d = []
    db.query('SELECT device_token FROM tbl_app_users WHERE id = "'+hunterId+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }
        else{
            // console.log(data, "Daaaaa")
           d.push(data[0])
        }
    })
    
    setTimeout(()=>{
        // console.log(d, "Device Token")
        return callback(d)
      },1000)
}



  //function


  db.query(
    'SELECT hunt_name, start_date, start_time, user_id FROM tbl_hunt WHERE id = "' +
      req.body.id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: data,
        });
        return;
      }
      let date = moment(new Date()).format("DD-MM-YYYY");

      // let date = moment().format('L')
      // let time = moment().utcOffset(330).format('LT');
      let time = moment().format("LT");

      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        minute: "numeric",
        //   weekday: 'long',
        timeZone: "Africa/Johannesburg",
      });

      // console.log('Date string: ', now.toString());
      // console.log('Intl.DateTimeFormat string: ', formatter.format(now));
      const timee = formatter.format(now);
      // console.log(data[0].start_date, "start dateeee")
      // console.log(data[0].start_time, "start time")
       
      if (data[0].start_date !== date || data[0].start_time > timee) {
        res.status(201).send({
          success: "false",
          message: "Hunt Start On Time",
        });
        return;
      } else {
        db.query(
          'UPDATE tbl_hunt SET start_hunt_status = 1 WHERE id = "' +
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
          }
        );

        db.query(
          'SELECT id as HuntId FROM tbl_hunt WHERE id = "' + req.body.id + '"',
          (error, data) => {
            if (error) {
              res.status(500).send({
                success: "false",
                message: error,
              });
              return;
            } else {
              db.query(
                'UPDATE tbl_hunters SET joinLiveHuntStatus = "' +
                  req.body.joinLiveHuntStatus +
                  '" , latitude = "' +
                  req.body.latitude +
                  '", longitude = "' +
                  req.body.longitude +
                  '" WHERE hunter_id = "' +
                  req.body.hunter_id +
                  '" AND hunt_id = "' +
                  data[0].HuntId +
                  '"',
                (err, data) => {
                  if (err) {
                    res.status(500).send({
                      success: "false",
                      message: err,
                    });
                    return;
                  } else {
                    var notificationDescription;
                    var notiTitle = "WhoShot";
                    var dt = []
                    var huntName = []

                    db.query('SELECT hunt_name FROM tbl_hunt WHERE id = "'+req.body.id+'"',(err,data)=>{
                        if(err){
                            res.status(500).send({
                                success: "false",
                                message: err
                            })
                            return;
                        }
                        else{
                            huntName.push(data[0])
                        }
                    })

                    setTimeout(()=>{
                        notificationDescription = `${huntName[0].hunt_name} start please join`;
                    },1000)

                    
                    db.query('SELECT hunter_id FROM tbl_hunters WHERE hunt_id = "'+req.body.id+'"',(error, data)=>{
                        if(error){
                            res.status(500).send({
                                success: "false",
                                message: error
                            })
                            return;
                        }

                        else{
                        //  hunterIdData.push(data[0])
                        data.forEach((e) => {
                            let arr = {};
                            arr["hunterId"] = e.hunter_id;
                            arr["hunterToken"] = getHunterDeviceToken(e.hunter_id,function(result){
                                
                               
                                var serverKey =
                                  "AAAA5utSxiE:APA91bEfsCkfkQE_B0B7KSZYggFu_ScpJeu3z_Fv-zvqk8l7c0bi_ypNkLQvsr2YdRveFQPETdOWKNj5HsaSJ_tvRPAqNmKSTa1JBrYFGvL1cIRPQXOTiKMXjZlC7FmXajzKjNVxwj35";
                                var fcm = new FCM(serverKey);
            
                               
                                var deviceToken = result[0]?.device_token
                                
                                var message = {
                                  to: deviceToken,
                                  notification: {
                                    title: notiTitle,
                                    body: notificationDescription,
                                    // huntId: req.body.id,
                                    noti_type: 2,
                                  },
                                };
                                // console.log(message)
            
                                fcm.send(message, function (err, response) {
                                  if (err) {
                                    console.log("Something has gone wrong!" + err);
                                    console.log("Respponse:! " + response);
                                  } else {
                                    // showToast("Successfully sent with response");
                                    console.log(
                                      "Successfully sent with response: ",
                                      response
                                    );
                                  }
                                });                      
                            })
                            dt.push(arr);
                                               
                          });
                         
                        }
                    })
                   
                    
                    setTimeout(() => {
                      res.status(200).send({
                        success: "true",
                        message: "Hunt Started Successfully",
                        data: data,
                      });
                      return;
                    }, 1000);
                  }
                }
              );
            }
          }
        );

       
      }
    }
  );
};

module.exports = startHuntByAdmin;
