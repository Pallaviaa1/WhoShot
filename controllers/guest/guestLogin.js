const db = require("../../db/dbConnection");


const loginAsGuest = (req,res)=>{
    if(req.body.device_id == "" || req.body.device_id == null){
        res.status(400).send({
            success: "false",
            message: "Please Provide Device Id"
        })
        return;
    }

    if(req.body.full_name == "" || req.body.full_name == null){
        res.status(400).send({
            success: "false",
            message: "Please Provide Guest Name"
        })
        return;
    }
    

    db.query('SELECT id,device_id, full_name FROM tbl_app_users WHERE device_id= "'+req.body.device_id+'" AND full_name = "'+req.body.full_name+'"',(error,data)=>{
        if(error){
            res.status(500).send({
                success: "false",
                message: error
            })
            return;
        }

        if(data.length !== 0){
            // res.status(201).send({
            //     success: "true",
            //     message: "login success"
            // })
            // return;
            db.query('SELECT id,device_id,full_name,user_type,date FROM tbl_app_users WHERE device_id = "'+req.body.device_id+'" AND full_name = "'+req.body.full_name+'"',(err,dataa)=>{
                if(err){
                    res.status(500).send({
                        success: "false",
                        message: err
                    })
                    return;
                }
                res.status(200).send({
                    success: "true",
                    message: "Login Successfully",
                    data:dataa[0]
                })
                return;

            })
        }

        else{
            
            db.query(`INSERT INTO tbl_app_users(device_id,full_name,user_type) VALUES('${req.body.device_id}', '${req.body.full_name}', '${2}')`,(err,data)=>{
                if(err){
                    res.status(500).send({
                        success: "false",
                        message: err
                    })
                    return;
                }

            })

            db.query('SELECT id,device_id,full_name,user_type,date FROM tbl_app_users WHERE device_id = "'+req.body.device_id+'" AND full_name = "'+req.body.full_name+'"',(err,dataa)=>{
                if(err){
                    res.status(500).send({
                        success: "false",
                        message: err
                    })
                    return;
                }
                res.status(200).send({
                    success: "true",
                    message: "Login Successfully",
                    data:dataa[0]
                })
                return;

            })

            
        }
    })


}


module.exports = loginAsGuest;