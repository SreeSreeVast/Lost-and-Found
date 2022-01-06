const express = require('express')
const router = express.Router() // Use built in express router
const { Posts } = require('../models') // instance of the DB model of Post


// Image upload
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { stringify } = require('querystring');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      //cb(null, 'images');
      cb(null, '../client/public/userimages');
    },
    filename: function(req, file, cb){
  
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  };
  
  let upload = multer({storage, fileFilter});

router.post("/", upload.single('Photo'), async (req, res) => {

    // initialize empty object
    const postobj = {}
    // fill in attributes of that object
    postobj.Answer1 = req.body.Answer1;
    postobj.Description = req.body.Description;
    postobj.FinderID = req.body.FinderID;
    postobj.FoundItem = req.body.FoundItem;

    postobj.ImageName = req.file.filename;

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