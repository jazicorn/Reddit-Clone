const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


// view engine setup
const hbs = require('express-handlebars');
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layout/'
}));
app.set('view engine', 'hbs');


// Routes
app.use('/', require('./routes/index.js'));

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));
