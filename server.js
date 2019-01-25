const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')

const app = express()

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Add after body parser initialization!
app.use(expressValidator())

// // DB Config
// const db = require('./config/keys').mongoURI;
//
// // Connect to MongoDB
// mongoose
//     .connect(db, {useNewUrlParser: true})
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err))

// Set db
require('./data/reddit-db');

// view engine setup
const hbs = require('express-handlebars');
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layout/'
}));
app.set('view engine', 'hbs');


// Routes
// app.use('/', require('./routes/index.js'));
require('./controllers/posts.js')(app);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));