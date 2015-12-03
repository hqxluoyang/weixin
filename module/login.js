/***********微信发钱******************/

var user = require("./userMongo");
var url = require("url");
var querystring = require("querystring");

var mrg = {};


mrg.send = function(obj , res){
	var json = JSON.stringify(obj);
	res.write(json)
	res.end();
}


mrg.login = function(json , res){
	if(json.user != "admin"){
		mrg.send({status:"no"} , res)
	}else{
		user.find({user:"admin"} , function(err , doc){
			console.log("读取用户登陆参数：" , doc)
			if(doc.password == json.password){
				mrg.send({status:"yes"} , res);
			}else{
				mrg.send({status:"no"} , res);
			}
		})
	}
}

mrg.login_t = function(json , res){
	if(json.user === "admin" && json.password==="0ff37d7e865898b2b8c09e24d39259cd"){
		mrg.send({status:"yes"} , res);
	}else{
		mrg.send({status:"no"} , res);
	}
}







module.exports = function(req , res){
	var urlParam = url.parse(req.url);

	var json = querystring.parse(urlParam.query);

//	res.write("hhhhhhhhhhhhhhhh");
//	res.end();
	mrg.login_t(json , res);
}



