const db = require('../../db/dbConnection');


const JoinLiveHunt = (req,res)=>{

    if(!req.body.hunter_id || req.body.hunter_id === null){
        res.status(400).send({
            success: 'false',
            message: 'Please Provide Hunter Id'
        })
        return;
    }

    if(!req.body.hunt_id || req.body.hunt_id === null){
        res.status(400).send({
            success: 'false',
            message: 'Please Provide Hunt Id'
        })
        return;
    }

    db.query('UPDATE tbl_hunters SET joinLiveHuntStatus = "'+req.body.joinLiveHuntStatus+'" , latitude = "'+req.body.latitude+'", longitude = "'+req.body.longitude+'" WHERE hunter_id = "'+req.body.hunter_id+'" AND hunt_id = "'+req.body.hunt_id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err
            })
            return;
        }
        else{
            res.status(200).send({
                success: 'true',
                message: 'Successs',
                data: data[0]
            })
        }
    })

}


module.exports = JoinLiveHunt;