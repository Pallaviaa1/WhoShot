const sql = require("../../db/dbConnection");

const getLiveHunts = (req, res) => {
  sql.query(
    "SELECT a.*, b.full_name AS Admin FROM tbl_hunt a INNER JOIN tbl_app_users b ON a.user_id = b.id  WHERE end_date IS NULL AND end_time IS NULL AND cancel_hunt = 0 ORDER BY a.date DESC",
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
          message: "Collecting Live Hunts Successfully",
          data: data,
        });
        return;
      }
    }
  );
};

module.exports = getLiveHunts;
