'use strict';

var fortune = require('./lib/fortune.js');
var routes = require('./routes/routesControl');
var config = require('./module/config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require("./module/config");

var session = require('express-session');

var getToken = require("./module/getTokenSave").start();

var sessionMongoose = require("session-mongoose")(require('connect'));
/*
var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = MongoSessionStore({url:credentials.mongo.connectionString});
*/

var store = new sessionMongoose({ url: config.db.hostSession, interval: 120000 });



var app = express();
//var getk = require("./module/access_token")();

// 设置js视图引擎
var engineOptions = {
    harmony: true
};



app.use(bodyParser());

app.use(session({
  secret: '1234567', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60*6000000 },
  store:store
}));
// app.use(bodyParser.urlencoded({ extended: true }));
console.log('__dirname = ' + __dirname);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine(engineOptions));



// 设置端口
app.set('port', process.env.PORT || config.port);

// add static resouce


// 测试开关
app.use(function(req, res, next){
    console.log('path test=1rrrrrrr:' , req.sessionID);
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.use(function(req, res, next){
    config['session'] = req.sessionID;
    next();
});



// add route
routes(app);


module.exports = app;


