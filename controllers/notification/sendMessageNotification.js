const db = require("../../db/dbConnection");
var FCM = require("fcm-node");
const { read } = require("pdfkit");

const senMsgNotifications = (req, res) => {
    const { hunt_id, user_id } = req.body;
    //Hunt Admin id
    //var sqldata = `SELECT hunter_id FROM tbl_hunters WHERE hunt_id='${hunt_id}'`;
    if (!hunt_id || hunt_id == "" || hunt_id === null) {
        res.status(400).send({
            success: "false",
            message: "Please Provide Hunt Id",
        });
        return;
    }
    if (!user_id || user_id == "" || user_id === null) {
        res.status(400).send({
            success: "false",
            message: "Please Provide User Id",
        });
        return;
    }
    db.query(
        `SELECT hunter_id FROM tbl_hunters WHERE hunt_id='${hunt_id}' and hunter_id<>'${user_id}'`,
        (err, data) => {
            if (err) {
                res.status(500).send({
                    success: "false",
                    message: err,
                });
                return;
            }
            if (data.length > 0) {
                // console.log(data.length);
                data.forEach(e => {
                    //  console.log(e.hunter_id);
                    db.query(
                        `SELECT device_token FROM tbl_app_users WHERE id='${e.hunter_id}'`,
                        (err, Token) => {
                            if (err) {
                                res.status(500).send({
                                    success: "false",
                                    message: err,
                                });
                                return;
                            }
                            let deviceToken = Token[0].device_token;
                            // console.log(deviceToken);
                            var serverKey =
                                "AAAA5utSxiE:APA91bEfsCkfkQE_B0B7KSZYggFu_ScpJeu3z_Fv-zvqk8l7c0bi_ypNkLQvsr2YdRveFQPETdOWKNj5HsaSJ_tvRPAqNmKSTa1JBrYFGvL1cIRPQXOTiKMXjZlC7FmXajzKjNVxwj35";
                            var fcm = new FCM(serverKey);

                            var message = {
                                to: deviceToken,
                                notification: {
                                    title: "New Message",
                                    body: "You have a new message in your group chat!",
                                    // huntId: req.body.id,
                                    noti_type: 2,
                                },
                            };
                            // console.log(message)
                            fcm.send(message, function (err, response) {
                                if (err) {
                                    console.log("Something has gone wrong!" + err);
                                    console.log("Respponse:! " + response);
                                } else {
                                    // showToast("Successfully sent with response");
                                    console.log(
                                        "Successfully sent with response: ",
                                        response
                                    );
                                }
                            });
                        })
                });
                res.status(200).send({
                    success: "true",
                    message: "Notification Send Successfully",
                });
            }
        })
};

module.exports = senMsgNotifications;
