const db = require("../../db/dbConnection");

const notificationSetting = (req, res) => {
  const userId = req.body.id;
 

  if (!req.body.id || req.body.id == "" || req.body.id === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide User Id",
    });
    return;
  }

  if (!req.body.notification_on || req.body.notification_on === "" || req.body.notification_on === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Notification On",
    });
    return;
  }

  db.query(
    'SELECT id AS userId FROM tbl_app_users WHERE id = "' + userId + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
      }

      if (data.length === 0) {
        res.status(201).send({
          success: "false",
          message: " User Id Does Not Exist",
        });
        return;
      } else {
        db.query(
          'UPDATE tbl_app_users SET notification_on = "' +
            req.body.notification_on +
            '" WHERE id = "' +
            userId +
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

        db.query('SELECT notification_on FROM tbl_app_users WHERE id = "'+req.body.id+'"',(err,data1)=>{
          if(err){
            res.status(500).send({
              success: "false",
              message: err
            })
            return;
          }

          else{
            if (req.body.notification_on === 0) {
              res.status(200).send({
                success: "true",
                message: "Notification Off",
                data: data1[0]
              });
              return;
            } else {
              res.status(200).send({
                success: "true",
                message: "Notification On",
                data: data1[0]
              });
              return;
            }

          }

        })

        // if (req.body.notification_on === 0) {
        //   res.status(200).send({
        //     success: "true",
        //     message: "Notification Off",
        //     data: dataa
        //   });
        //   return;
        // } else {
        //   res.status(200).send({
        //     success: "true",
        //     message: "Notification On",
        //     data: dataa
        //   });
        //   return;
        // }
      }
    }
  );
};

module.exports = notificationSetting;
