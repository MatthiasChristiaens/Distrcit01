var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/home',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/registration', function(req, res){
		res.render('home',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/registration', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/home',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', function(req, res){
		res.render('home', { user: req.user });
	});

	/* GET Home Page */
	router.post('/home', function(req, res){
		res.render('home', { user: req.user });
		console.log(req.user);
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/home');
	});

	router.get('/login', function(req, res) {
  		res.render('login');
	});

	router.get('/account', function(req, res) {
  		res.render('account', { user: req.user });
	});

	router.get('/contact', function(req, res) {
  		res.render('contact', { user: req.user });
	});

	router.get('/productbeheer', function(req, res) {
  		res.render('productbeheer', { user: req.user });
	});

	router.get('/cart', function(req, res) {
  		res.render('cart', { user: req.user });
	});

	router.get('/bestellingen', function(req, res) {
  		res.render('bestellingen', { user: req.user });
	});

	return router;
}