const express = require('express')
const router = express.Router() // Use built in express router
const { Posts } = require('../models') // instance of the DB model of Post

router.post("/", async (req, res) => {

    const ID = req.body.ID;
    console.log("VIEW REQUEST FOR POST:" + ID);

    const Posting = await Posts.findOne({
        where: {
            IID: ID,
        },
    })

    res.send(Posting);
  
});


module.exports = router // Need to be able to access this router in index.js so we export it