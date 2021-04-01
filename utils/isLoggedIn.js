const isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated())
  {
    return next()
  }
  else
  {
    req.flash("error", "You must log in to perform that!")
    res.redirect("/login")
  }
}

module.exports = isLoggedIn