/***
	数据库操作
**/

var openIDMsg = require("./openIDmsg");
var getkey = require("./getkey");
var config = require("./config");

var openID = {};

openID.backInfomation = function(data){
	openIDMsg.save(data, function(err){
							if(err) {
								console.log("保存ipenid的信息出错");
							} else {
							   console.log("保存openid的信息成功");
							}
						});
}

openID.save = function(openID , callback){
	//console.log("保存 openID：" , openID ， "详细信息")
	if(!openID){
		console.log("openid为空，请检查")
		return;
	}
	openIDMsg.findByName({openid:openID}, function(err , obj){
            if(!err){
				if(obj){  //已经被点击过
					console.log("openid:" +obj.openID + "该用户详细信息已经从在")
					if(callback) callback(obj);
				}else{
					
					var url = config.getIDinformation + "access_token=" + config.access_token + "&openid=" + openID;
					getkey(function(data){
						
						data = JSON.parse(data);
						
						var saveMsg = {
							nickname:data.nickname,
							openid:data.openid,
							sex:data.sex,
							language:data.language,
							city:data.city,
							register:"no",
							country:data.country,
							position:"",
							verify:"no",
							headimgurl:data.headimgurl,
							groupid:data.groupid,
							province:data.province
						}
						
						console.log("保存详细信息:" , saveMsg , data)
						openIDMsg.save(saveMsg, function(err){
							if(err) {
								console.log("保存ipenid的信息出错");
							} else {
							   console.log("保存openid的信息成功");
							}
						});
						if(callback) callback(data)
					} , "" , "https" , url);
				}
			}
	});
}



module.exports = openID

