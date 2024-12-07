const db = require('../../db/dbConnection');


const totalHunts = (req,res)=>{

    db.query('SELECT Count(id) AS totalHunt FROM tbl_hunt WHERE hunt_delete = 0',(err,data)=>{

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
        }
    })
}


module.exports = totalHunts;