var Order = require('../../../models/order');
var Cart = require('../../../models/cart');

module.exports = function(req, res){
  Order.find({user: req.user}, function(err, orders){
    if (err) {
      return res.write('Error!!')
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('user/profile', {orders: orders})
  })
};
