const db = require("../../db/dbConnection");

const getContact = (req, res) => {
  db.query("SELECT * FROM tbl_contact_us", (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    } else {
      res.status(200).send({
        success: true,
        message: "Success",
        data: data[0],
      });
    }
  });
};

module.exports = getContact;
