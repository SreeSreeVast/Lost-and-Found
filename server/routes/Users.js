const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

///// Work form Kaleb Barber //////
router.post("/userPost", async (req,res) => {
	console.log("REQUEST RECIEVED:" + req.body.searchTerm);
    const searchTerm = req.body.searchTerm;
	const result = await Posts.findAll({
        where: {
            UID: searchTerm
        }
    })

    //console.log(result);
    res.send(result);
})

router.post("/removePost", async (req,res) => {
	console.log("REMOVE REQUEST RECIEVED:" + req.body.searchTerm);
	const searchTerm = req.body.searchTerm;
	const result = await Posts.destroy({
		where: {
			IID:searchTerm  
		}
	}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
		if(rowDeleted === 1){
			console.log('Deleted successfully');
		}	
		}, function(err){
			console.log(err); 
		});
	
})

module.exports = router;
