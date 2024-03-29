var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var http = require('http');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var message = require('./routes/message');
var photo = require('./routes/photo');
var s3 = require('./routes/s3');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var router = express.Router();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev')); // log every request to the console

const authentication = require('./routes/authentication')(router); // Import Authentication Routes
app.use('/authentication', authentication); // Use Authentication routes in application
app.use('/', router);

// app.use('/messages', express.static(path.join(__dirname, 'dist')));
 app.use('/message', message);

// app.use('/photos', express.static(path.join(__dirname, 'dist')));
 app.use('/photo', photo);

 app.use('/happyhut', express.static(path.join(__dirname, 'dist')));

 // persistent login sessions
app.use(router);

app.use('/api/s3', s3);
app.use(express.static(__dirname + '/'));
app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  console.log("page rendered",__dirname);
  res.sendFile(__dirname + '/index.html');
});
// app.use('/users', express.static(path.join(__dirname, 'dist')));
// app.use('/user', user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

module.exports = app;


mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

//MONGO_URL="mongodb://localhost/happyhut" node app.js


var debug = require('debug')('mean-app:server');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '4444');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
