var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require("../models");
var bcrypt = require('bcryptjs');
var taco = require('../models/user')

// Register
router.get('/register', function(req, res){

	res.render('register');
});

// Login
router.get('/login', function(req, res){
	req.breadcrumbs('Login');
	console.log(req.breadcrumbs());
	res.render('login');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = ({
			name: name,
			email:email,
			username: username,
			password: password
		});

		bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(newUser.password, salt, function(err, hash) {
						newUser.password = hash;
						db.User.create(newUser).then(function(){
							console.log('Finally!');
							req.flash('success_msg', 'You are registered and can now login');

							res.redirect('/users/login');
						})
				});
		});
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
		db.User.findOne( { where: {
        username: username
      }}).then(function(user){

   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

		bcrypt.compare(password, user.password, function(err, isMatch) {
	    	if(err) throw err;
				if(isMatch){
					console.log('Hey its a match');
					return done(null, user);
				} else {
					return done(null, false, {message: 'Invalid password'});
				}
		});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db.User.findById(id).then(function(user){
		done(null, user.get());
	})

});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}));


router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
