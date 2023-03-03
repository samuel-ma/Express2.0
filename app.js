var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var post = require("./routes/post");

var bodyParser = require("body-parser");
var cookie = require("cookie-parser");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use the router module 
app.use("/blog", post);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Get method route
app.get("/", function(req,res){
  res.send("Get request to the homepage");
})

// Post method route
app.post("./routes/users.js", function(req,res){
  res.send("Post request to the users page");
})

// middleware for all http request methods
app.all("/", function(res,req,next){
  console.log("Accessing the secret section");
  next(); // pass control to the next handler
}).use(function(req,res,next){
  res.status(404).send("Page not found!");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// route paths based on strings
app.get("/about", function(req,res){
  res.send("Get the about section");
})

app.get("/contact", function(req,res){
  res.send("Get the contact form");
})

// route paths based on string patterns
app.get("/ab?cd", function(req,res){
  //this route will match acd and abcd
  res.send("ab?cd");
})

// this route will match abcd, abbcd, and so on...
app.get("/ab+cd", function(req,res){
  res.send("ab+cd");
})

// this route will match abcd, abxcd, abRANDOMcd, ab123 and so on...
app.get("/ab*cd", function(req,res){
  res.send("ab*cd");
})

// this route will match /abe and /abcde
app.get("/ab(cd)?e", function(req,res){
  res.send("ab(cd)?e");
})

// examples of route paths based on regular expressions
app.get(/a/, function(req,res){
  res.send("/a/");
})

// this route will match butterfly and dragonfly but not butterflyman, dragonflyman and so on...
app.get(/.*fly$/, function(req,res){
  res.send("/.*fly$/");
})

// working with middleware
app.get("/api/v1/stories/:id", function(res,req,next){
  // carryout authorization
  return next();
}), function(req,res,next){
  // extract user id and fetch the database
  req.story = story;
  return next();
}, function(req,res){
  // output the result of the database search
  res.send(res.story);
}

// simple request time logger
const myLogger = function(req,res,next){
  console.log("A new request received at " + Date.now());
  next();
}
app.use(myLogger);

app.get("./routes/users.js", function(req,res){
  res.send("Hello World!");
})

// we can alaso pass callbacks as items of an array thanks to arguments
const authAdmin = function(req,res,next){
  // ...
  return next();
}

const getUsers = function(req,res,next){
  // ...
  return next();
}

const renderUsers = function(req,res,next){
  // ...
  return next();
}

const admin = [authAdmin, getUsers, renderUsers];
app.get("/admin", admin);

// chained route handlers that are defined by using app.route()
app.route("/book")
  .get(function(req, res){
    res.send("Get a random book");
  })
  .post(function(req,res){
    res.send("Add a book");
  })
  .put(function(req,res){
    res.send("Update a book");
  })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Error handling middleware
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).send("Something broke!");
})

app.get("/", function(req,res,next){
  next(new Error("I am passing you an error!"));
})

// parse json data
app.use(bodyParser.json());

// parse cookies
app.use(cookie());

module.exports = app;
