const sql = require("../../db/dbConnection");

const getAboutUs = (req, res) => {
  sql.query("SELECT * FROM tbl_about_us", (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Getting Data Successfully",
        data: data[0],
      });
    }
  });
};

module.exports = getAboutUs;
