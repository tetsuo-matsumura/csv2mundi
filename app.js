// set up ===================
var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var setup = require('./setup.js');
var methodOverride = require('method-override');

// connect to mongo using mongoose
mongoose.Promise = global.Promise;
mongoose.connect(setup.mongourl); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to MongoDB: '));

// configurations ===================
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override')); 

//controllers
FileUploadController = require('./app/controllers/uploadController.js');

//app routes
require('./app/routes.js')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(port);
console.log("App listening on port " + port);


module.exports = app;
