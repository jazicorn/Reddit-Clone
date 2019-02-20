const User = require("../models/user");


module.exports = app => {

  // LOGIN FORM
  app.get('/login', (req, res) => {
    // res.render('login');
    User.findOne({email: req.body.email})
      .exec()
      .then(function(user) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(err) {
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }
        if (result) {
          return res.status(401).json({
            success: 'Authorized Access'
          });
        }
        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
        })
      })
      .catch(error => {
        res.status(500).json({
          error: error
        })
      })
  });
  
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
    res.clearCookie('nToken',
    res.redirect('/'))
  })

};