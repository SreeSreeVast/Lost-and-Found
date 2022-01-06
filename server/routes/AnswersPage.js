const express = require('express')
const router = express.Router() // Use built in express router
const { answer } = require('../models') // instance of the DB model of Post

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/", async (req, res) => 
{
    console.log("REQUEST RECIEVED:" + req.body.Answer);
    const result = await answer.findAll({})

    console.log(result)
    res.send(result);
});

module.exports = router // Need to be able to access this router in index.js so we export it