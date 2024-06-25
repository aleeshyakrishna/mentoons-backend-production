var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')
var adminsRouter = require('./routes/admins');
var usersRouter = require('./routes/users');
require('./config/dbConfig')
var morgan = require('morgan')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));




// CORS configuratio

app.use(cors({
  origin: [
      'http://localhost:3000',
      'https://mentoon-current-file.vercel.app'

  ], // Update with your client's origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, etc.)
}));


// app.use(cors())
// app.use(upload.single('image'));

app.use('/admin', adminsRouter);
app.use('/', usersRouter);

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
