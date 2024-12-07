const db = require('../../db/dbConnection');


const liveHunts = (req,res)=>{

    db.query('SELECT Count(id) AS liveHunts FROM tbl_hunt WHERE end_date IS NULL AND end_time IS NULL',(err,data)=>{

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



module.exports = liveHunts;