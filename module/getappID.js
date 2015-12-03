var config = require("./config")
var http=require("http");
var getAppsInfo = require('./../apps-info'); // 从外部加载app的配置信息

var qs = require('querystring');

http.get('http://api.weixin.qq.com/sns/oauth2/access_token?appid=wxefde828d58d60ea7&secret=970071af7cda59dbef64e23274260415&code=011b14be52606e1f0c9768a5a430806a&grant_type=authorization_code', function(_res){
			var str = '', resp;
			_res.on('data', function(data){
				str += data;
				
				console.log("str:" , str)
			});
			_res.on('end', function(){
				
			});
		});
		
var config = require("./config")
var http=require("http");

var sendStr = {
	appid:getAppsInfo[0].appID,
	secret:getAppsInfo[0].secret,
	code:"",
	grant_type:"authorization_code"
}

module.exports=function(back , code){
	
	var sendStr['code'] = code;
		
	
	http.get(config.keyUrl+type, function(res) {
	res.setEncoding('utf8'); 
	res.on('data', function (chunk) {  
			back(chunk);
    });
	
　　}).on('error', function(e) {
		console.log("getKey:err:" , e)
});
}		