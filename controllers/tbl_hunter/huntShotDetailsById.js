const db = require('../../db/dbConnection');
var FCM = require("fcm-node");


const huntShotDetailsById = (req, res) => {

    const {
        hunt_id
    } = req.body;

    if (!hunt_id || hunt_id == "") {
        res.status(400).send({
            success: 'false',
            message: 'Please Provide Hunt Id'
        })
        return;
    }



    db.query('SELECT a.*, b.user_id AS AdminID, c.full_name AS huntAdmin FROM tbl_what_about_shot a INNER JOIN tbl_hunt b  ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON b.user_id = c.id WHERE hunt_id = "' + hunt_id + '"', (error, data) => {
        if (error) {
            res.status(500).send({
                success: 'false',
                message: error
            })
            return;
        }

        if (data.length === 0) {
            res.status(200).send({
                success: 'true',
                message: 'Data Not Found'
            })
            return;
        }



        else {

            res.status(200).send({
                success: 'true',
                message: 'Success',
                data: data
            })
            return;
        }
    })

}




const particularShotDetailsById = (req, res) => {
    const shotDetails = []
    const noOfKilled = req.body.no_of_killed;
    const noOfMissed = req.body.no_of_missed;
    const noOfWound = req.body.no_of_wound;
    const noOfFire = req.body.no_of_fire;
    const huntId = req.body.hunt_id;
    const hunterId = req.body.hunter_id;

    if (!huntId || huntId == "") {
        res.status(400).send({
            success: 'false',
            message: 'Please Provide Hunt Id'
        })
        return;
    }


    if (!hunterId || hunterId == "") {
        res.status(400).send({
            success: "false",
            message: "Please Provide Hunter Id"
        })
        return;
    }


    db.query('SELECT hunt_id FROM tbl_what_about_shot WHERE hunt_id = "' + huntId + '"', (error, data) => {
        if (error) {
            res.status(500).send({
                success: 'false',
                message: error
            })
            return;
        }

        if (data.length == 0) {
            res.status(400).send({
                success: 'false',
                message: 'Hunt Id Does Not Exist'
            })
            return 'false';
        }

        else {

            if (noOfKilled == 1) {
                db.query('SELECT a.*, b.user_id AS AdminId, c.full_name AS huntAdminName FROM tbl_what_about_shot a INNER JOIN tbl_hunt b ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON b.user_id = c.id  WHERE a.no_of_killed = 1 AND a.hunt_id = "' + huntId + '" AND a.hunter_id = "' + hunterId + '"', (err, data) => {
                    if (err) {
                        res.status(500).send({
                            success: 'false',
                            message: err
                        })
                        return;
                    }


                    else {
                        let statuss = ""
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].no_of_killed == 1) {
                                statuss = 'killed'
                            }


                        }
                        data.forEach(object => {
                            object['shotStatus'] = statuss;
                        });
                        shotDetails.push(data)
                        return;
                    }
                })
                setTimeout(() => {
                    return shotDetails;
                }, 1000)

            }


            if (noOfMissed == 1) {
                db.query('SELECT a.*, b.user_id AS AdminId, c.full_name AS huntAdminName FROM tbl_what_about_shot a INNER JOIN tbl_hunt b ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON b.user_id = c.id WHERE a.no_of_missed = 1 AND a.hunt_id = "' + huntId + '" AND a.hunter_id = "' + hunterId + '"', (error, data) => {
                    if (error) {
                        res.status(500).send({
                            success: 'false',
                            message: error
                        })
                        return;
                    }


                    else {
                        let statuss = ""
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].no_of_missed == 1) {
                                statuss = 'missed'
                            }


                        }
                        data.forEach(object => {
                            object['shotStatus'] = statuss;
                        });
                        shotDetails.push(data)
                        return;
                    }
                })
                setTimeout(() => {
                    return shotDetails;
                }, 1000)
            }



            if (noOfWound == 1) {
                db.query('SELECT a.*, b.user_id AS AdminId, c.full_name AS huntAdminName FROM tbl_what_about_shot a INNER JOIN tbl_hunt b ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON b.user_id = c.id WHERE a.no_of_wound = 1 AND a.hunt_id = "' + huntId + '" AND hunter_id = "' + hunterId + '"', (error, data) => {
                    if (error) {
                        res.status(500).send({
                            success: 'false',
                            message: error
                        })
                        return;
                    }

                    else {
                        let statuss = ""
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].no_of_wound == 1) {
                                statuss = 'wound'
                            }


                        }
                        data.forEach(object => {
                            object['shotStatus'] = statuss;
                        });

                        shotDetails.push(data)
                        return;
                    }
                })
                setTimeout(() => {
                    return shotDetails;
                }, 1000)
            }

            if (noOfFire == 1) {
                db.query('SELECT a.*, b.user_id AS AdminId, c.full_name AS huntAdminName FROM tbl_what_about_shot a INNER JOIN tbl_hunt b ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON b.user_id = c.id WHERE a.no_of_fire = 1 AND a.hunt_id = "' + huntId + '" AND hunter_id = "' + hunterId + '"', (error, data) => {
                    if (error) {
                        res.status(500).send({
                            success: 'false',
                            message: error
                        })
                        return;
                    }

                    else {
                        let statusWound = ""
                        let statusMissed = ""
                        let statusKilled = ""
                        for (let i = 0; i < data.length; i++) {


                            if (data[i].no_of_wound == 1) {
                                statusWound = 'Wound'
                            }

                            if (data[i].no_of_missed == 1) {
                                statusMissed = 'Missed'
                            }

                            if (data[i].no_of_killed == 1) {
                                statusKilled = 'Killed'
                            }


                        }
                        data.forEach(object => {

                            if (object.no_of_killed == 1) {
                                object['shotStatus'] = statusKilled;
                            }

                            if (object.no_of_wound == 1) {
                                object['shotStatus'] = statusWound;
                            }

                            if (object.no_of_missed == 1) {
                                object['shotStatus'] = statusMissed;
                            }

                        });
                        shotDetails.push(data)

                    }
                })
                setTimeout(() => {
                    return shotDetails;
                }, 1000)
            }
            setTimeout(() => {
                res.status(200).send({
                    success: 'true',
                    message: 'Getting Data Successfully',
                    shotDetails: shotDetails[0]
                })
                return;
            }, 1000)

        }
    })

}




