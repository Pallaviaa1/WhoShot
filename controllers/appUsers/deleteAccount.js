const db = require("../../db/dbConnection");

const deleteAccount = (req, res) => {

  if(!req.body.id || req.body.id == ""  || req.body.id === null){
    res.status(400).send({
      success: "false",
      message: "Please Provide Id"
    })
    return;
  }
  db.query('UPDATE tbl_app_users SET delete_account = 2 WHERE id = "'+req.body.id+'"',(err,data)=>{

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
        message: "Account Deleted"
      })
    }
  });
};

module.exports = deleteAccount;
