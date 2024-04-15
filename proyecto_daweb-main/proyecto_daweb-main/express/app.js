var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var restaurantesRouter = require('./routes/restaurantes');
var loginRouter = require('./routes/login');
var seguridadRouter = require('./routes/seguridad');
var platoRouter = require('./routes/plato');
var sitiosTuristicosRouter = require('./routes/sitiosTuristicos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/restaurantes', restaurantesRouter);
app.use('/login', loginRouter);
app.use('/seguridad', seguridadRouter);
app.use('/plato', platoRouter);
app.use('/sitiosTuristicos', sitiosTuristicosRouter);

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

app.listen(3030, function() {
  console.log('Servidor Node.js escuchando en el puerto ' + 3030);
});

module.exports = app;
