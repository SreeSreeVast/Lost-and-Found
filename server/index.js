const express = require('express');
const app = express();

// Needed for DB tables HNN
const db = require('./models')

// NEED THIS WHENEVER PASSING ANYTHING TO BACKEND HNN
// ALSO NEED CORS to allow requests from the same device to go through HNN
app.use(express.json()); // Parse all JSONS that are sent to backendHNN

const cors = require('cors');
app.use(cors());

// Routings HNN
const postRouter = require('./routes/Posts');
app.use("/createPosts", postRouter);

const postNoImgRouter = require('./routes/PostsNoImage');
app.use("/createPostsNoImage", postNoImgRouter);


const viewPostRouter = require('./routes/ViewPosts');
app.use("/viewPosts", viewPostRouter);

const searchPostRouter = require('./routes/SearchPosts');
app.use("/searchPosts", searchPostRouter);

const msgRouter = require('./routes/Msg');
app.use('/createMsg', msgRouter);

const inboxRouter = require('./routes/Inbox');
app.use('/Inbox', inboxRouter);

const userRouter = require('./routes/Users');
app.use('/Users', userRouter);

const answerRouter = require('./routes/Answer');
app.use('/createAnswer', answerRouter);

const answersPageRouter = require('./routes/AnswersPage');
app.use('/AnswersPage', answersPageRouter);

//
//var mysql = require('mysql');
//const itemModel = require('./models/Posts');



// Routing
//const router = require('express').Router();

/*
// Image upload
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
*/

/*
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    //cb(null, 'images');
    cb(null, '../client/public');
  },
  filename: function(req, file, cb){

	cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});
*/

/* // Comment out for now HNN
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'images');
  },
  filename: function(req, file, cb){

	cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});
*/

/*
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({storage, fileFilter});
*/

/*
var con = mysql.createConnection({
  host: "ls-e37a3ddd5f99a8e9c1100a061f5554ac79ac04c6.cn5ycdfnko6g.us-east-1.rds.amazonaws.com",
  user: "dbmasteruser",
  password: "b9=(8k-cOaP>-9a$N}gsX;!nR+6i=gWi"
});
*/

//router.route('/addPost').post(upload.single('photo'), async (req, res) =>{
// app.post("/addPost", upload.single('photo'), async (req, res) =>{

/*
app.post("/add", upload.single('Photo'), async (req, res) =>{
	  //console.log("add ran");
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Location = req.body.Location;
    const Question1 = req.body.Question1;
    const Answer1 = req.body.Answer1;
    const photo = req.file.filename;
    //console.log(req.file);
    //console.log(photo);
    var postid = 0;

    let insertsql = "INSERT INTO dbLostAndFound.item (Title, Description, Location, ImageName, FinderID, Question1, Answer1, markedfordelete) VALUES";
    insertsql = insertsql + "(\"" + Title + "\",\"" + Description + "\",\"" + Location + "\",\"" + photo + "\",\"" + "1" + "\",\"" + Question1 + "\",\"" + Answer1 + "\", 0)";
    
    //console.log(insertsql);

    await con.query(insertsql, function (err, result, fields){
      if (err) throw err;
      res.send(result);
    })
  //console.log(postid);

});
*/

/* //Humza you cant take the same route as I did HNN
app.post("/add", async (req, res) =>{
	console.log("add ran");
    const Reciever = req.body.Reciever;
    const Subject = req.body.Subject;
    const Message = req.body.Message;

    let insertsql = "INSERT INTO dbLostAndFound.message (Reciever, Subject, Message) VALUES";
    insertsql = insertsql + "(\"" + Reciever + "\",\"" + Subject + "\",\"" + Message + "\";
    
    await con.query(insertsql, function (err, result, fields){
      if (err) throw err;
  
      console.log(fields);
    })
  
  res.send("Success");

});
*/


/*
app.post("/addItem", async(req, res) => {
  const Title = req.body.Title;
  const Description = req.body.Description;
  const Question1 = req.body.Question1;
  const Answer1 = req.body.Answer1;
  const photo = req.file.filename;


  let insertsql = "INSERT INTO dbLostAndFound.item (Title, Description, ImageName, FinderID, Question1, Answer1, markedfordelete) VALUES";
  insertsql = insertsql + "(\"" + Title + "\",\"" + Description + "\",\"" + "imagename.jpg" + "\",\"" + "1" + "\",\"" + Question1 + "\",\"" + Answer1 + "\", 0)";
  
  await con.query(insertsql, function (err, result, fields){
    if (err) throw err;

    console.log(fields);
  })

res.send("Success");

});
*/

/*
app.post("/searchItem", async(req, res) => {
    console.log("REQUEST RECIEVED");
    const searchTerm = req.body.searchTerm;
    console.log(searchTerm);
    let selectsql = "SELECT * FROM dbLostAndFound.item WHERE Title LIKE \"%"+ searchTerm +"%\" ";

    await con.query(selectsql, function (err, result, fields){
      if (err) throw err;
  
      console.log(result);
      res.send(result);
    })
  
  });

app.post("/viewItem", async(req, res) => {
  console.log("VIEW REQUEST RECIEVED");
  const ID = req.body.ID;
  console.log(ID);

  let sql = "SELECT * FROM dbLostAndFound.item WHERE IID = " + ID;

  await con.query(sql, function (err, result, fields){
    if (err) throw err;

    console.log(result);
    res.send(result);
  })

});
*/

// Initialize database at the same time start the API listening
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
		console.log("Backend Node.js running on port 3001")
		
	});
});
