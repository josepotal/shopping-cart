var Cart = require('../../../models/cart');

module.exports = function(req, res){
  if(!req.session.cart) {
    return res.redirect('shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0]
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg})
}
