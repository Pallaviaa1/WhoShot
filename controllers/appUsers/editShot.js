const db = require('../../db/dbConnection');

const EditShot = async (req, res) => {
    try {
        const { id, no_of_wound, no_of_missed, no_of_killed, description } = req.body;
        if (!req.body.id || req.body.id == "") {
            res.status(400).send({
                success: "false",
                message: "Please provide shot id"
            })
            return;
        }
        /* if(!no_of_wound || no_of_wound == ""){
            res.status(400).send({
                success: "false",
                message: "Please provide no of wound"
            })
            return;
        }
        if(!description || description == ""){
            res.status(400).send({
                success: "false",
                message: "Please provide description"
            })
            return;
        }
        if(!no_of_missed || no_of_missed == ""){
            res.status(400).send({
                success: "false",
                message: "Please provide no of missed"
            })
            return;
        }
        if(!no_of_killed || no_of_killed == ""){
            res.status(400).send({
                success: "false",
                message: "Please provide no of killed"
            })
            return;
        } */
        db.query('SELECT id FROM tbl_what_about_shot WHERE id = "' + req.body.id + '"', (error, data) => {
            if (error) throw error;
            if (data.length < 1) {
                res.status(400).send({
                    success: "false",
                    message: "id does not exist"
                })
                return;
            }
            else {
                const updateQuery = `UPDATE tbl_what_about_shot set no_of_wound =?, no_of_missed=?, no_of_killed=?, description=? where id=?`;
                db.query(updateQuery, [no_of_wound, no_of_missed, no_of_killed, description, id], (error, dataa) => {
                    if (error) throw error;
                    if (dataa.affectedRows > 0) {
                        res.status(200).send({
                            success: true,
                            message: "Update details successfully"
                        })
                    }
                    else {
                        res.status(400).send({
                            success: false,
                            message: "Failed to update details"
                        })
                    }
                })
            }
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = EditShot;