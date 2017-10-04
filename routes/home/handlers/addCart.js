var Product = require('../../../models/product');
var Cart = require('../../../models/cart');

module.exports = function(req, res, next) {
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
}
