const sql = require("../../db/dbConnection");

const Terms = (request, res) => {
  if (request.body.heading == "" || request.body.heading === null) {
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

  sql.query(
    "SELECT COUNT(id) AS totalCount FROM tbl_terms_conditions",
    (err, resq) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }
      if (resq[0].totalCount > 0) {
        sql.query(
          `UPDATE tbl_terms_conditions SET heading='${request.body.heading}' ,  description ='${request.body.description}' WHERE id=1 `,
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
              message: "Terms & Conditions Updated Successfully",
            });
            return;
          }
        );
      } else {
        sql.query(
          `INSERT INTO tbl_terms_conditions  (heading,description)
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
              message: "Terms & Conditions Created Successfully",
            });
            return;
          }
        );
      }
    }
  );
};

module.exports = Terms;
