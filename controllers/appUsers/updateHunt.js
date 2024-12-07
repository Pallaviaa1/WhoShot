const db = require("../../db/dbConnection");

const updateHunt = (req, res) => {
  if (!req.body.id || req.body.id === "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }

  if (!req.body.hunt_name || req.body.hunt_name === "" || req.body.hunt_name === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Hunt Name",
    });
    return;
  }

  if (!req.body.passcode || req.body.passcode === "" || req.body.passcode === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide passcode",
    });
    return;
  }

  if (!req.body.start_date || req.body.start_date === "" || req.body.start_date === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Start Date",
    });
    return;
  }

  if (!req.body.start_time || req.body.start_time === "" || req.body.start_time === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Start Time",
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
  
  // console.log(convertTime12to24('01:02 PM'));
  // console.log(convertTime12to24('05:06 PM'));
  // console.log(convertTime12to24('12:00 PM'));
  // console.log(convertTime12to24('12:00 AM'));

  var t = convertTime12to24(req.body.start_time)

  if (req.body.hunt_image == "") {
    var sql =
      'UPDATE tbl_hunt SET hunt_name = "' +
      req.body.hunt_name +
      '", passcode = "' +
      req.body.passcode +
      '", start_date = "' +
      req.body.start_date +
      '", start_time = "' +
     t +
      '" WHERE id = "' +
      req.body.id +
      '"';
  } else {
    var sql =
      'UPDATE tbl_hunt SET hunt_name = "' +
      req.body.hunt_name +
      '", hunt_image = "' +
      req.file.filename +
      '", passcode = "' +
      req.body.passcode +
      '", start_date = "' +
      req.body.start_date +
      '", start_time = "' +
     t +
      '" WHERE id = "' +
      req.body.id +
      '"';
  }

  db.query(sql, (err, data) => {
    if (err) {
      res.status(500).send({
        success: "false",
        message: err,
      });
      return;
    } else {
      res.status(200).send({
        success: "true",
        message: "Hunt Updated Successfully",
      });
      return;
    }
  });
};

module.exports = updateHunt;
