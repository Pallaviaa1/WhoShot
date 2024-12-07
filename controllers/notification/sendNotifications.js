const db = require("../../db/dbConnection");
var FCM = require("fcm-node");
const { read } = require("pdfkit");

const sendNotifications = (req, res) => {
  var resultData = [];
  var hunterid_array = [];
  //Hunt Admin id
  const get_huntadmin_id = (user_id, typeid, selectiontype) => {
    if (selectiontype === 1) {
      if (typeid === 1) {
        var sqldata = "SELECT user_id FROM `tbl_hunt` WHERE end_date IS NULL";
      } else if (typeid === 2) {
        var sqldata =
          "SELECT user_id FROM `tbl_hunt` WHERE id='" +
          user_id +
          "' AND end_date IS NULL";
      } else if (typeid === 3) {
        //all group user id
        var sqldata =
          "SELECT a.hunter_id AS user_id FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id WHERE b.end_date IS NULL";
      } else {
        //particular group user id
        var sqldata =
          "SELECT hunter_id AS user_id FROM tbl_hunters WHERE hunt_id = '" +
          user_id +
          "'";
      }
    } else {
      if (typeid === 5) {
        var sqldata = "SELECT hunter_id AS user_id FROM `tbl_hunters`";
      } else {
        var sqldata =
          "SELECT hunter_id AS user_id FROM `tbl_hunters` WHERE hunter_id='" +
          user_id +
          "'";
      }
    }

    db.query(sqldata, (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      } else {
        data.forEach((e) => {
          var arr = {};
          arr["user_id"] = e.user_id;
          resultData.push(arr);
        });
      }
    });
    return resultData;
  };
  //send notfication and insert

  const sendNotification = (type, sub_type, user_id, subject, description) => {
    db.query(
      `INSERT INTO tbl_notification(type,sub_type,user_id,subject,description) Values('${type}','${sub_type}','${user_id}', '${subject}', '${description}')`,
      (insertErr, insertData) => {
        if (insertErr) {
          res.status(500).send({
            success: false,
            message: insertErr,
          });
          return;
        } else {
          //Send Push Notificaton On Mobile
          //   var serverKey =
          //   "AAAAIbM4I1I:APA91bHhNYZ12-gCjmEJtaXqfWwCoA1-GPFvw0pCIQoWHwLP7alD09ekkj0WW5LcMyWP2xDkvju3JLCDj9TFqIS0OM7vKdHaiAmx4lNnQZUSkRIZfLXCZIwUEvvSTQiMHdkDGOOquzuL";
          // var fcm = new FCM(serverKey);
          // var deviceToken = "dfH9N74tOU2WhNBAZepVK0:APA91bG0v4ZT_M7BqE6LU_BTYNXa9sp9NEQzx0shB2NEZbYLir39GQJh8T1yXMRKDw17tAdK2fCJgBTLvBHXpxY9kqO0x0rOSgCTq-Pogh3DadM2RvsLHxBYewlFPT8jiyN-zbN3N4VX";
          // var message = {
          //   to: deviceToken,
          //   notification: {
          //     title: "notification",
          //     body: "notification for testing",
          //   },
          // };
          // console.log(message)

          // fcm.send(message, function (err, response) {
          //   if (err) {
          //     console.log("Something has gone wrong!" + err);
          //     console.log("Respponse:! " + response);
          //   } else {
          //     console.log(
          //       "Successfully sent with response: ",
          //       response
          //     );
          //   }
          // });

          //   //Send Push Notification On Mobile
          //   setTimeout(()=>{
          //     res.status(200).send({
          //       success: true,
          //       message: "Notification Sent Successfully",
          //       data: resultData
          //   })
          //   return;

          //   },1000)

          return "1";
        }
      }
    );
  };

  //send notification and insert

  if (req.body.subject == "" || req.body.subject == null) {
    res.status(400).send({
      success: false,
      message: "Please Enter Subject",
    });
    return;
  }

  if (req.body.description == "" || req.body.description == null) {
    res.status(400).send({
      success: false,
      message: "Please Enter Description",
    });
    return;
  }
  //declear
  var type = req.body.type;
  var sub_type = req.body.sub_type;
  var user_id = req.body.user_id;
  var subject = req.body.subject;
  var description = req.body.description;

  if (type === 1) {
    //1=admin 2=user
    if (sub_type == 1) {
      //hunt_id for admin
      if (user_id == 0) {
        var hunt_admin_id = get_huntadmin_id(user_id, 1, 1);
      } else {
        var hunt_admin_id = get_huntadmin_id(user_id, 2, 1);
      }
    } else {
      //hunt_id for all user
      if (user_id === 0) {
        var hunt_admin_id = get_huntadmin_id(user_id, 3);
      } else {
        var hunt_admin_id = get_huntadmin_id(user_id, 4);
      }
    }
  } else {
    if (user_id == 0) {
      var hunt_admin_id = get_huntadmin_id(user_id, 5, 2);
    } else {
      var hunt_admin_id = get_huntadmin_id(user_id, 6, 2);
    }
  }

  setTimeout(() => {
    hunt_admin_id.forEach((element) => {
      if (!hunterid_array.includes(element.user_id)) {
        hunterid_array.push(element.user_id);
      }
    });
    var datacheck = "";
    hunterid_array.forEach((el) => {
      datacheck = sendNotification(type, sub_type, el, subject, description);
      // console.log(datacheck);
    });
  }, 1000);

  res.status(200).send({
    success: true,
    message: "Notification Sent Successfully",
  });
  return;
};

module.exports = sendNotifications;
