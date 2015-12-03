var http = require('http');
var https = require('https');
var config = require('./config');
var equal = require('assert').equal;

var menu = {
	options:{
		host: 'api.weixin.qq.com',
		port: 80,
		path: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=',
		method: 'POST',
		headers:{
			'accept': '*/*',
			'content-type': 'application/json',
			'accept-encoding': 'gzip, deflate',
			'accept-language': 'en-US,en;q=0.9',
			'user-agent': 'nodejs client'
		}
	},
	
	createMenu: function(access_token){
		var self = menu;

		self.options.path = self.options.path + access_token;
		console.log('menu > access_token = ' + access_token);
		var req = http.request(self.options, function(res){
			console.log("res.statusCode == :" , res.statusCode);

			res.on('data', function(fn){
				console.log(' >>> fn = ' + fn);
			});
		})
		//console.log("data:" , data)
		
		var json = JSON.stringify(config.menu);
		req.write(json);
		req.end();
	}
};



module.exports = menu;