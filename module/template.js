
var config = require('./config');

function template(json){
	this.json = json
}

template.prototype.sendTem = function(json){
	
		var path = "cgi-bin/message/template/send?access_token=" + config.access_token;
		var options = {
			host: 'api.weixin.qq.com',
			port: 443,
			path:path,
			method: 'POST',
			headers:{
				'accept': '*/*',
				'content-type': 'application/json',
				'accept-encoding': 'gzip, deflate',
				'accept-language': 'en-US,en;q=0.9',
				'user-agent': 'nodejs client'
			},
			key: fs.readFileSync('../cert/apiclient_key.pem'),
			cert: fs.readFileSync('../cert/apiclient_cert.pem')
		};


	 
		var req = https.request(options, function (res) {
			console.log('STATUS: ' + res.statusCode);
		   // equal(200, res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
		 
			res.on('data',function (chunk) {
				 console.log('BODY: ' + chunk);
			});
		});

		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});

		//console.log("allXml:" , sendXml)
		req.write(this.json);
		req.end();
	}
	
module.exports = function(data){
	var template = new template(data);
	
	template.sendTem();
}	