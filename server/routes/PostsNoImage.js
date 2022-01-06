const express = require('express')
const router = express.Router() // Use built in express router
const { Posts } = require('../models') // instance of the DB model of Post

const app = express();
app.use(express.json());

router.post("/", async (req, res) => {


    console.log("HERE");
    // initialize empty object
    const postobj = {}
    // fill in attributes of that object
    postobj.Answer1 = req.body.Answer1;
    postobj.Description = req.body.Description;
    postobj.FinderID = req.body.FinderID;
    postobj.FoundItem = req.body.FoundItem;

    postobj.ImageName = req.body.Photo;

    postobj.Country = req.body.Country;
    postobj.Region = req.body.Region;
    postobj.Area = req.body.Area;


    postobj.Question1 = req.body.Question1;
    postobj.Tags = req.body.Tags;
    postobj.Title = req.body.Title;

    // for sequelize, pass an object with the same format as the model we created

    // Wait until this is done before sending the response (It's done asynchronously so we need to wait)

    result = await Posts.create(postobj).then((result) => {
        console.log("InsertedID IS" + result.IID);
        console.log(result);

        res.send(result);
    });
});



module.exports = router // Need to be able to access this router in index.js so we export it