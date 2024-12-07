const db = require("../../db/dbConnection");
var FCM = require("fcm-node");

const removeHunterByAdmin = (req, res) => {
  if (!req.body.id || req.body.id === "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please  Provide Id",
    });
    return;
  }
  db.query(
    'UPDATE tbl_hunters SET hunter_remove_status = 1 WHERE id = "' +
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
        const hunterData = [];
        const hunterIdData = [];

        db.query(
          'SELECT hunter_id, hunt_id  FROM tbl_hunters WHERE id = "' +
            req.body.id +
            '"',
          (err, data1) => {
            if (err) {
              res.status(500).send({
                success: "false",
                message: err,
              });
              return;
            }
            
            db.query('SELECT device_token FROM tbl_app_users WHERE id = "'+data1[0]?.hunter_id+'"',(err,data2)=>{
              if(err){
                res.status(500).send({
                  success: "false",
                  message: err
                })
                return;
              }
              hunterIdData.push(data2[0]);
              db.query(
                'SELECT hunt_name AS huntName FROM tbl_hunt WHERE id = "' +
                  data1[0].hunt_id +
                  '"',
                (err, data3) => {
                  if (err) {
                    res.status(500).send({
                      success: "false",
                      message: err,
                    });
                    return;
                  }
                  hunterData.push(data3[0]);
                }
              );
            })
           
          }
        );

       

        var notificationDescription;
        var notiTitle = "WhoShot";

        setTimeout(() => {
          // console.log(hunterIdData, "Hunter dataaaaaaaaaaa")
          notificationDescription = `You removed from ${hunterData[0]?.huntName} by admin`;
          var serverKey =
            "AAAA5utSxiE:APA91bEfsCkfkQE_B0B7KSZYggFu_ScpJeu3z_Fv-zvqk8l7c0bi_ypNkLQvsr2YdRveFQPETdOWKNj5HsaSJ_tvRPAqNmKSTa1JBrYFGvL1cIRPQXOTiKMXjZlC7FmXajzKjNVxwj35";
          var fcm = new FCM(serverKey);

          // var deviceToken = resultappuser[0].deviceToken;
          var deviceToken = hunterIdData[0]?.device_token;
          var message = {
            to: deviceToken,
            notification: {
              title: notiTitle,
              body: notificationDescription,
              // huntId: dataArr[0].hunt_id,
              noti_type: 4,
            },
          };
          // console.log(message)

          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!" + err);
              console.log("Respponse:! " + response);
            } else {
              // showToast("Successfully sent with response");
              console.log("Successfully sent with response: ", response);
            }
          });
        }, 1000);

        setTimeout(()=>{
          res.status(200).send({
            success: "true",
            message: "Hunter Remove Successfully",
          });
          return;

        },100)
        
      }
    }
  );
};

module.exports = removeHunterByAdmin;
