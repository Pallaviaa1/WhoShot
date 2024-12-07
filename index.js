const express = require("express");
const port = 8000;
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
const { urlencoded } = require("express");
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
const db = require("./db/dbConnection");
const compression = require('compression');
app.use(cors());
app.use(compression());
app.use(express.static("public"));
const multer = require("multer");
const md5Hash = require("crypto-js");
// var morgan = require('morgan');
// app.use(morgan('combined'));


//Import Controllers
const addPrivacy = require("./controllers/privacyPolicy/createPrivacyPolicy");
const GetPrivacy = require("./controllers/privacyPolicy/getPrivacy");
const termsConditions = require("./controllers/termsAndServices/termsCondition");
const GetTerms = require("./controllers/termsAndServices/getTerms");
const Contact = require("./controllers/Contact/contact");
const getContact = require("./controllers/Contact/getContact");
const aboutUs = require("./controllers/aboutUs/about");
const getAboutUs = require("./controllers/aboutUs/getAbout");
const getHunts = require("./controllers/appUsers/getHunts");
const updateHuntStatus = require("./controllers/appUsers/updateHuntStatus");
const deleteHunt = require("./controllers/appUsers/deleteHunt");
const getAllHunters = require("./controllers/tbl_hunter/getHunters");
const getHunterDetailsById = require("./controllers/tbl_hunter/getHunterDetailsById");
const hunterDelete = require("./controllers/tbl_hunter/deleteHunter");
const sendNotification = require("./controllers/notification/sendNotification");
const sendMsgNotification = require("./controllers/notification/sendMessageNotification");
const getNotification = require("./controllers/notification/getNotification");
const updateSettings = require("./controllers/settings/updateSetting");
const getUserById = require("./controllers/settings/getUserById");
const getHuntDetailsByID = require("./controllers/tbl_hunt/getHuntDetailsById");
const groupDetails = require("./controllers/group/groupDetail");
const basicReport = require("./controllers/basicReport/getBasicReport");
const resetAdminPassword = require("./controllers/adminPassword/resetAdminPassword");
// const huntDetails = require('./controllers/tbl_hunt/huntDetailsByID');
const sendNotifications = require("./controllers/notification/sendNotifications");
const getAllHunt = require("./controllers/tbl_hunt/getAllHunt");
const getHunter = require("./controllers/tbl_hunter/getAllHunter");
const downloadReport = require("./controllers/basicReport/downloadReport");
const notificationDetailsById = require("./controllers/notification/notificationDetailsById");
const deleteNotification = require("./controllers/notification/deleteNotificationByAdmin");
const downloadHunterReport = require("./controllers/basicReport/downloadHunterReport");
const huntStatus = require("./controllers/tbl_hunt/huntStatus");
const totalHunts = require('./controllers/dashboard/totalHunts');
const totalHunters = require('./controllers/dashboard/totalHunters');
const liveHunts = require('./controllers/dashboard/liveHunt');
const topHunt = require('./controllers/dashboard/topHunt');
const hunterStatus = require('./controllers/tbl_hunter/hunterStatus');
const inactiveHunters = require('./controllers/dashboard/inactiveHunter');
const activeUsers = require('./controllers/dashboard/activeUsers');
const topHunter = require('./controllers/dashboard/topHunter');
const forgotPassword = require('./controllers/adminPassword/forgotPassword');
const changeAdminPassword = require('./controllers/adminPassword/changePassword');

