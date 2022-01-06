const express = require('express')
const router = express.Router() // Use built in express router
const { Posts } = require('../models') // instance of the DB model of Post

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/", async (req, res) => {

    console.log("REQUEST RECIEVED:" + req.body.searchTerm);
    console.log("REQUEST RECIEVED:" + req.body.searchCountry);
    console.log("REQUEST RECIEVED:" + req.body.searchCity);
    const searchTerm = req.body.searchTerm;
    const searchCountry = req.body.searchCountry;
    const searchCity = req.body.searchCity;
    //console.log(searchTerm);
    //let selectsql = "SELECT * FROM dbLostAndFound.item WHERE Title LIKE \"%"+ searchTerm +"%\" ";

    //const result = await sequelize.query("SELECT * FROM Posts WHERE Title LIKE \"%" + this.search + "%\" ", { type: QueryTypes.SELECT });

    const result = await Posts.findAll({
        where: {
            [Op.or]: [
                {
                    Title: {
                        [Op.like]: '%' + searchTerm + '%'
                    }
                },
                {
                    Tags: {
                        [Op.like]: '%' + searchTerm + '%'
                    }
                },
                
                {
                    [Op.and]: [
                        {
                            Country:{
                                [Op.like]: '%' + searchCountry + '%'
                            }
                        },
                        {
                            Region:{
                                [Op.like]: '%' + searchCity + '%'
                            }
                        },
                        
                    ]
                }
            ]
            
        }       //[Op.or]: '%' + searchTerm + '%'
            //}
    })
    //console.log(result);
    res.send(result);
});


module.exports = router // Need to be able to access this router in index.js so we export it