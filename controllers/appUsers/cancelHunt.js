const db = require("../../db/dbConnection");

const cancelHunt = (req, res) => {
  if (!req.body.id || req.body.id == "" || req.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Id",
    });
    return;
  }

  
var date = new Date();

function toLocal(date) {
  var local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON();
}

const dateti = toLocal(date)


  db.query(
    'UPDATE tbl_hunt SET cancel_hunt = 1, updated_date = "'+dateti+'" WHERE id = "' + req.body.id + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      } else {
        res.status(200).send({
          success: "true",
          message: "Hunt Cancelled Successfully",
        });
        return;
      }
    }
  );
};

module.exports = cancelHunt;
