const db = require('../../db/dbConnection');


const getHunterInLiveHunt = (req,res)=>{
    const resultData = [];
   

    if(!req.body.hunt_id || req.body.hunt_id == "" || req.body.hunt_id === null){
        res.status(400).send({
            success: 'false',
            message: 'Please Provide Hunt Id'
        })
        return;
    }


    //function
    const gethunterScore = (huntId, hunter_id)=>{
        var data1 = []

        db.query('SELECT SUM(no_of_killed) AS no_of_killed, SUM(no_of_missed) AS no_of_missed, SUM(no_of_wound) AS no_of_wound, SUM(no_of_fire) AS no_of_fire FROM tbl_what_about_shot WHERE hunt_id = "'+huntId+'" AND hunter_id = "'+hunter_id+'"',(err,dataa)=>{
            if(err){
                res.status(500).send({
                    success: "false",
                    message: err
                })
                return;
            }

            else{
                data1.push(dataa[0])
            }
        })
        return data1

    }



    const getHuntAdminName = (adminId)=>{
        var adminNameData = []
       
        db.query('SELECT full_name AS adminName FROM tbl_app_users WHERE id = "'+adminId+'"',(err, data)=>{
            if(err){
                res.status(500).send({
                    success: false,
                    message: err
                })
                return;
            }

            adminNameData.push(data[0])
        })
        
            return adminNameData;
    
        
       
    }



    //function
    
    db.query(`SELECT  a.*,c.hunt_name, b.full_name AS hunterName, b.profile FROM tbl_hunters a 
    INNER JOIN tbl_app_users b ON a.hunter_id = b.id 
    INNER JOIN tbl_hunt c ON a.hunt_id = c.id 
    WHERE a.hunt_id = "'+req.body.hunt_id+'" AND a.joinLiveHuntStatus = 1 AND a.hunter_remove_status = 0`,(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }

        else{
            // console.log(data)


            data.forEach((e)=>{
                var arr = {}
                arr['hunterName'] = e.hunterName;
                arr['profile'] = e.profile;
                arr['huntId'] = e.hunt_id;
                arr['huntName'] = e.hunt_name;
                arr['hunterId'] = e.hunter_id;
                arr['adminId'] = e.admin_id;
                arr['latitude'] = e.latitude;
                arr['longitude'] = e.longitude;
                arr['score'] = gethunterScore(e.hunt_id, e.hunter_id)
                arr['huntAdmin'] = getHuntAdminName(e.admin_id)
                resultData.push(arr)
            })

           

            setTimeout(()=>{
                // console.log(resultData, "check result data")
                res.status(200).send({
                    success: "true",
                    message: "Collecting Data",
                    data: resultData,
                   
                })
                return;

            },1000)
            
        }
    })


}

module.exports  = getHunterInLiveHunt;