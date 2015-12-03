'use strick'

var userOpe = require('./userMongo');
var weixinPay = require('./weixinPay');
var redEnvelopes = require("./redEnvelopes");   //保存红包红包
var share = require('../module/shareMongo');
var ser={session:"3pJaAr5TnPztV7Jdoy5JphaVOkL7zsLD" , openID:"oQ00huFZa7AA1UwtUoQ5xKbY2b-Q"}

var getKey = require("./getkey");

var https = require("https");
var weixinPay = require("./weixinPay_test");

var ObjectID = require("mongodb").ObjectID;
var redEnvelopes = require("./redEnvelopes");   //保存红包红包

var openIDMsg = require("./openIDmsg");

function sortDict(dict) {
    var dict2 = {}, 
        keys = Object.keys(dict).sort();

    for (var i = 0, n = keys.length, key; i < n; ++i) {
        key = keys[i];
        dict2[key] = dict[key];
    }

    return dict2;
}

var str = "你好我是闪传yijianhuanji";
var strE = {
	name:"yijianhuanji",
	time:"hehe你好"
}

var sortStr = sortDict(strE);

console.log("排序过好的字串:" , sortStr);



openIDMsg.find({} , function(err , doc){
	if(doc){
		console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
		for(var i=0 ; i<doc.length ; i++){
			doc[i]['verify'] = "no";
			doc[i].save();
		}
	}
})

redEnvelopes.find({} , function(err , doc){
	if(doc){
		console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
		for(var i=0 ; i<doc.length ; i++){
			doc[i]['status'] = "no";
			doc[i].save();
		}
	}
})


/*
var deepCopy = function(o) {
    if (o instanceof Array) {
		console.log("arrau")
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;

    } else if (o instanceof Object) {
        var n = {}
		console.log("object")
        for (var i in o) {
			console.log("dddddddddddd:" , i)
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}

var sendMoney = function(openID , money){
	console.log("sendMoney..............." )
	weixinPay(openID , 100);
	
}


redEnvelopes.find({} , function(err , obj){
	 console.log("findAll obj:" , obj);
	 var data = obj[0];	
	 sendMoney(data.openID , data.money)
	 
	 return
	if(obj){
		/*var newObj = {}
		for(var i in obj){
			var a = obj[i]
			newObj[i]=a;
		}
		*/
		//console.log("obj:" , obj[0])
		//var newObj = deepCopy(obj);
		
		//var str = JSON.stringify(obj); //系列化对象
     //	var newObj = JSON.parse(str); //还原
/*	 var newObj = {}
		 newObj.form = obj.form;
		  newObj.openID = obj.openID;
		   newObj.uuid = obj.uuid;
			newObj._id = obj._id;
			 newObj.award = obj.award;
			  newObj.session = obj.session;
			   newObj.time = obj.time;
			//    newObj.award = obj.award;
	 
	 
		newObj['from'] = "ttttrtertert";
		console.log("yui:" , newObj  , newObj['from'])
		
		share.findByIdAndUpdate(newObj , function(err , data){console.log("44444444444444444s:" , err , data)})
	}
			
})

*/

//getKey("https://api.weixin.qq.com/cgi-bin/user/info?" , "access_token=T3zo5uqtglGE-dLPaNUX_oCTP1JGYNtwaabN3TlMQgi9Jt-KaJK5RHf-312WC66dJtXlvywPJN1Cjx4AXU8LFJGpGbPulApL2F5NVrduaoE&openid=oQ00huMhWuKrwPECSyXATZg4U-ho&lang=zh_CN");
/*

https.get("https://api.weixin.qq.com/cgi-bin/user/info?access_token=lW_ROTR5PdvVCITuFbUG7RIhTMInZmN91MMdwrd0E3Ve9ZB1FaJYRUYapwmtiWJRRMa24HO-OUNKR0XHeQVmsZUS6bZrlVoFarPuESqBkIE&openid=oQ00huMhWuKrwPECSyXATZg4U-ho&lang=zh_CN", function(_res){
			var str = '', resp;
			_res.on('data', function(data){
				str += data;
				
				console.log("data:" , data)
			});
			_res.on('end', function(){
				console.log('return ticket:  ' + str);
				try{
					resp = JSON.parse(str);
				}catch(e){
			        return errorRender(res, '解析远程JSON数据错误', str);
				}
				console.log("resp:" , resp)
				
			});
		});

*/
/*
var obj = {
	_id:ObjectID("55ed63d7b586cdd12adcfa54")
	//status:"ok"
}

redEnvelopes.updateById(obj , {status:"ok" , money:1} , function(err , doc){
	console.log("callback:" , doc)
});
/*
redEnvelopes.findByName({_id:ObjectID("55ed946abd093656322fc204")} , function(err , obj){
		/*var msg = {
			money:
		}
		*/
//		obj.status = "ok";
		
		
		//mrg.redPackage(obj.openid , obj.money);
		//mrg.send(id , res);
//	})

//weixinPay("oQ00huMhWuKrwPECSyXATZg4U-ho" , 8000);