var passport = require('passport');

module.exports = passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
})
