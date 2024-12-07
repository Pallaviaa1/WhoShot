const db = require("../../db/dbConnection");
const format = require("date-format");
const moment = require("moment");
var FCM = require("fcm-node");

const exitHunt = (req, res) => {
  const currentDate = moment().format("DD-MM-YYYY");
  const currentTime = moment().format("LT");

  if (!req.body.id || req.body.id == "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Hunt Id",
    });
    return;
  }

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

  db.query(
    'UPDATE tbl_hunt SET end_date = "' +
      currentDate +
      '", end_time = "' +
      currentTime +
      '" WHERE id = "' +
      req.body.id +
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
                        notificationDescription = `${huntName[0].hunt_name} has been ended`;
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
                                // arr["DeviceTokenn"] = result[0].device_token
                                // console.log(hunterData, "Checking Resultttt")
                               
                                var serverKey =
                                  "AAAA5utSxiE:APA91bEfsCkfkQE_B0B7KSZYggFu_ScpJeu3z_Fv-zvqk8l7c0bi_ypNkLQvsr2YdRveFQPETdOWKNj5HsaSJ_tvRPAqNmKSTa1JBrYFGvL1cIRPQXOTiKMXjZlC7FmXajzKjNVxwj35";
                                var fcm = new FCM(serverKey);
            
                                // var deviceToken = resultappuser[0].deviceToken;
                                var deviceToken = result[0]?.device_token
                                
                                var message = {
                                  to: deviceToken,
                                  notification: {
                                    title: notiTitle,
                                    body: notificationDescription,
                                    // huntId: req.body.id,
                                    noti_type: 3,
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
                   
        res.status(200).send({
          success: "true",
          message: "Hunt Exit Successfully",
        });
        return;
      }
    }
  );
};

module.exports = exitHunt;
