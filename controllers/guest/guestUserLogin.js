const db = require('../../db/dbConnection');

const guestUserLogin = (req,res)=>{

    if(!req.body.full_name || req.body.full_name === null){
        res.status(400).send({
            success: "false",
            message: "Please Provide Guest Name"
        })
        return;
    }

    if(!req.body.user_type || req.body.user_type === null){
        res.status(400).send({
            success: "false",
            message: "Please Provide User Type"
        })
        return;
    }


    db.query('SELECT * FROM tbl_app_users WHERE user_type = 2',(err,data)=>{
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
                message: "success",
                data: data
            })
            return;
        }
    })
}
//guest user login
//guest user join live hunts
// guest user change hunt Details by hunt_id
//hunter in live hunts


module.exports = guestUserLogin;