const db = require('../../db/dbConnection');


const updateUserLocation = (req,res)=>{
    db.query('UPDATE tbl_hunter SET latitude = "'+req.body.latitude+'", longitude = "'+req.body.longitude+'" WHERE hunter_id = "'
    +req.body.hunter_id+'"',(error,data)=>{

        if(error){
            res.status(500).send({
                success: "false",
                message: error
            })
            return;
        }

        else{
            res.status(200).send({
                success: "true",
                message: 'success',
                data: data
            })
            return;
        }
    })
}


module.exports = updateUserLocation;