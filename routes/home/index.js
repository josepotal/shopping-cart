var express = require('express');
var router = express.Router();

//routes
var getHome = require('./handlers/getHome');
var addCart = require('./handlers/addCart');
var reduceOne = require('./handlers/reduceOne');
var removeAll = require('./handlers/removeAll');
var shoppingCart = require('./handlers/shoppingCart');
var getCheckout = require('./handlers/getCheckout');
var postCheckout = require('./handlers/postCheckout');

//middlewares
var isLoggedIn = require('../../middlewares/isLoggedInCheckout');

/* GET home page. */
router.get('/', getHome);
router.get('/add-to-cart/:id', addCart);
router.get('/reduce/:id', reduceOne)
router.get('/remove/:id', removeAll)
router.get('/shopping-cart', shoppingCart)
router.get('/checkout', isLoggedIn, getCheckout)
router.post('/checkout', postCheckout)

module.exports = router;
