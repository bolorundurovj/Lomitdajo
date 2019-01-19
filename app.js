const express = require ('express');
const path = require('path');
const bodyParser = require ('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect To Databse
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' +config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error' +err);
});

//Initializing Express
const app = express();

const users = require('./routes/users');

// Port Router
const port = 2019;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/',(req, res) =>{
    res.send('Invalid Endpoint');
});

//Start Server
app.listen(port, () => {
    console.log('Server started on port ' +port);
});
