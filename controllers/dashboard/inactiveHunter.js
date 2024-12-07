const db = require('../../db/dbConnection');


const inactiveHunters = (req,res)=>{

    db.query('SELECT Count(id) AS InactiveHunters FROM tbl_app_users WHERE hunter_status = 2',(err,data)=>{

        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }

        else{
            res.status(200).send({
                success: 'true',
                message: "Data Collected Successfully",
                data: data[0]
            })
        }
    })
}


module.exports = inactiveHunters;