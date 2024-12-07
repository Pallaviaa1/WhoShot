const sql = require("../../db/dbConnection");

const about = (request, res) => {
  if (request.body.heading == "" || request.body.heading == null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Heading",
    });
    return;
  }

  if (request.body.description == "" || request.body.description === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Description",
    });
    return;
  }
  sql.query("SELECT COUNT(id) AS totalCount FROM tbl_about_us", (err, resq) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }
    if (resq[0].totalCount > 0) {
      sql.query(
        `UPDATE tbl_about_us SET heading='${request.body.heading}' ,  description ='${request.body.description}' WHERE id = 1 `,
        (err, data) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }
          res.status(200).send({
            success: true,
            message: "About Us Updated Successfully",
          });
        }
      );
    } else {
      sql.query(
        `INSERT INTO tbl_about_us  (heading,description)
          VALUE ('${request.body.heading}','${request.body.description}');`,
        (err, data) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }
          res.status(200).send({
            success: true,
            message: "About Us Created Successfully",
          });
          return;
        }
      );
    }
  });
};

module.exports = about;
