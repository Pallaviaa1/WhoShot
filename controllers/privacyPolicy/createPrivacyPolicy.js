const db = require("../../db/dbConnection");

const createPrivacyPolicy = (request, res) => {
  db.query(
    "SELECT COUNT(id) AS totalCount FROM tbl_privacy_policy",
    (err, resq) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }
      if (resq[0].totalCount > 0) {
        db.query(
          `UPDATE tbl_privacy_policy SET heading='${request.body.heading}' ,  description ='${request.body.description}' WHERE id = 2 `,
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
              message: "Policy Updated Successfully",
            });
          }
        );
      } else {
        db.query(
          `INSERT INTO tbl_privacy_policy  (heading,description)
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
              message: "Policy Created Successfully",
            });
            return;
          }
        );
      }
    }
  );
};

module.exports = createPrivacyPolicy;
