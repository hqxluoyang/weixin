var url = require("url");

var share = require('../module/shareMongo');
var querystring = require("querystring");
var weixinPay = require("../module/weixinPay");

var openID = require("../module/getopenID");
var config = require("../module/config");
var userOperation = require('../module/userMongo');     //保存的注册信息
var openIDMsg = require("../module/openIDmsg");

var openIDmsgC = require("../module/openIDmsgC");
var tools = require("../module/tools");

var control = {}

//console.log("weixinPay:" , weixinPay)
control.mongoSave = function(obj){
	
	if(obj.code){
		if(typeof obj.cookie['openID'] == "string" && obj.cookie['openID'] != "undefined" ){

		//	console.log("xxxxxxxxxxxxxxxxxxxxxxxxxddddddxx根据cookie 读取openid:" , obj.cookie.openID == "undefined" , typeof obj.cookie.openID)
			control.hasOpenid(obj.cookie.openID , obj.res);
		}else{

			openID(obj.code , control.findOpenid , obj);

		}
	}else{
		//obj.res.render('register', {share:true});

		control.send(obj.res , {share:true , register:false});     //告诉页面这是一个分享界面；

		control.save({} , obj);
	}
}

control.alreadyLink = function(data , saveData){
	share.findByName(data, function(err , obj){
            if(!err){
				if(obj){  //已经被点击过
					console.log("openid:" +obj.openID + "已经被点击过")
				}else{
					share.save(saveData, function(err){
						if(err) {
							console.log("err share")
						} else {
						   console.log("succc share")
						}
					});
					
					
				}
			}
	});
	
	//openIDmsgC.save(data.openid);   //获得用户信息保存
}

control.save = function(obj , shareData){
	console.log("obj.openid == shareData.openid:" , obj.openid , shareData.openid)
	if(obj.openid == shareData.openid) return;
	
	if(shareData.openid){
		var data = {
			openid:shareData.openid,
			uuid:shareData.uuid,
			path:shareData.pathname,
			from:shareData.from,
			award:"no",
			session:shareData.sessionID,
			time:1
		}
		//weixinPay(shareData.openid);
		control.alreadyLink({openid:shareData.openid , session:shareData.sessionID} , data)
		
	}
};

/***********判断用户注册过没****************/

control.insertMongo = function(openID , res){
	console.log("判断用户注册过没：" , openID)
	openIDMsg.findByName({openid:openID}, function(err , obj){
				if(obj){
					if(obj.register == "yes"){  //已经注册过
					//res.render('register', {share:true});
						control.send(res , {share:true , register:true})
						console.log("openid:" +obj.openID + "已经被注册过")
					}else{

						control.send(res , {share:false , register:true});
					//res.render('register', {});
					}
				}else{
					control.send(res , {share:false , register:true});
					openIDmsgC.save(openID);

				}
				
	});
}

/********************************/

control.hasOpenid = function(openid , res){
	control.insertMongo(openid , res)
}

control.findOpenid = function(obj , shareData){
	var obj = JSON.parse(obj);
	config.sessionID[shareData.sessionID] = obj.openid;
	shareData.res.cookie("openID" , obj.openid);
	
	control.insertMongo(obj.openid , shareData.res)
	//shareData.res.render('register', {});
	//control.save(obj , shareData);
}

control.send = function(res , data){
	console.log("分享页面数字:" , data)
	var json = JSON.stringify(data);
	res.write(json)
	res.end();
}

control.getopenID = function(){
	
}

exports.registerPage = function(req, res){
	
	var urlParam = url.parse(req.url);

	var session = req.sessionID;
	var json = querystring.parse(urlParam.query);
	json.pathname = urlParam.pathname;
	json.sessionID = session;
	json.res = res;

	var cookieOpenid = tools.parseCookie(req.headers.cookie);
	
	json.cookie = cookieOpenid;
	//control.send(res , {share:true , register:true})
	console.log("gggggggggggggggggggggggggggggggggggg:" , req.sessionID , cookieOpenid)
	control.mongoSave(json);
}