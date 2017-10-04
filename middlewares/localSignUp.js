var passport = require('passport');

module.exports = passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
})
