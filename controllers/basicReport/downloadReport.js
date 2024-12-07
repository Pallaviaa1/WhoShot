const db = require("../../db/dbConnection");
const PDFGenerator = require("pdfkit");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
// const { DownloaderHelper } = require('node-downloader-helper');
var download = require("download-pdf");

const getDetail = (req, res) => {
  const resultData = [];
  db.query("SELECT * FROM tbl_hunt WHERE hunt_delete = 0", (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    } else {
      data.forEach((e) => {
        var arr = {};
        arr["hunt_id"] = e.id;
        arr["hunt_name"] = e.hunt_name;
        arr["createdDate"] = e.date;
        arr["startDate"] = e.start_date;
        arr["endDate"] = e.end_date;

        resultData.push(arr);
      });

      //function
      let filee = new Date().getTime() + ".pdf";

      let doc = new PDFDocument({ margin: 30, size: "A4", padding: 30 });
      doc.pipe(fs.createWriteStream(`./public/pdf/${filee}`));

      const tableArray = {
        title: "All Hunt Records",
        subtitle: moment().utcOffset(330).format('LLLL'),
        headers: ["id", "Hunt Name", "Created Date", "Start Date"],
        rows: resultData.map((item, i) => {
          return [
            i + 1,
            item.hunt_name,
            moment(item.createdDate).format("L"),
            item.startDate,
          ];
        }),
      };

      doc.table(tableArray, { width: 550, columnsSize: [100, 200, 200, 200] });
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
  });
};

module.exports = getDetail;
