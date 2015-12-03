
var userOpe = require('../module/userMongo');     //保存的注册信息
var redEnvelopes = require("../module/redEnvelopes");   //保存红包红包
var share = require('../module/shareMongo');    //分享的信息
var openIDMsg = require("../module/openIDmsg");

var mrg = {};

mrg.getOPenidMessage = function(red , res){    // 获得openid的所有信息
	openIDMsg.find({} , function(err , obj){
		//console.log('>>>>>>>> obj = ' + obj);
		if(obj){
			mrg.resSend(obj ,red,  res);
		}else{
			res.write("");
			res.end();
		}
	})
}

mrg.getUserList = function(red , res){   //获得营业员的所有信息
	userOpe.find({} , function(err , obj){
		console.log('>>>>>>>> obj = ' + obj);
		//res.write({data: obj, title: '营业员列表'});
		if(obj){
			
		}else{
			res.write("");
			res.end();
		}
	})
}

mrg.resSend = function(openidMsg , redPacket , res){
	var listArr = [];
	for(var i =0 ; i<redPacket.length ; i++){
		
		for(var j=0 ; j<openidMsg.length ; j++){

			if(redPacket[i]["openid"] == openidMsg[j]["openid"]){
			//	console.log("redPackedddddddddddddddddddddddddddddddddddddddddddddddddd:" , openidMsg[j]['headimgurl'])
				var headurl = openidMsg[j]['headimgurl'];
				var a={};
				a['money'] = redPacket[i]['money'];
				a['status'] = redPacket[i]['status'];
				a['_id'] = redPacket[i]['_id'];
				a['headimgurl'] =  openidMsg[j]['headimgurl'];
				a['nickname'] =  openidMsg[j]['nickname'];

				a['city'] =  openidMsg[j]['city'];
				a['openid'] =  openidMsg[j]['openid'];
				a['tel'] =  openidMsg[j]['tel'];
				a['address'] =  openidMsg[j]['address'];
				a['position'] =  openidMsg[j]['position'];
				a['sex'] =  openidMsg[j]['sex'];
				a['verify'] =  openidMsg[j]['verify'];

				console.log("aaaaaaaaaaaaaaaaa:" , a)
				listArr.push(a);
				continue;
			}
		}
	}
	//console.log("读取到的红包列表为:" ,listArr)
	listArr.sort(function(a,b){return a["nickname"].localeCompare(b["nickname"])})
	mrg.send(res , listArr);
}


mrg.send = function(res , data){
	var sendList = {data: data, title: '营业员列表'} ; 
	var json = JSON.stringify(sendList);
	res.write(json)
	res.end();
}

mrg.finAllUser = function(res){
	redEnvelopes.find({status:"no"} , function(err , obj){
		if(obj){
			mrg.getOPenidMessage(obj , res);
		}else{
			res.write("");
			res.end();
		}
	})
}

module.exports.userList = function(req , res){
	console.log("开始查询获奖列表:")
	mrg.finAllUser(res);
}

