var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var fs = require('fs');
// ssl : https://tistory.lyasee.com/17

//router 설정
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//기본 path를 /public으로 설정(css, javascript등의 파일 사용을 위해)
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'html')));

app.use('/', indexRouter);

app.get('/privacy_policy.html',(req,res) => {
  res.send(path.join(__dirname, 'html', 'Privacy_Policy.html'  )); // ./html/privacy_policy.html 전송
});

app.get('/terms_of_service.html',(req,res) => {
  res.send(path.join(__dirname, 'html', 'Terms_of_Service.html'  )); // ./html/terms_of_service.html 전송
});

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

////////////////////////////////////////////////////////////////////////////////
// const options = {  
//   key: fs.readFileSync('경로~/key.pem'),
//   cert: fs.readFileSync('경로~/cert.pem')
// };


// const port1 = 80; // http 포트
// const port2 = 443; // https 포트


// http.createServer(app).listen(port1, function(){  
//   console.log("Http server listening on port " + port1);
// });


// https.createServer(options, app).listen(port2, function(){  
//   console.log("Https server listening on port " + port2);
// });
////////////////////////////////////////////////////////////////////////////////

module.exports = app;