//For Mobile
const userSignUp = require("./controllers/appUsers/signUp");
const userLogin = require("./controllers/appUsers/userLogin");
const createHunt = require("./controllers/appUsers/createHunt");
const updateAppUser = require("./controllers/appUsers/updateUserDetails");
const changeUserPassword = require("./controllers/appUsers/changePassword");
const hunterLogin = require("./controllers/tbl_hunter/huntersLogin");
const getLiveHunts = require("./controllers/appUsers/getLiveHunts");
const getHuntById = require("./controllers/appUsers/getHuntsByid");
const getHuntDetailsById = require("./controllers/appUsers/huntDetailsById");
const cancelHunt = require("./controllers/appUsers/cancelHunt");
const updateHunt = require("./controllers/appUsers/updateHunt");
const pastHuntResults = require("./controllers/appUsers/pastHuntResults");
const getUserProfile = require("./controllers/appUsers/getUserProfile");
const exitHunt = require("./controllers/appUsers/exitHunt");
const getNotificationByHuntId = require("./controllers/notification/getNotificationByHuntId");
const exitHunterByAdmin = require("./controllers/appUsers/exitHunterByAdmin");
// const startHunt = require("./controllers/tbl_hunt/startHunt");
const startHunt = require("./controllers/tbl_hunt/startHuntt")
const checkHuntStatus = require("./controllers/tbl_hunt/checkHuntStatus");
const forgetPassword = require("./controllers/appUsers/forgetPassword");
const checkPhoneNumber = require("./controllers/appUsers/checkPhone");
const clearAllNotification = require("./controllers/notification/clearAllNotificationByUser");
const huntDetailsByID = require("./controllers/tbl_hunt/huntDetailsByID");
const participateHunt = require("./controllers/appUsers/participateHuntDetails");
const deleteNotificationByUser = require("./controllers/notification/deleteNotificationByUser");
const notificationSetting = require("./controllers/notification/notificationSetting");
const notificationOneDayBefore = require("./controllers/notification/oneDayBeforeNotification");
const hunterDeleteByHuntAdmin = require("./controllers/tbl_hunter/hunterDeleteByhuntAdmin");
const notificationCount = require("./controllers/notification/notificationCount");
const deleteAccount = require("./controllers/appUsers/deleteAccount");
const getHunterInLiveHunt = require('./controllers/tbl_hunter/getHunterInLiveHunt');
const guestLogin = require("./controllers/guest/guestLogin");
const joinLiveHunt = require("./controllers/tbl_hunt/joinLiveHunt");
const exitHunter = require("./controllers/tbl_hunter/exitHunter");
const whatAboutTheShot = require("./controllers/appUsers/aboutTheShot")
const deleteHuntt = require('./controllers/tbl_hunt/deleteHunt');
const {huntShotDetailsById, sendNotificationForShot, particularShotDetailsById} = require('./controllers/tbl_hunter/huntShotDetailsById');
const UpdateTheShot = require("./controllers/appUsers/editShot");
const DeleteTheShot = require("./controllers/appUsers/deleteShot");

// const fs = require('fs')

// const DIR = './image'

// if(!fs.existsSync(DIR)){
//   fs.mkdirSync(DIR)
// }

// const DIR2 = './pdf'

// if(!fs.existsSync(DIR2)){
//   fs.mkdirSync(DIR2)
// }


//upload Image Function
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image");
    // cb(null, "./image")
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});





const imageFilter = function (req, file, cb) {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
});

//Routes For Web
app.post("/web/api/privacy", addPrivacy);
app.get("/web/api/getPrivacy", GetPrivacy);
app.post("/web/api/termsConditions", termsConditions);
app.get("/web/api/getTerms", GetTerms);
app.post("/web/api/contact", Contact);
app.get("/web/api/getContact", getContact);
app.post("/web/api/aboutUs", aboutUs);
app.get("/web/api/getAboutUs", getAboutUs);
app.get("/web/api/getHunts", getHunts);
app.post("/web/api/updateHuntStatus", updateHuntStatus);
app.post("/web/api/deleteHunt", deleteHunt);
app.get("/web/api/getAllHunters", getAllHunters);
app.post("/web/api/getHunterDetailsById", getHunterDetailsById);
app.post("/web/api/hunterDelete", hunterDelete);
app.post("/web/api/sendNotification", sendNotification);
app.post("/web/api/sendMsgNotification", sendMsgNotification);
app.get("/web/api/getNotification", getNotification);
app.post(
  "/web/api/updateAdmin",
  upload.single("profile_image"),
  updateSettings
);
app.post("/web/api/getAdminById", getUserById);
app.post("/web/api/getHuntDetailsByID", getHuntDetailsByID);
app.get("/web/api/groupDetails", groupDetails);
app.get("/web/api/basicReport", basicReport);
app.post("/web/api/resetAdminPassword", resetAdminPassword);
app.post("/web/api/huntDetalis", huntDetailsByID);
app.post("/web/api/sendNotifications", sendNotifications);
app.get("/web/api/getAllHunt", getAllHunt);
app.get("/web/api/gethunter", getHunter);
app.post("/web/api/downloadReport", downloadReport);
app.post("/web/api/notificationDetailsById", notificationDetailsById);
app.post("/web/api/deleteNotification", deleteNotification);
app.post("/web/api/downloadHunterReport", downloadHunterReport);
app.post("/web/api/huntStatus", huntStatus);
app.post("/web/api/totalHunts", totalHunts);
app.post("/web/api/totalHunters", totalHunters);
app.post("/web/api/liveHunts", liveHunts);
app.post("/web/api/topHunt", topHunt);
app.post("/web/api/hunterStatus", hunterStatus);
app.post("/web/api/inactiveHunters", inactiveHunters);
app.post("/web/api/acitveUsers", activeUsers);
app.post("/web/api/topHunter", topHunter);
app.post("/web/api/forgotPassword", forgotPassword);
app.post("/web/api/changePassword", changeAdminPassword);

