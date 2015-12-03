var menu = require('./menu');
var https = require('https');
var config = require('./config');
var mem = require('./memcacheControl');

var getAccessToken = function(){
	var getAppsInfo = require('./../apps-info'); // 从外部加载app的配置信息
	var appIds = getAppsInfo();

	https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ appIds[0].appid +'&secret=' + appIds[0].secret, function(_res) {
		var str = '';
		_res.on('data', function(data){
			str += data;
			console.log('str = ' + str);
		});
		_res.on('end', function(){
			console.log('return access_token:  ' + str);
			try{
				var resp = JSON.parse(str);
				if(config.access_token){
					console.log('has config.access_token = ' + config.access_token);
					menu.createMenu(config.access_token);
				}else{
					menu.createMenu(resp.access_token);	
					console.log('no config.access_token = ' + resp.access_token);
				}


				//mem.setData('access_token', resp.access_token);
				//console.log('memcache > getData = ' + mem.getData('access_token'));
			}catch(e){
		        return errorRender(res, '解析access_token返回的JSON数据错误', str);
			}

		});
	});
}

getAccessToken();
