var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopping')

var products = [
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'Gothic Video game',
    description: 'Awesome Game!!!',
    price: 10
  }),
  new Product({
    imagePath: 'http://ichef.bbci.co.uk/news/976/cpsprodpb/2644/production/_95569790_index-hero-og.0757cc783ca4-1.jpg',
    title: 'Miecraft Video game',
    description: 'Almost Awesome Game!!!',
    price: 12
  }),
  new Product({
    imagePath: 'https://target.scene7.com/is/image/Target/13697575_Alt04?wid=520&hei=520&fmt=pjpeg',
    title: 'Monopoly Video game',
    description: 'Awesome Game!!!',
    price: 14
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/8/89/Amiga_Lemmings.png',
    title: 'Lemmings Video game',
    description: 'Awesome Game!!!',
    price: 16
  }),
  new Product({
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKs8CKafexHg-LvZ-QMcZSO2wo3o_ese4veG5KBc9Nwoe-UJHBCw',
    title: 'Scrabble Video game',
    description: 'Awesome Game!!!',
    price: 18
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'Gothic 2 Video game',
    description: 'Awesome Game!!!',
    price: 20
  })
]

var done = 0;
for (var i =0; i < products.length; i++) {
  products[i].save(function(err, result){
    done++;
    if(done === products.length){
      exit()
    }
  })
}
function exit() {
  mongoose.disconnect();
}
