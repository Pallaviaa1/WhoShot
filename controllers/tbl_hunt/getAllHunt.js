const db = require("../../db/dbConnection");

const getAllHunt = (req, res) => {
  db.query(
    "SELECT id, hunt_name FROM tbl_hunt WHERE start_hunt_status = 0",
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
          message: "getting data",
          data: data,
        });
        return;
      }
    }
  );
};

module.exports = getAllHunt;
