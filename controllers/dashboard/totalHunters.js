const db = require('../../db/dbConnection');


const totalHunters = (req,res)=>{

    db.query('SELECT Count(id) AS totalHunters FROM tbl_app_users WHERE deleteStatus = 0',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
        }


        else{
            res.status(200).send({
                success: "true",
                message: "Data Collected Successfully",
                data: data[0]
            })
        }
    })
}



module.exports = totalHunters;
