const db = require('../../db/dbConnection');

const topHunter = (req,res)=>{

    function dynamicSort(property) {
        var sortOrder = -1;
        if(property[0] === "-") {
            sortOrder = 1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    db.query('SELECT a.hunter_id, SUM(c.no_of_killed) AS totalShots , b.full_name AS HunterName FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id INNER JOIN tbl_what_about_shot c ON a.hunt_id = c.hunt_id ',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }

        
   

        else{
           
            setTimeout(()=>{
                //console.log(data, "dataaaaa")
                data.sort(dynamicSort("totalShots"))
                res.status(200).send({
                    success: 'true',
                    message: "Data Collected Successfully",
                    data: data[0]
                })

            },100)
           
        }
    })
}


module.exports = topHunter;