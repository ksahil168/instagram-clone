var express = require("express");
var router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local");

//exported from users.js
const userModel = require("./users");
const postModel = require("./posts");
const storyModel = require("./story");

//letting user to login
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer");
const utils = require("../utils/utils");


// GET
router.get('/', function(req, res) {
  res.render('index', {footer: false});
});

router.get('/login', function(req, res) {
  res.render('login', {footer: false});
});

router.get('/feed', function(req, res) {
  res.render('feed', {footer: true});
});

router.get('/profile', function(req, res) {
  const user = req.user; 
  res.render('profile', {user,footer: true});
});

router.get('/search', function(req, res) {
  res.render('search', {footer: true});
});

router.get('/edit', function(req, res) {
  res.render('edit', {footer: true});
});

router.get('/upload', function(req, res) {
  res.render('upload', {footer: true});
});


// POST
//this will fetch the data from the login page where user will input the data
router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  // now we are taking password, when a user inputs a right password will be redirected to profile
  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

module.exports = router;
