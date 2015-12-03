var getkey = require("./getkey");
var config = require("./config");

module.exports.start = function(){
	var date = new Date().getTime();
	var time = 7000 * 1000;
	var getAppsInfo = require('./../apps-info'); // 从外部加载app的配置信息
	var appIds = getAppsInfo();
	var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ appIds[0].appid +'&secret=' + appIds[0].secret ;
	
	var startTime = function(){
		
		getkey(function(str){
			var resp = JSON.parse(str);
			config.access_token = resp.access_token;
			console.log("start get token:" , config.access_token)
		} , "" , "https" , tokenUrl)
		
		setTimeout(function(){
			startTime();
		} , time)
	}
	
	startTime();
	
	console.log("new date:" , date)
}