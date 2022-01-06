const express = require('express')
const router = express.Router() // Use built in express router
const { message } = require('../models') // instance of the DB model of Post

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
    //console.log(searchTerm);
    //let selectsql = "SELECT * FROM dbLostAndFound.item WHERE Title LIKE \"%"+ searchTerm +"%\" ";


    const result = await message.findAll({
        where: {
            Receiver: req.body.Reciever,
        },
    })

    console.log(result)
    res.send(result);
});

module.exports = router // Need to be able to access this router in index.js so we export it