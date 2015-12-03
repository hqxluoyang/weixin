
var openIDmsgC = require("./openIDmsgC");
var getAddress = require("./getAddress");

var MrgMsg = {};

MrgMsg.text = "您的支持就是我们的动力，任何问题，请致电 010 - 84934398 反馈 或通过公共号给我们留言，我们会认真对待您的每一条留言，再次感谢！" ;
MrgMsg.attention = "欢迎你关注闪传一键换机。"

MrgMsg.xml2json = function(json , xml){
	var str = ""
		for(var i in json){
			var s = "<" + i + ">" + json[i] + "</" + i + ">";
			str +=s;
		}

		if(xml){
			var str = "<xml>" + str + "</xml>"
		}
		return str;
}

MrgMsg.processEvent = function(xml , msg , res){
	
	var event = xml.Event['$cd'];
	var openID = xml.FromUserName['$cd'];
	//openID = JSON.parse(openID);
	console.log("xxxxxxxx:event:" , openID);
	
	if(event == "subscribe"){
		console.log("关注:" , openID)
		openIDmsgC.save(openID , function(data){
			msg.MsgType = "text";
			//msg.CreateTime = xml.CreateTime ;
			msg.Content =data.nickname+ "你好！" +  MrgMsg.attention;
			var xml = MrgMsg.xml2json(msg , "xml");
			console.log("xxxxxxxxxxxxxxxxxx:" , xml)
			res.write(xml);
			res.end;
			console.log("返回关注完的参数:" , msg)
		});

		


	}else if(event == "unsubscribe"){
		console.log("取消关注");
	}else{
		
	}

	if(xml.EventKey && xml.EventKey['$cd'] == "menuresult-0-4"){
		msg.MsgType = "text";
		msg.CreateTime = xml.CreateTime ;
		msg.Content = MrgMsg.text;
		var xml = MrgMsg.xml2json(msg , "xml");
		console.log("提交问题:" , xml)
		res.write(xml);
		res.end;
	}
	
	if(xml.Event && xml.Event['$cd'] == "LOCATION"){
		var x = xml.Latitude;
		var y = xml.Longitude;
		console.log("位置信息处理")
		console.log("xxxxxxxxxxxxxxxx:" , xml.Event  ,  xml.Event['$cd'] == "LOCATTON" , xml.Event['$cd'])
		getAddress(x , y , openID);
	}
	
};

MrgMsg.creatMsg = function(){
	return {
		ToUserName:"",
		FromUserName:"gh_fc19de108776",
		CreateTime:"",
		MsgType:"text",

		Content:""
	}
}

var processMsgCenter = function(xml , req , res){
	console.log("xmlMsgType:" , xml.MsgType)
	var msg = MrgMsg.creatMsg();
	msg.ToUserName = xml.FromUserName['$cd'];
	msg.MsgType = xml.MsgType['$cd'];
	switch(xml.MsgType['$cd']){
		case 'event':
			
			MrgMsg.processEvent(xml , msg , res);
			//res.write("");
			//res.end;
			break;

		case 'text':
			//var msg = MrgMsg.creatMsg();
			msg.CreateTime = xml.CreateTime ;
			msg.Content =MrgMsg.text;
			msg.MsgType = "text";
			//msg.ToUserName = xml.FromUserName['$cd'];

			var xml = MrgMsg.xml2json(msg , "xml");
			res.write(xml);
			res.end;
			break;

		case 'image':
			//break;

		case 'video':
			//break;

		case 'location':
			//break;

		case 'link':
			console.log("link:" , xml)
			//break;

		default:
			msg.MsgType = "text";
			msg.CreateTime = xml.CreateTime ;
			msg.Content = MrgMsg.text;
			var xml = MrgMsg.xml2json(msg , "xml");
			console.log("xxxxxxxxxxxxxxxxxx:" , xml)
			res.write(xml);
			res.end;
			break;
	}
}

module.exports = processMsgCenter;