const express = require('express')
const router = express.Router() // Use built in express router
const { answer } = require('../models') // instance of the DB model of Post

router.post("/", async (req, res) => {
    const answerobj = {}

    answerobj.Answer = req.body.Answer;

    console.log(answerobj);

    result = await answer.create(answerobj).then((result) => 
    {
        res.send(result);
    });
});


module.exports = router // Need to be able to access this router in index.js so we export it