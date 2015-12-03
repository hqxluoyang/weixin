'use strick'
var routesControl = function(app){
	
	if(!app){
		console.log('app is undefined');
		return;
	}

	// Express, app.use是Express中间件的一种方法, 路由(get)和中间件(use)的顺序至关重要
	
	console.log("start router")
	
	var routes = {};
	routes.index = require('./');
	routes.home =require('./home');
	routes.test = require('./test');
	routes.material = require('./material-design');
	routes.registerPage = require('./registerPage');
	routes.attentionPage = require('./attentionPage');
	routes.managerDefault = require('./managerDefault');
	routes.userList = require('./userList');
	routes.getUserList = require('./getUserList');  //获得所有注册用户的信息；
	routes.verify = require('./verify');  //验证用户；
	routes.friendList = require('./friendList');

	var mods = {};
	mods.regs = require('../module/registerServer');
	mods.mfwx = require('../module/msgFromWeixin');
	mods.getToken = require('../module/getToken');
	mods.sendMoney = require('../module/sendMoney');
	mods.login = require('../module/login');

	app.get('/', routes.index.indexPage);
	app.get('/home', routes.home.homePage);
	app.get('/test', routes.test.test);
	app.get('/material', routes.material.MaterialDesign);
	app.get('/register', routes.registerPage.registerPage);
	app.get('/attention', routes.attentionPage.attentionPage);
	app.get('/manager', routes.managerDefault.ManagerDefault);
	app.get('/manager/user-list', routes.userList.userList);

	app.get('/getUserList', routes.getUserList);   //获得所有用户列表
	app.get('/verify', routes.verify);   //验证用户
	
	
	app.get('/friend-list', routes.friendList.friendList);

	app.post('/register', mods.regs.registerServer);
	app.get('/msgFromWeixin', mods.mfwx.msgFromWeixin);
	app.post('/msgFromWeixin', mods.mfwx.postMsgFromWeixin);
	app.post('/rsx/:index', mods.getToken);
	app.post('/sendMoney',mods.sendMoney);

	
	app.get('/login',mods.login);


	//app.post('/register', );
	
	app.use(function(err, req, res, next){
	    console.error(err.stack);
	    res.status(500);
	    res.render('500');
	});

	app.use(function(req, res, next){
	    console.error('this is 404');
	    res.status(404);
	    res.render('404');
	});

	app.use(function(req, res){
	    console.error('this is 303');
	    res.status(303).render('303');
	});
};

module.exports = routesControl;