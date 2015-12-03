var config = require('./config');
var pmc = require('./processMsgCenter');
var xml2map = require('xml2map');

exports.msgFromWeixin = function(req, res){
	console.log('message from wechat ip => ' + req.ip, " req.url = " + req.url);
	
	var signature, timestamp, nonce, echostr;
	signature = req.query.signature;
	timestamp = req.query.timestamp;
	nonce = req.query.nonce;
	echostr = req.query.echostr;

	console.log('signature = ' + signature, 'echostr = ' + echostr, 'nonce = ' + nonce, 'echostr = ' + echostr);

	res.send(req.query.echostr);
};

exports.postMsgFromWeixin = function(req, res){
	//console.log('post message from wechat ip => ' + req.ip, " req.body = " + req.body);
	//console.log("session iD form weinx:" , req.sessionID)
	req.setEncoding('utf8');    
    req.on('data', function (chunk) {  
    	var xmlData = xml2map.tojson(chunk);
        console.log("xmlData: " , xmlData);
		
        pmc(xmlData.xml, req, res);
       // res.write(chunk)
       // res.end();
    });
	
};