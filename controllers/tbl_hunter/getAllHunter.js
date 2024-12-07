const db = require("../../db/dbConnection");

const getAllHunter = (req, res) => {
  db.query(
    "SELECT DISTINCT a.id, a.full_name AS hunter FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id",
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      } else {
        res.status(200).send({
          success: true,
          message: "Collecting Data",
          data: data,
        });
        return;
      }
    }
  );
};

module.exports = getAllHunter;