//Routes For Mobile App
app.post("/whoShot/api/userSignUp", userSignUp);
app.post("/whoShot/api/userLogin", userLogin);
app.post("/whoShot/api/createHunt", upload.single("hunt_image"), createHunt);
app.post("/whoShot/api/updateProfile", upload.single("profile"), updateAppUser);
app.post("/whoShot/api/resetPassword", changeUserPassword);
app.post("/whoShot/api/joinHunt", hunterLogin);
app.get("/whoShot/api/getLiveHunts", getLiveHunts);
app.post("/whoShot/api/getHuntById", getHuntById);
app.post("/whoShot/api/huntDetailsById", getHuntDetailsById);
app.post("/whoShot/api/cancelHunt", cancelHunt);
app.post("/whoShot/api/updateHunt", upload.single("hunt_image"), updateHunt);
app.post("/whoShot/api/getPastHunt", pastHuntResults);
app.post("/whoShot/api/getUserProfile", getUserProfile);
app.post("/whoShot/api/exitHunt", exitHunt);
app.post("/whoShot/api/getNotificationById", getNotificationByHuntId);
app.post("/whoShot/api/exitHunterByAdmin", exitHunterByAdmin);
app.post("/whoShot/api/startHunt", startHunt);
app.post("/whoShot/api/checkHuntStatus", checkHuntStatus);
app.post("/whoShot/api/forgetPassword", forgetPassword);
app.post("/whoShot/api/checkPhoneNumber", checkPhoneNumber);
app.post("/whoShot/api/clearAllNotification", clearAllNotification);
app.post("/whoShot/api/participateHunt", participateHunt);
app.post("/whoShot/api/deleteNotification", deleteNotificationByUser);
app.post("/whoShot/api/notificationSetting", notificationSetting);
app.post("/whoShot/api/notificationOneDayBefore", notificationOneDayBefore);
app.post("/whoShot/api/hunterDeleteByHuntAdmin", hunterDeleteByHuntAdmin);
app.post("/whoShot/api/notificationCount", notificationCount);
app.post("/whoShot/api/deleteAccount", deleteAccount);
app.post("/whoShot/api/getHunterInLiveHunts", getHunterInLiveHunt);
app.post("/whoShot/api/guestLogin", guestLogin);
app.post("/whoShot/api/JoinLiveHunt", joinLiveHunt);
app.post("/whoShot/api/exitHunter", exitHunter);
app.post("/whoShot/api/whatAboutTheShot", whatAboutTheShot);
app.post("/whoShot/api/deleteHunt", deleteHuntt);
app.post("/whoShot/api/huntShotDetailsById", huntShotDetailsById);
app.post('/whoShot/api/sendNotificationForShot', sendNotificationForShot);
app.post("/whoShot/api/particularShotDetailsById", particularShotDetailsById);
app.post("/whoShot/api/UpdateTheShot", UpdateTheShot);
app.post("/whoShot/api/deleteShot", DeleteTheShot);


app.post("/web/api/loginAdmin", (req, res) => {
  if (req.body.email == "" || req.body.email == null) {
    return res.status(400).send({
      success: "false",
      msg: "email  is empty!",
    });
  }
  if (req.body.password == "" || req.body.password == null) {
    return res.status(400).send({
      success: "false",
      msg: "password is empty!",
    });
  }
  var encryptPassowrd = md5Hash.MD5(req.body.password);
  db.query(
    'SELECT * FROM tbl_users WHERE password="' +
      encryptPassowrd +
      '" AND email ="' +
      req.body.email +
      '"',
    (err, result) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          success: "false",
          msg: "Email or password is incorrect!",
        });
      } else {
        return res.status(200).send({
          success: "true",
          msg: "Login Successfully!",
          user: result[0],
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`server is listening to the port on ${port}`);
});

