/*******返回关注并且成功注册的用户***********/

var openIDMsg = require("../module/openIDmsg");     // 关注用户管理
var querystring = require("querystring");
var tools = require("../module/tools");
var url = require("url");
var mrgList = {};

mrgList.getList = function(res , openid){
	console.log("开始查询 openid：" , openid)
	openIDMsg.findByName({openid:openid} , function(err , doc){
		if(doc){

			console.log("修改xxxxxxxxxxxxx：" , doc)
			doc.verify = "yes";
			doc.save();
			mrgList.send(res , {verify:"yes" , openid:doc.openid});
		}else{
			mrgList.send(res , {verify:"no" , openid:openid});
		}
	})
}

mrgList.send = function(res , data){
	console.log("修改verify之后：" , data)
	var json = JSON.stringify(data);
	res.write(json)
	res.end();
}


module.exports = function(req, res){
	var urlParam = url.parse(req.url);

	var json = querystring.parse(urlParam.query);
	//var data = JSON.parse(json);
	console.log("修改verify之后所传参数：" , json.openid , json);
	mrgList.getList(res , json.openid);
}