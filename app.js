const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to DB
mongoose.connect(config.database);
//on connect
mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.database}`);
});
// on error
mongoose.connection.on('error', (err) => {
  console.log(`Database error ${err}`);
});

// dev port
// const port = 5000;
// deploy Heroku
const port = process.env.PORT || 8080;

const users = require('./routes/users');

//middleware
// cors middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
//bodyParser middleware
app.use(bodyParser.json());

app.use('/users', users);

//pasports middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', (req, res) => {
  console.log('helo');
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// listen server
app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
