/***********微信发钱******************/

var weixinPay = require("./weixinPay");
var ObjectID = require("mongodb").ObjectID;
var redEnvelopes = require("./redEnvelopes");   //保存红包红包
var openIDMsg = require("./openIDmsg");

var mrg = {};

mrg.redPackage = function(openid , money){
	console.log("发送红包:" , openid , money)
	var m = parseInt(money) * 100;
	weixinPay(openid , m);
}

mrg.setStatus = function(id , res){
	//var id = doc._id ;
//	console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:" , doc)
//	return
	//var data="ObjectId(" + id + ")";
	var id = id.toString();
	redEnvelopes.updateById({_id:ObjectID(id)} , {status:"yes"} , function(err , doc){
		console.log("发红包之后的状态改变:" , doc)
	})
	
}

mrg.sendMoney = function(doc , res){
	mrg.send(doc._id , res);
	mrg.redPackage(doc.openid , doc.money);
	mrg.setStatus(doc._id)
};

mrg.send = function(id , res , msg){

	if(msg){
		var json = JSON.stringify({'status': 'no', '_id': id , 'msg':msg});
	}else{
		var json = JSON.stringify({'status': 'yes', '_id': id});
	}
	
	res.write(json)
	res.end();
}


mrg.findFromOpenid = function(redMsg, res){
	openIDMsg.findByName({openid:redMsg.fromOpenid} , function(err , doc){
		if(doc && doc.verify == "no"){
			mrg.send(redMsg._id , res , doc);
		}else{
			mrg.sendMoney(redMsg , res)   // 如果是没有找到分享的那个人，发送
		}
	})
};


mrg.judgeMan = function(id , res){
	redEnvelopes.findByName({_id:ObjectID(id)} , function(err , doc){
		if(doc && doc.status == "no"){
			if(doc.fromOpenid){
				mrg.findFromOpenid(doc , res);
			}else{
				doc.status = "yes";
				doc.save();
				mrg.send(id , res);
				mrg.redPackage(doc.openid , doc.money);
			}
		}else{
			mrg.send(id , res);
		}
	})
}



module.exports = function(req , res){
	console.log("发送红包:" , req.body);
	var data = req.body;
	mrg.judgeMan(data._id , res);
	
}



