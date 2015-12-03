/*******返回关注并且成功注册的用户***********/

var redEnvelopes = require("../module/redEnvelopes");   //红包
var url = require("url");
var openID = require("../module/getopenID");
var openIDMsg = require("../module/openIDmsg");     // 关注用户管理
var querystring = require("querystring");

var tools = require("../module/tools");
var mrgList = {};

mrgList.getList = function(obj , share){
	var obj = JSON.parse(obj);
	console.log("根据openid读取红包列表:" ,obj.openid )
	share.res.cookie("openID" , obj.openid);
	redEnvelopes.find({openid:obj.openid} , function(err , data){
		if(data){
			mrgList.messageReturn(data , share.res , obj.openid);
		}else{
			mrgList.send(share.res , "");
			//share.res.render('FriendList', {title: 'Friend List page', data: []});
		}
	})
}

mrgList.hasOpenid = function(openid , res){
	console.log("hasOpenid根据cookie 判断openid")
	redEnvelopes.find({openid:openid} , function(err , data){
		if(data){
			mrgList.messageReturn(data , res , openid);
		}else{
			mrgList.send(res , "");
			//share.res.render('FriendList', {title: 'Friend List page', data: []});
		}
	})
}

mrgList.getArrList = function(objArr , data , openid){
	var list = [];
	
	console.log("红包列表与:" , objArr)

	var myOpenIdMsg = {
		total:0,
		num:0,
		msg:""
	}

	for(var k=0 ; k<data.length ; k++){
		if(!myOpenIdMsg["msg"] && data[k]["openid"] == openid){
				myOpenIdMsg["msg"] = data[k];
		}
	}
	
	for(var i = 0 ; i<objArr.length ; i++){
		var redP = objArr[i];
		var redP = {
			money:objArr[i]['money'],
			openid:objArr[i]['openid'],
			fromOpenid:objArr[i]['fromOpenid'],
			status:objArr[i]['status']
		}

		if(objArr[i]["openid"] == openid){
			myOpenIdMsg["total"] +=parseInt(objArr[i]['money']);
			myOpenIdMsg["num"]++;
		}
		
		if(!redP['fromOpenid']){
			continue;
		}

		//console.log("分享的对象：" ,redP['fromOpenid'])
		for(var j=0 ; j<data.length ; j++){
			console.log("查找分享人信息:" , redP['fromOpenid'] ,  data[j]['openid'])

			if(redP['fromOpenid'] == data[j]['openid']){
				redP["nickname"] = data[j]['nickname'];
				redP['headimgurl'] = data[j]['headimgurl'];
				list.push(redP);
				continue;
			}
		}
	}
//	console.log("列表参数:" , )
	list.sort(function(a,b){return a["nickname"].localeCompare(b["nickname"])})
	return {
		list:list,
		msg:myOpenIdMsg
	};
}

mrgList.messageReturn = function(objArr , res , openid){
	
	openIDMsg.find({} , function(err , data){
		if(data){
			var listMsg = mrgList.getArrList(objArr , data , openid);

			//console.log("添加获奖名单:"  , listMsg)
			//res.render('FriendList', {title: 'Friend List page', data: listMsg.list , msg:listMsg.msg});
			console.log("请求的列表：" , listMsg)
			mrgList.send(res , listMsg);
		}else{
			mrgList.send(res , "");
			//res.render('FriendList', {title: 'Friend List page', data: []});
		}
	})
}

mrgList.getOpenid = function(obj){
	console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxobj.cookie.openID:" , obj.cookie.openID)
	if(typeof obj.cookie['openID'] == "string" && obj.cookie['openID'] != "undefined" ){
		mrgList.hasOpenid(obj.cookie.openID , obj.res);
		return
	}

	if(obj.code){
		openID(obj.code , mrgList.getList , obj);
	}else{
		mrgList.send(obj.res , "");
		//obj.res.render('FriendList', {title: 'Friend List page', data: []});
	}
};

mrgList.send = function(res , data){
	
	var json = JSON.stringify(data);
	res.write(json)
	res.end();
}


exports.friendList = function(req, res){
	
	var urlParam = url.parse(req.url);

	var json = querystring.parse(urlParam.query);
	json.res = res;

	var cookie = tools.parseCookie(req.headers.cookie);

	console.log("读取链接的cookie：" , cookie)

	json.cookie = cookie;

	if(req.query['test']){
		console.log('friend-list ===>111111111');
		mrgList.send(res , "");
		//res.render('FriendList', {title: 'Friend List page', data: [{imgUrl: '/images/xender@3x.png', name: 'mick', money: '20', status: 'ok'}, {imgUrl: '/images/xender@3x.png', name: 'richard', money: '90', status: 'no'}]});
	}else{
		console.log('friend-list ===>2222222222222');
		mrgList.getOpenid(json);
	}
}