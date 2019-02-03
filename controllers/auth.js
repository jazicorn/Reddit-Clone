const User = require("../models/user");


module.exports = app => {
  
  // SIGN UP POST
  app.post("/sign-up", (req, res) => {
    // Create User
    const user = new User(req.body);

    user
      .save()
      .then(user => {
        var token = jwt.sign({ _id: user._id}, process.env.SECRET, { expiresIn: "60 days"});
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true})
        res.redirect("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // LOOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken';
    res.redirect('/'))
  })
};