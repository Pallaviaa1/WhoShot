const db = require("../../db/dbConnection");

const createHunt = (req, res) => {
  if (!req.body.user_id || req.body.user_id == "" || req.body.user_id == null) {
    res.status(400).send({
      success: "false",
      message: "Please Provide  User Id",
    });
  }

  if (!req.body.hunt_name || req.body.hunt_name == "" || req.body.hunt_name == null) {
    res.status(400).send({
      success: "false",
      message: "Please Enter Hunt Name",
    });
    return;
  }

  if (!req.body.passcode || req.body.passcode == "" || req.body.passcode == null) {
    res.status(400).send({
      success: "false",
      message: "Please Enter Passcode",
    });
    return;
  }

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }
  

  var t = convertTime12to24(req.body.start_time)

  db.query(
    'SELECT hunt_name FROM tbl_hunt WHERE hunt_name = "' +
      req.body.hunt_name +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
      }
      if (data.length > 0) {
        res.status(400).send({
          success: "false",
          message: "Please Choose Other Name",
        });
      } else {
        if (req.body.hunt_image == "") {
          db.query(
            `INSERT INTO tbl_hunt(user_id,group_id,hunt_name,passcode,start_date,start_time,hunt_image) VALUES('${req.body.user_id}','${req.body.group_id}','${req.body.hunt_name}', '${req.body.passcode}', '${req.body.start_date}', '${t}', '')`,
            (err, data) => {
              if (err) {
                res.status(500).send({
                  success: "false",
                  message: err,
                });
              } else {
                const lastInsertedID = data.insertId;
                //console.log(lastInsertedID)

                db.query(
                  'SELECT a.*, b.full_name AS Admin FROM tbl_hunt a INNER JOIN tbl_app_users b ON a.user_id = b.id  WHERE a.id = "' +
                    lastInsertedID +
                    '"',
                  (err, data) => {
                    if (err) {
                      res.status(500).send({
                        success: "false",
                        message: err,
                      });
                    } else {
                      db.query(
                        `INSERT INTO tbl_hunters(hunt_id,hunter_id,admin_id,hunter_type) VALUES('${data[0].id}', '${data[0].user_id}', '${data[0].user_id}', '${1}')`,
                        (err, data) => {
                          if (err) {
                            res.status(500).send({
                              success: "false",
                              message: err,
                            });
                          } else {
                            
                          }
                        }
                      );

                      res.status(200).send({
                        success: "true",
                        message: "Hunt Created Successfully",
                        data: data,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          db.query(
            `INSERT INTO tbl_hunt(user_id,group_id,hunt_name,passcode,start_date,start_time,hunt_image) VALUES('${req.body.user_id}','${req.body.group_id}','${req.body.hunt_name}', '${req.body.passcode}', '${req.body.start_date}', '${t}', '${req.file.filename}')`,
            (err, data) => {
              if (err) {
                res.status(500).send({
                  success: "false",
                  message: err,
                });
              } else {
                const lastInsertedID = data.insertId;
                //console.log(lastInsertedID)

                db.query(
                  'SELECT a.*, b.full_name AS Admin FROM tbl_hunt a INNER JOIN tbl_app_users b ON a.user_id = b.id  WHERE a.id = "' +
                    lastInsertedID +
                    '"',
                  (err, data) => {
                    if (err) {
                      res.status(500).send({
                        success: "false",
                        message: err,
                      });
                    } else {
                      db.query(
                        `INSERT INTO tbl_hunters(hunt_id,hunter_id,admin_id,hunter_type) VALUES('${data[0].id}', '${data[0].user_id}', '${data[0].user_id}', '${1}')`,
                        (err, data) => {
                          if (err) {
                            res.status(500).send({
                              success: "false",
                              message: err,
                            });
                          } else {
                            
                          }
                        }
                      );
                      res.status(200).send({
                        success: "true",
                        message: "Hunt Created Successfully",
                        data: data,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};

module.exports = createHunt;
