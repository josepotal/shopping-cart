var Cart = require('../../../models/cart');

module.exports = function(req, res, next){
  if(!req.session.cart) {
    return res.redirect('shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")(
    "sk_test_UDxtp1MqNAksw2HMqKndte8e"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test charge"
  }, function(err, charge) {
    if(err){
      req.flash('error', err.message);
      return res.redirect('/checkout')
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err, result){
      req.flash('success', 'Successfully bought product!');
      req.session.cart = null;
      res.redirect('/');
    })
  });
}
