const db = require('../../db/dbConnection');


const DeleteHunt = (req, res)=>{
    if(!req.body.id || req.body.id == ""){
        res.status(400).send({
            success: false,
            message: 'Please Provide Hunt Id'
        })
        return
    }


    db.query('DELETE FROM tbl_hunt WHERE id = "'+req.body.id+'"',(error, data)=>{
        if(error){
            res.status(500).send({
                success: false,
                message: error
            })
            return;
        }


        else{

            res.status(200).send({
                success: true,
                message: 'Hunt Deleted Successfully'
            })
            return;

        }
    })
}


module.exports = DeleteHunt;