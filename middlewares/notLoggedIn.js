module.exports = function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}
