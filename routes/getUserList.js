/*******返回关注并且成功注册的用户***********/

var openIDMsg = require("../module/openIDmsg");     // 关注用户管理
var querystring = require("querystring");
var tools = require("../module/tools");
var mrgList = {};

mrgList.getList = function(res){
	openIDMsg.find({register:"yes"} , function(err , doc){
		if(doc){
			mrgList.send(res , doc);
		}else{
			mrgList.send(res , "");
		}
	})
}

mrgList.send = function(res , data){
	
	var json = JSON.stringify(data);
	res.write(json)
	res.end();
}


module.exports= function(req, res){
	
	mrgList.getList(res);
}