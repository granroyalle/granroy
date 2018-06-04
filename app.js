var config = require('./config');
var express = require('express');
var load = require('express-load');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require("fs");
var multer = require('multer'); //
var upload = multer({ dest: 'uploads/'});
var session = require('cookie-session'); //
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// Connect to D
mongoose.connect('mongodb://granroyalle:KuwreCr4FA@ds015730.mlab.com:15730/granroyalle', function(err){
  if(err) {
    console.log('Erro ao conectar no mongodb: '+err);
  }
});

// conn = mongoose.createConnection('mongodb://granroyalle:KuwreCr4FA@ds015730.mlab.com:15730/granroyalle');

passport.use(new Strategy(
  function(username, password, cb) {

   var Usuarios = app.models.usuario;

    Usuarios.findOne({email: username}, function(err, user){
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (!isValidPassword(user, password)) { return cb(null, false); }

        //mongoose.connect(decrypt(user.database));

        //console.log("Meu BD: "+ conn2.host)

        return cb(null, user);
    });
}));

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  var Usuarios = app.models.usuario;

  Usuarios.findById(id, function(err, user){
    if (err) { return cb(err); }
    cb(null, user);
    return console.log(user);
  });
});

var app = express();


// Use the session middleware
app.use(session({ secret: '#$%¨&*()ko', cookie: { maxAge: 60000 }}))  // secret: keyboard cat



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


//upload
app.enable('trust proxy');
app.use(multer({ inMemory: true }));



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/login');
  });

app.get('/file/:id', function(req, res) {
  var request = require('request');
  //Google Cloud
  request('https://storage.googleapis.com/granroyalle/'+req.params.id+'')
    .pipe(res)
});

app.listen(4000, function(){
  console.log('Rodando...');
})