const sendNotificationForShot = (req, res) => {

    const hunt_id = req.body.hunt_id;
    const hunter_id = req.body.hunter_id;


    if (!hunt_id || hunt_id == "") {
        res.status(500).send({
            success: 'false',
            message: 'Please Provide Hunt Id'
        })
        return;
    }


    if (!hunter_id || hunter_id == "") {
        res.status(200).send({
            success: 'true',
            message: 'Please Provide Hunter Id'
        })
        return;
    }



    db.query('SELECT a.hunter_id, b.device_token FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id WHERE a.hunt_id = "' + hunt_id + '"', (err, dataa) => {
        if (err) {
            res.status(500).send({
                success: 'false',
                message: err
            })
            return;
        }


        else {
            var hunterName = ''
            var profile = ''
            db.query('SELECT full_name, profile FROM tbl_app_users WHERE id = "' + hunter_id + '"', (error, data) => {
                if (error) {
                    res.status(500).send({
                        success: 'false',
                        message: error
                    })
                }

                else {

                    hunterName = data[0].full_name
                    profile = data[0].profile

                }
                return { hunterName, profile };
            })


            setTimeout(() => {
                const notiTitle = 'whoshot';
                const notificationDescription = hunterName + ' ' + 'made a shot'

                var serverKey =
                    "AAAA5utSxiE:APA91bEfsCkfkQE_B0B7KSZYggFu_ScpJeu3z_Fv-zvqk8l7c0bi_ypNkLQvsr2YdRveFQPETdOWKNj5HsaSJ_tvRPAqNmKSTa1JBrYFGvL1cIRPQXOTiKMXjZlC7FmXajzKjNVxwj35";
                var fcm = new FCM(serverKey);



                for (let i = 0; i < dataa.length; i++) {
                    var deviceToken = dataa[i].device_token;
                }


                var message = {
                    to: deviceToken,
                    notification: {
                        title: notiTitle,
                        body: notificationDescription,
                        noti_type: 2,
                        hunterName: hunterName,
                        profile: profile
                    }
                };

                fcm.send(message, function (err, response) {
                    if (err) {
                        console.log("Something has gone wrong!" + err);
                        console.log("Respponse:! " + response);
                    } else {

                        console.log(
                            "Successfully sent with response: ",
                            response
                        );
                    }
                });


            }, 1000)


            /* db.query(`INSERT INTO tbl_what_about_shot (hunter_id, no_of_fire, no_of_wound, no_of_missed, no_of_killed, hunt_id) VALUES('${hunter_id}', '${1}','${0}', '${0}', '${0}', '${hunt_id}')`, (error, insertRes) => {
                if (error) {
                    res.status(500).send({
                        success: 'false',
                        message: error
                    })
                    return;
                }
            })
 */


            setTimeout(() => {
                res.status(200).send({
                    success: 'true',
                    message: "Notification Send",
                    data: dataa
                })
                return;
            }, 1000)

        }
    })

}

module.exports = { huntShotDetailsById, sendNotificationForShot, particularShotDetailsById };