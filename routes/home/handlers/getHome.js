var Product = require('../../../models/product');

module.exports = function(req, res) {
  // this should be in a different controller --> Modular
  var successMsg = req.flash('success')[0]
  Product.find(function(err, docs) {
    var productsChunks = [];
    var chunkSize = 3;
    for(var i= 0; i < docs.length; i+= chunkSize){
      productsChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping cart', products: productsChunks, successMsg:successMsg, noMessages: !successMsg});
  })

}
