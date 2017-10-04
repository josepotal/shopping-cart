var Cart = require('../../../models/cart');

module.exports = function(req, res){
  if(!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null})
  }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
}
