const db = require('../../db/dbConnection');

const updateHunterStatus = (req,res)=>{
    if(!req.body.id || req.body.id === null){
        res.status(400).send({
            success: "false",
            message: "Please Provide hunter Id"
        })
        return;
    }

    if(req.body.hunter_status == "" || req.body.hunter_status == null){
        res.status(400).send({
            success: "false",
            message: "Please Provide Hunter Status"
        })
        return;
    }

    db.query('UPDATE tbl_app_users SET hunter_status = "'+req.body.hunter_status+'" WHERE id = "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }

        else{
            if(req.body.hunter_status === '1'){
                res.status(200).send({
                    success: "true",
                    message: "Hunter Active"
                })
                return;

            }
            else{
                res.status(200).send({
                    success: "true",
                    message: "Hunter Inactive"
                })
                return;
            }
            
        }
    })
}


module.exports = updateHunterStatus;