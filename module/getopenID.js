var config = require("./config")
var http=require("https");
var getAppsInfo = require('./../apps-info')(); // 从外部加载app的配置信息

var qs = require('querystring');

var sendStr = {
	appid:getAppsInfo[0].appid,
	secret:getAppsInfo[0].secret,
	code:"",
	grant_type:"authorization_code"
}

module.exports=function(code, back , shData){
	
	sendStr.code = code;
	var str =config.getIDUrl +  qs.stringify(sendStr);
	//console.log("yyyyyyyyyyyyyyyy:" , shData)
	http.get(str, function(res) {
		res.setEncoding('utf8'); 
		res.on('data', function (chunk) {  
			//console.log("findOpendID tttttttttt:" , shData)
				back(chunk , shData);
	    });
	
　　}).on('error', function(e) {
		console.log("getKey:err:" , e)
	});
		
}		