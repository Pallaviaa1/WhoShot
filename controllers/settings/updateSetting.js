const sql = require("../../db/dbConnection");

const updateUsers = (request, res) => {
  if (!request.body.id || request.body.id === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide User Id",
    });
    return;
  }

  if (request.body.name == "" || request.body.name === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Name",
    });
    return;
  }

  if (request.body.phone == "" || request.body.phone === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Phone Number",
    });
    return;
  }

  if (request.body.address == "" || request.body.address === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Address",
    });
    return;
  }

  if (request.body.postal == "" || request.body.postal === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Postal Code",
    });
    return;
  }

  if (request.body.gender == "" || request.body.gender === null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Gender",
    });
    return;
  }

  if (request.body.profile_image == "") {
    var sqls =
      'UPDATE  tbl_users SET name ="' +
      request.body.name +
      '", phone = "' +
      request.body.phone +
      '", address = "' +
      request.body.address +
      '", gender = "' +
      request.body.gender +
      '", postal = "' +
      request.body.postal +
      '", email = "' +
      request.body.email +
      '" WHERE id = "' +
      request.body.id +
      '"';
  } else {
    var sqls =
      'UPDATE  tbl_users SET name ="' +
      request.body.name +
      '", phone = "' +
      request.body.phone +
      '", address = "' +
      request.body.address +
      '", gender = "' +
      request.body.gender +
      '", postal = "' +
      request.body.postal +
      '", profile_image="' +
      request.file.filename +
      '", email = "' +
      request.body.email +
      '" WHERE id = "' +
      request.body.id +
      '"';
  }

  sql.query(sqls, (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Data Updated Successfully",
    });
    return;
  });
};

module.exports = updateUsers;
