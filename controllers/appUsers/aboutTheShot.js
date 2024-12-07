const db = require('../../db/dbConnection');
var FCM = require("fcm-node");


const aboutTheShot = (req,res)=>{
    if(!req.body.hunter_id || req.body.hunter_id == ""){
        res.status(400).send({
            success: "false",
            message: "Please provide hunter id"
        })
        return;
    }
    if(!req.body.description || req.body.description == ""){
        res.status(400).send({
            success: "false",
            message: "Please provide description"
        })
        return;
    }

    db.query('SELECT hunter_id FROM tbl_hunters WHERE hunter_id = "'+req.body.hunter_id+'"',(error,data)=>{
        if(error){
            res.status(500).send({
                success: "false",
                message: error
            })
            return;
        }
       
        if(data.length == ""){
            res.status(400).send({
                success: "false",
                message: "Hunter id does not exist"
            })
            return;
        }

        else{ 
          
            db.query(`INSERT INTO tbl_what_about_shot(hunter_id,hunt_id,no_of_wound,no_of_missed,no_of_fire,no_of_killed,description) VALUES('${req.body.hunter_id}','${req.body.hunt_id}', '${req.body.no_of_wound}', '${req.body.no_of_missed}', '${0}', '${req.body.no_of_killed}', '${req.body.description}')`,(error,dataa)=>{
                if(error){
                    res.status(500).send({
                        success: "false",
                        message: error
                    })
                    return;
                }
                else{
                    const hunterData = []

                    var notificationDescription
                    var notiTitle = "WhoShot";

                    db.query('SELECT full_name AS hunterName FROM tbl_app_users WHERE id = "'+req.body.hunter_id+'"',(error,data)=>{
                        if(error){
                            res.status(500).send({
                                success: "false",
                                message: error
                            })
                            return;
                        }
                        else{
                            notificationDescription =  `${data[0].hunterName} made a shot`

                        }
                    })

                    db.query('SELECT a.hunter_id, b.full_name AS hunterName, b.device_token FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id WHERE a.hunt_id = "'+req.body.hunt_id+'"',(err,data)=>{
                        if(err){
                            res.status(500).send({
                                success: "false",
                                message: err
                            })
                            return;
                        }

                        else{
                            data.forEach((e)=>{
                                let arr = {}

                                arr["deviceToken"] = e.device_token;
                                arr["hunterName"] = e.huntername;
                                arr["hunterId"] = e.hunter_id;
                               

                                
                    setTimeout(()=>{  
                        var serverKey =
                      "AAAA5utSxiE:APA91bEfsCkfkQE_B0B7KSZYggFu_ScpJeu3z_Fv-zvqk8l7c0bi_ypNkLQvsr2YdRveFQPETdOWKNj5HsaSJ_tvRPAqNmKSTa1JBrYFGvL1cIRPQXOTiKMXjZlC7FmXajzKjNVxwj35";
                    var fcm = new FCM(serverKey);
                    
                    // var deviceToken = resultappuser[0].deviceToken;
                    var deviceToken = e.device_token
                    var message = {
                      to: deviceToken,
                      notification: {
                        title: notiTitle,
                        body: notificationDescription,
                      //   huntId: dataArr[0].hunt_id,
                        noti_type: 5
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
                      },1000)
                            })
                        }
                    })

                
                setTimeout(()=>{
                    res.status(200).send({
                        success: "true",
                        message: "Success"
                    })
                    return;

                },100)
                    
                }
            })
        }
    })
}

module.exports = aboutTheShot;


{/* <script>
function daysDifference() {
  //define two variables and fetch the input from HTML form
  var dateI1 = document.getElementById("dateInput1").value;
  var dateI2 = document.getElementById("dateInput2").value;

 //define two date object variables to store the date values
  var date1 = new Date(dateI1);
  var date2 = new Date(dateI2);

 //calculate time difference
  var time_difference = date2.getTime() - date1.getTime();

  //calculate days difference by dividing total milliseconds in a day
  var result = time_difference / (1000 * 60 * 60 * 24);

  return document.getElementById("result").innerHTML =  
       result + " days between both dates. ";
             }
</script>   */}