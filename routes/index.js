var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  // this should be in a different controller --> Modular
  Product.find(function(err, docs) {
    var productsChunks = [];
    var chunkSize = 3;
    for(var i= 0; i < docs.length; i+= chunkSize){
      productsChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping cart', products: productsChunks});
  })

});

router.get('/add-to-cart/:id',function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/')
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/');
  })
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null})
  }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
})

router.get('/checkout', function(req, res, next){
  if(!req.session.cart) {
    return res.redirect('shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {total: cart.totalPrice})
})

router.post('/checkout', function(req, res, next){
  if(!req.session.cart) {
    return res.redirect('shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")(
    "sk_test_UDxtp1MqNAksw2HMqKndte8e"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 1000,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test charge"
  }, function(err, charge) {
    if(err){
      req.flash('error', err.message);
      return res.redirect('/checkout')
    }
    req.flash('success', 'Successfully bought product!');
    req.cart = null;
    res.redirect('/');
  });
})

module.exports = router;
