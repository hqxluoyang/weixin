/*********微信支付*************/

var querystring = require("querystring");
var crypto = require('crypto'); 
var md5 = crypto.createHash('md5'); 
var https = require('https');
var equal = require('assert').equal;
var fs = require('fs');

	//var weixinPay = {};
	
	function weixinPay(openID , money){
		this.postXml = {
			nonce_str:"",      //生成
		//sign: "",
			mch_billno:"",   //生成
			mch_id:"1264424901",
			wxappid:"wxefde828d58d60ea7",
			nick_name:"dddd好",
			send_name:"yi",
			re_openid:openID,
			total_amount:money,
			min_value:100,
			max_value:1000,
			total_num:1,
			wishing:"shanchuan",
			client_ip:"192.168.1.117",
			act_name:"rrr",
			remark:"tttt"
		}
		
		this.payKey = "anWddf9uiShanChuan1985anqizhiliY";
	}
	
	weixinPay.prototype.sendHttps = function(xml){
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
		req.write(xml);
		req.end();
	}

	weixinPay.prototype.sendXml = function(){
		var xml = this.createKey();

		console.log("微信要发送的xml:" , xml)
		this.sendHttps(xml)
	}
	
	weixinPay.prototype.createKey = function(){
		var createNonceStr = function() {
			return Math.random().toString(36).substr(2, 15);
		};
		
		var createNumber = function(){
			var str = "";
			for(var i=0 ; i<10 ; i++){
				var j = Math.random()*10;
				var num =parseInt(j).toString();
				//console.log("********************************************************************************:" , num , j)
				str +=num;
			}
			//console.log("********************************************************************************:" , str)

			return str;
		}
		
		var json2xml = function(json){
			var str = ""
			for(var i in json){
				var s = "<" + i + ">" + json[i] + "</" + i + ">";
				str +=s;
			}
			return str;
		}
		
		var sortDict = function(dict){
			console.log("编码:" , dict)
			var dict2 = {}, 
				keys = Object.keys(dict).sort()
            console.log("字符编码之后的key:" , keys)
			for (var i = 0, n = keys.length, key; i < n; ++i) {
				key = keys[i];
				dict2[key] = dict[key];
			}
			console.log("dict2编码之后的参数：" , dict2)
			return dict2;
		}

		var jsonToStr = function(json){

			var str = "";
			for(var i in json){
				str +=i + "=" + json[i] + "&"; 
			}
			str = str.substring(0 , str.length-1);
			return str;

		}
		
		var createSignKey = function(xml){
			console.log("this.postXML:" , arguments)
			var newStr = sortDict(this.postXml) ;
			//var keyValue = querystring.stringify(newStr);

			var keyValue = jsonToStr(newStr);

			console.log("生成序列对:" ,keyValue)
			var md5 = crypto.createHash('md5');
			keyValue += "&key=" + this.payKey;
			md5.update(keyValue);  
			var signValue = md5.digest('GBK').toUpperCase();  
			
			var sendXml = "<xml><sign>" +  signValue + "</sign>" + xml + "</xml>" ;
			return sendXml;
		}
		
		this.postXml['nonce_str'] = createNonceStr();
	
		this.postXml['mch_billno'] =this.postXml['mch_id'] + "yyyymmdd" + createNumber();
		
		console.log("this.postXml['mch_billno']P:" , this.postXml['mch_billno'])
		
		var allXml = json2xml(this.postXml);
		var sendXml = createSignKey.call(this , allXml);
		
		//return ""
		//console.log("sendXML:" , sendXml)
		return sendXml;
		
	}

	module.exports = function(openID , money){
		console.log("start weixinPay...........................")
		if(!openID){
			console.log("openID is NULL");
			return;
		}
		
		var redPacket =  new weixinPay(openID , money);
		
		redPacket.sendXml();
		
	}

//weixinPay.sendXml();