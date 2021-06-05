var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var favicon = require('serve-favicon');


// Gestion de validacion
// var basicAuth = require('./helpers/basic-auth');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/articulos.js');


var app = express();

var mongoDB = 'mongodb+srv://dardo:Ds1528051@cluster0.aycnp.gcp.mongodb.net/tienda?retryWrites=true&w=majority';

mongoose.connect(mongoDB,{
  useUnifiedTopology:true,
  useCreateIndex: true,
  useNewUrlParser:true
});
mongoose.Promise=global.Promise;
var db =mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB error de conexion'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
// app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use('/public',express.static('public'));
app.use('/fa', express.static(__dirname + '/node_modules/font-awesome/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts')
);
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(session({
  secret: 'sesion',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//habilitar CORS
app.use(function(inRequest, inResponse, inNext){
  inResponse.header('Access-Control-Allow-Origin', '*');
  inResponse.header('Access-Control-Allow-Methods', "GET,POST,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Accept");
  inNext();
});

// pre-fligth response
app.options('*', function (req,res) { res.sendStatus(200); });


// use basic HTTP auth to secure the api
// app.use(basicAuth);


// api routes
// app.use('/users', require('./users/users.controller'));

//rutas de MongoDB
app.use('/', usersRouter);

// app.use(function(req, res, next) {
//   res.status(404).createError('404');
// });

// error handler
app.use(function(err, req, res, next) {
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log("Pasando por errores");
  console.log(err);
  console.log(createError(404));
  res.status(err.status || 500);
  res.render('../views/error',{error :err});
});

module.exports = app;
