const db = require("../../db/dbConnection");
var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const checkPhone = (req, res) => {
  var phoneNumb = "+" + req.body.phone

  const sendOTP = async (phoneNumber) => {
    try {
      const user = await admin.auth().createUser({
        phoneNumber: phoneNumber,
      });
      console.log(`OTP sent to ${phoneNumb}: ${user.toJSON().uid}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  if (!req.body.phone || req.body.phone == "" || req.body.phone == null) {
    res.status(500).send({
      success: "false",
      message: "Please Enter Your Phone Number",
    });
    return;
  }

  db.query(
    'SELECT id,phone FROM tbl_app_users WHERE phone = "' + req.body.phone + '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      }

      if (data.length == 0) {
        // sendOTP(phoneNumb)
        res.status(201).send({
          success: "false",
          message: "No Account Exist With This Phone No Please Create New Account",
        });
        return;
      } else {
      
        
        
       
      
       
        res.status(200).send({
          success: "true",
          data: data[0],
          message: "Otp Send Successfully",
        });
        return;
      }
    }
  );
};

module.exports = checkPhone;
