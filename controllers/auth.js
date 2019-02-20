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
    // Create User and JWT
    const user = new User(req.body);

    user
      .save()
      .then((user) => {
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

  // LOGIN

  app.post("/login", (req, res) => {
    const username =  req.body.username;
    const password = req.body.password;

    // LOGIN
    app.post("/login", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      // Find this user name
      User.findOne({ username }, "username password")
        .then(user => {
          if (!user) {
            // User not found
            return res.status(401).send({ message: "Wrong Username or Password" });
          }
          // Check the password
          user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
              // Password does not match
              return res.status(401).send({ message: "Wrong Username or password" });
            }
            // Create a token
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
              expiresIn: "60 days"
            });
            // Set a cookie and redirect to root
            res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
            res.redirect("/");
          });
        })
        .catch(err => {
          console.log(err);
        });
});

};