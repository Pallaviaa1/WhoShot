const db = require("../../db/dbConnection");
const PDFGenerator = require("pdfkit");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const downloadHunterReport = (req, res) => {
  const resultData = [];

  db.query(
    "SELECT a.full_name, c.hunt_name, b.* FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id INNER JOIN tbl_hunt c ON b.hunt_id = c.id WHERE a.deleteStatus = 0",
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      } else {
        data.forEach((e) => {
          var arr = {};
          arr["hunterName"] = e.full_name;
          arr["huntName"] = e.hunt_name;
          arr["noOfKilled"] = e.no_of_killed;
          arr["noOfMissed"] = e.no_of_missed;
          arr["noOfWound"] = e.no_of_wound;
          arr["noOfFire"] = e.no_of_fire;
          arr["hunterJoinedDate"] = e.date;
          resultData.push(arr);
        });

        let filee = new Date().getTime() + ".pdf";
        let doc = new PDFDocument({
          margin: 30,
          size: "A4",
          padding: 30,
          fillColor: "blue",
        });
        doc.pipe(fs.createWriteStream(`./public/pdf/${filee}`));

        const tableArray = {
          title: "All Hunter Records",
          subtitle: moment().utcOffset(330).format('LLLL'),
          headers: [
            "id",
            "Hunter Name",
            "Hunt Name",
            "No Of Killed",
            "No Of Missed",
            "No Of Wound",
            "No Of Fire",
            "Joined",
          ],
          rows: resultData.map((item, i) => {
            return [
              i + 1,
              item.hunterName,
              item.huntName,
              item.noOfKilled,
              item.noOfMissed,
              item.noOfWound,
              item.noOfFire,
              moment(item.hunterJoinedDate).format("L"),
            ];
          }),
        };

        doc.table(tableArray, { width: 550 });
        doc.moveDown();

        doc.end();


        setTimeout(()=>{
          res.status(200).send({
            success: true,
            message: "Report downloaded successfully",
            data: filee,
          });
          return;

        },100)
      
      }
    }
  );
};

module.exports = downloadHunterReport;
