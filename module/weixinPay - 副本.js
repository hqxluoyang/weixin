/*********微信支付*************/

var querystring = require("querystring");
var crypto = require('crypto'); 
var md5 = crypto.createHash('md5'); 
var signKey = "anWddf9uiShanChuan1985anqizhiliY";
var signValue=""

var allXml = "";
var sendXml = "";
var postXml = {
	nonce_str:"",      //生成
	//sign: "",
	mch_billno:"",   //生成
	mch_id:"1264424901",
	wxappid:"wxefde828d58d60ea7",
	nick_name:"yijianhuanji",
	send_name:"yijianhuanji",
	re_openid:"oQ00huMhWuKrwPECSyXATZg4U-ho",
	total_amount:100,
	min_value:100,
	max_value:200,
	total_num:1,
	wishing:"every day happy",
	client_ip:"192.168.1.117",
	act_name:"rrr",
	remark:"tttt"
	
}

var json2xml = function(json){
	var str = ""
	for(var i in json){
		var s = "<" + i + ">" + json[i] + "</" + i + ">";
		str +=s;
	}
	return str;
}

function sortDict(dict) {
    var dict2 = {}, 
        keys = Object.keys(dict).sort();

    for (var i = 0, n = keys.length, key; i < n; ++i) {
        key = keys[i];
        dict2[key] = dict[key];
    }

    return dict2;
}


var createValue = function(){
	
	var createNonceStr = function() {
		return Math.random().toString(36).substr(2, 15);
	};
	
	var createNumber = function(){
		var str = "";
		for(var i=0 ; i<9 ; i++){
			var j = Math.random()*10;
			var num = Math.ceil(j).toString();
			str +=num;
		}
		
		console.log("str:" , str)
		
		return str;
	}
	
	postXml['nonce_str'] = createNonceStr();
	
	postXml['mch_billno'] =postXml['mch_id'] + "yyyymmdd" + createNumber();
	
	allXml = json2xml(postXml);
	
	
	
}

var sign = function(){
	var newStr = sortDict(postXml) ;
	var keyValue = querystring.stringify(newStr)
	
	keyValue += "&key=" + signKey;
	console.log("keyValue:" , keyValue)
	md5.update(keyValue);  
    signValue = md5.digest('hex').toUpperCase();  
	//signValue=MD5(keyValue).toUpperCase()
	console.log("keyValue:" , signValue , "你好");
	
	sendXml = "<xml><sign>" +  signValue + "</sign>" + allXml + "</xml>"
}

createValue();

sign();

var http = require('https');
var equal = require('assert').equal;
var fs = require('fs');
 
var options = {
    host: 'api.mch.weixin.qq.com',
    port: 443,
    path: '/mmpaymkttransfers/sendredpack',
    method: 'POST',
    headers:{
        'accept': '*/*',
        'content-type': 'application/xml',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
        'user-agent': 'nodejs client'
    },
	key: fs.readFileSync('../cert/apiclient_key.pem'),
	cert: fs.readFileSync('../cert/apiclient_cert.pem')
};


 
var req = http.request(options, function (res) {
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

console.log("allXml:" , sendXml)
req.write(sendXml);
req.end();

