const db = require('../../db/dbConnection');

const DeleteShot = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id || id == "") {
            res.status(400).send({
                success: "false",
                message: "Please provide id"
            })
            return;
        }
        db.query(`DELETE FROM tbl_what_about_shot WHERE id = '${id}'`, (error, result) => {
            if (error) throw error;
            if (result.affectedRows > 0) {
                res.status(200).send({
                    success: "true",
                    message: "Delete shot Successfully"
                })
            }
            else {
                res.status(400).send({
                    success: "false",
                    message: "id does not exist"
                })
            }
        })
        /* if (!user_id || user_id == "") {
            res.status(400).send({
                success: "false",
                message: "Please provide user id"
            })
            return;
        }
        db.query('SELECT hunt_id FROM tbl_what_about_shot WHERE id = "' + id + '"', (error, data) => {
            if (error) throw error;
            if (data.length < 1) {
                res.status(400).send({
                    success: "false",
                    message: "id does not exist"
                })
                return;
            }
            else {
                db.query(`select user_id from tbl_hunt where id='${data[0].hunt_id}'`, (error, dataa) => {
                    if (error) throw error;
                    if (dataa.length > 0) {
                        if (dataa[0].user_id !== user_id) {
                            res.status(400).send({
                                success: "false",
                                message: ""
                            })
                        }
                        else {
                            db.query(`DELETE FROM tbl_what_about_shot WHERE id = '${id}'`, (error, result) => {
                                if (error) throw error;
                                if (result.affectedRows > 0) {
                                    res.status(200).send({
                                        success: "true",
                                        message: "Delete shot Successfully"
                                    })
                                }
                                else {
                                    res.status(400).send({
                                        success: "false",
                                        message: "Failed to delete shot"
                                    })
                                }
                            })
                        }
                    }
                    else {
                        res.status(400).send({
                            success: false,
                            message: "hunt does not exist"
                        })
                    }
                })
            }
        }) */
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = DeleteShot;