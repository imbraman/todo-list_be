var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var cors = require('cors');

var passport = require('passport');

// [SH] Bring in the data model
require('./api/db');
// [SH] Bring in the Passport config after model is defined
require('./api/authentication/config/passport');

var authRoutesApi = require('./api/authentication/routes/index');

var listRoutesApi = require('./api/list/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
];
var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
}
//enable cors
app.use(cors(corsOptions));


app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/api', listRoutesApi);
app.use('/api/auth', authRoutesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
