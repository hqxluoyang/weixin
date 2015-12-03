var http = require('http');
var equal = require('assert').equal;


var httpPG = function(options ,method , data , callback){
	this.options = options;
	this.callback = callback;
	this.method = method;
}

httpPG.prototype.post = function(){
	
	var options = {
    host: '',
    port: 80,
    path: '',
    method: 'POST',
    headers:{
        'accept': '*/*',
        'content-type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
        'user-agent': 'nodejs client'
    }
	};
	
	for(var i in this.options){
		options[i] = this.options[i];
	}
	
	var req = http.request(options, function (res) {
   
    equal(200, res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
 
    res.on('data',function (chunk) {
         this.callback(chunk);
    });
	});
	
	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	
	req.write(json);
	req.end();
}


httpPG.prototype.get = function(){
	http.get(this.options , function(res){
		
	})
}
 
module.exports = httpPG;
