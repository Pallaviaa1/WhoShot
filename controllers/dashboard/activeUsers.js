const db = require('../../db/dbConnection');


const activeUsers = (req,res)=>{

    db.query('SELECT Count(id) AS ActiveUsers FROM tbl_app_users WHERE hunter_status = 1 AND deleteStatus = 0',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }

        else{
            res.status(200).send({
                success: "true",
                message: "Data Collected Successfully",
                data: data[0]
            })
            return;
        }
    })
}

module.exports = activeUsers;