const express = require('express')
const router = express.Router() // Use built in express router
const { message } = require('../models') // instance of the DB model of Post

router.post("/", async (req, res) => {
    const msgobj = {}

    msgobj.Sender = req.body.Sender;
    msgobj.Receiver = req.body.Receiver;
    msgobj.Subject = req.body.Subject;
    msgobj.Message = req.body.Message;

    console.log(msgobj);

    result = await message.create(msgobj).then((result) => 
    {
        res.send(result);
    });
});


module.exports = router // Need to be able to access this router in index.js so we export it