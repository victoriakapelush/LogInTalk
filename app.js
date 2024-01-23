var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require("express-session");
const passport = require("passport");

var cookieParser = require('cookie-parser');
var logger = require('morgan');

const initializePassport = require("./passport-config");

const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var signupRouter = require('./routes/signup');
var messageRouter = require('./routes/messageWindow');

require('dotenv').config();
const app = express();

const mongoDb = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

initializePassport(passport);

app.use(session({ secret: process.env.SESSION_SECRET || "cats", resave: false, saveUninitialized: true }));app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/messageWindow', messageRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
