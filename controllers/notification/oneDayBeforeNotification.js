const db = require("../../db/dbConnection");

const notificationOneDayBefore = (req, res) => {
  const userId = req.body.id;

  if (!req.body.id || req.body.id == "" || req.body.id === null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide User Id",
    });
    return;
  }

  if (
    req.body.one_day_before_notification === "" ||
    req.body.one_day_before_notification === null
  ) {
    res.status(400).send({
      success: "false",
      message: "Please Provide Notification One Day Before! ",
    });
    return;
  }

  db.query(
    'SELECT id FROM tbl_app_users WHERE id = "' + userId + '"',
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
          message: "User ID Does Not Exist",
        });
        return;
      } else {
        db.query(
          'UPDATE tbl_app_users SET one_day_before_notification = "' +
            req.body.one_day_before_notification +
            '" WHERE id = "' +
            req.body.id +
            '"',
          (error, data) => {
            if (error) {
              res.status(500).send({
                success: "false",
                message: error,
              });
              return;
            }
          }
        );

        db.query('SELECT one_day_before_notification FROM tbl_app_users WHERE id = "'+req.body.id+'"',(err,data1)=>{
          if(err){
            res.status(500).send({
              success: 'false',
              message: err
            })
            return;
          }

          else{
            if (req.body.one_day_before_notification === 0) {
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


        

       
      }
    }
  );
};

module.exports = notificationOneDayBefore;
