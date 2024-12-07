const db = require("../../db/dbConnection");

const topHunt = (req, res) => {
  const resultRecord = [];
  const resultRecords = [];
  const total = [];
  const huntName = [];
  //function
  const top = (hunt_id) => {
    db.query(
      'SELECT SUM(no_of_killed) AS totalShots,a.hunt_id, b.hunt_name FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id WHERE a.hunt_id = "' +
        hunt_id +
        '"',
      (err, data) => {
        if (err) {
          res.status(500).send({
            success: "false",
            message: err,
          });

          return;
        } else {
          total.push(data[0].totalShots);
          huntName.push(data[0].hunt_name);
          resultRecords.push(data[0]);
        // console.log("###############");
        // console.log(resultRecords);
        // console.log("#####################");

          return resultRecords;
        }
      }
    );
  };

  //function

  db.query("SELECT hunt_id FROM tbl_hunters", (err, data) => {
    if (err) {
      res.status(500).send({
        success: "false",
        message: err,
      });
      return;
    } else {
      data.forEach((e) => {
        var arr = {};
        arr["tophunt"] = top(e.hunt_id);

        resultRecord.push(arr);
      });


    //   Array.prototype.max = function () {
    //     return Math.max.apply(null, this);
    //   };

    //   Array.prototype.min = function () {
    //     return Math.min.apply(null, this);
    //   };

    //   setTimeout(() => {
    //     console.log(
    //       `Max value is: ${total.max()} ` + `\nHunt Name is: ${huntName}`
    //     );
    //   }, 1000);


      function dynamicSort(property) {
        var sortOrder = -1;
        if(property[0] === "-") {
            sortOrder = 1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }


      setTimeout(() => {
        resultRecords.sort(dynamicSort("totalShots"))
        res.status(200).send({
          success: "true",
          message: "Data Collected Successfully",
          data: resultRecords[0],
        });
        return;
      }, 1000);
    }
  });
};

module.exports = topHunt;


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce//