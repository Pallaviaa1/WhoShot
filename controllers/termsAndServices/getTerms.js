const sql = require("../../db/dbConnection");

const GetTerms = (req, res) => {
  sql.query("SELECT * FROM tbl_terms_conditions", function (err, data) {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }

    res.status(200).send({
      success: true,
      message: "Success",
      data: data[0],
    });
    return;
  });
};

module.exports = GetTerms;
