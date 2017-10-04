var express = require('express');
var router = express.Router();

var passport = require('passport');

var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

//routes
var getProfile = require('./handlers/getProfile');
var getLogout = require('./handlers/getLogout');
var getSignUp = require('./handlers/getSignUp');
var postSignUp = require('./handlers/postSignUp');
var getSignIn = require('./handlers/getSignIn');
var postSignIn = require('./handlers/postSignIn');

//middlewares
var isLoggedIn = require('../../middlewares/isLoggedIn');
var notLoggedIn = require('../../middlewares/notLoggedIn');
var localSignIn = require('../../middlewares/localSignIn');
var localSignUp = require('../../middlewares/localSignUp');


// apply isLoggedIn middleware to each route
router.get('/profile', isLoggedIn, getProfile);
router.get('/logout', isLoggedIn, getLogout);

// apply middleware notLoggedIn to all the below routes
router.use('/', notLoggedIn, function(req, res, next){
  next();
})
router.get('/signup', getSignUp);
router.post('/signup', localSignUp, postSignUp);
router.get('/signin', getSignIn);
router.post('/signin', localSignIn, postSignIn);

module.exports = router;
