var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log(req.user);

	res.redirect('/home');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/home', ensureAuthenticated, function(req, res){

res.render('index',{userId: req.user.id, userName: req.user.name, imageSource: req.user.imageSource});
})


module.exports = router;
