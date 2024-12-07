const db = require("../../db/dbConnection");
var FCM = require("fcm-node");

const huntersLogin = (req, res) => {
  const dataArr = [];
  const resultRecord = [];

  if (!req.body.passcode || req.body.passcode == "" || req.body.passcode == null) {
    res.status(400).send({
      success: "false",
      message: "Please Enter PassCode",
    });
    return;
  }
  if (!req.body.hunter_id || req.body.hunter_id == "" || req.body.hunter_id == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Hunter Id",
    });
    return;
  }
  db.query(
    'SELECT id, user_id, hunt_name, passcode,hunt_status FROM tbl_hunt  WHERE hunt_name = "' +
      req.body.hunt_name +
      '" AND passcode = "' +
      req.body.passcode +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      }
      if (!data.length) {
        res.status(400).send({
          success: "false",
          message: "Please Enter Correct Passcode",
        });
        return;
      } 

      if(data[0].hunt_status == 1){
        res.status(201).send({
          success: "false",
          message: "Hunt Deactivated Please Contact Administrator"
        })
        return;
      }
      else {
        data.forEach((e) => {
          var dataObj = {};
          dataObj["hunt_id"] = e.id;
          dataObj["admin_id"] = e.user_id;
          dataArr.push(dataObj);
        });
        //check user exist or not
        db.query(
          'SELECT a.hunt_id, b.hunt_name, a.id, a.hunter_remove_status FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id WHERE  a.hunter_id = "' +
            req.body.hunter_id +
            '" AND b.hunt_name =  "' +
            req.body.hunt_name +
            '"',
          (err, data) => {
            if (err) {
              res.status(500).send({
                success: "false",
                message: err,
              });
              return;
            }

            if (data.length !== 0) {
              res.status(201).send({
                success: "true",
                message: "Joined Hunt Successfully",
              });

              return;
            } else {
              data.forEach((item) => {
                var itemObj = {};
                itemObj["hunt_id"] = item.hunt_id;
                itemObj["hunt_name"] = item.hunt_name;
                itemObj["id"] = item.id;
                resultRecord.push(itemObj);
              });

              db.query(
                `INSERT INTO tbl_hunters(hunt_id,hunter_id,admin_id,hunter_type) VALUES('${dataArr[0].hunt_id}', '${req.body.hunter_id}', '${dataArr[0].admin_id}', '${req.body.hunter_type}')`,
                (err, data) => {
                  if (err) {
                    res.status(500).send({
                      success: "false",
                      message: err,
                    });
                  } else {                  
                  const hunterData = []
                  const deviceTokenData = []


                  db.query('SELECT device_token AS deviceToken FROM tbl_app_users WHERE id = "'+dataArr[0].admin_id+'"',(err,data)=>{
                    if(err){
                      res.status(500).send({
                        success: "false",
                        message: err
                      })
                      return;
                    }
                    deviceTokenData.push(data[0])
                   
                  })





                    db.query('SELECT full_name AS hunterName FROM tbl_app_users WHERE id = "'+req.body.hunter_id+'"',(err,data)=>{
                      if(err){
                        res.status(500).send({
                          success: "false",
                          message: err
                        })
                        return;
                      }
                      hunterData.push(data[0])
                     
                    })

                    var notificationDescription
                    var notiTitle = "WhoShot";
              
                    setTimeout(()=>{
                      notificationDescription =  `${hunterData[0].hunterName} joined your hunt ${req.body.hunt_name}`
                      var serverKey =
                    "AAAA5utSxiE:APA91bEfsCkfkQE_B0B7KSZYggFu_ScpJeu3z_Fv-zvqk8l7c0bi_ypNkLQvsr2YdRveFQPETdOWKNj5HsaSJ_tvRPAqNmKSTa1JBrYFGvL1cIRPQXOTiKMXjZlC7FmXajzKjNVxwj35";
                  var fcm = new FCM(serverKey);
                  
                  // var deviceToken = resultappuser[0].deviceToken;
                  var deviceToken = deviceTokenData[0].deviceToken
                  var message = {
                    to: deviceToken,
                    notification: {
                      title: notiTitle,
                      body: notificationDescription,
                      huntId: dataArr[0].hunt_id,
                      noti_type: 1
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
                    },1000)
      
                  //send Notificationpending
                
                    res.status(200).send({
                      success: "true",
                      message: "Joined Hunt Successfully",
                    });
                    return;
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

module.exports = huntersLogin;

// "https://www.youtube.com/tuattrananh"
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
