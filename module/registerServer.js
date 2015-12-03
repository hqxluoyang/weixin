'use strick'

//var userOpe = require('./userMongo');     //保存的注册信息
var redEnvelopes = require("./redEnvelopes");   //保存红包红包
var share = require('../module/shareMongo');    //分享的信息
var openIDMsg = require("./openIDmsg");
var mrg = {};

mrg.findRegister = function(data){
	openIDMsg.findByName({openid:data.openid}, function(err , obj){
           // if(!err){
           	if(obj && obj.register=="yes"){
           		console.log("openid 已经被注册过");
           	}else{
           		data.register = "yes";
           		for(var i in data){
           			obj[i] = data[i];
           		}

           		obj.save();
           		mrg.sendRedEnvelopes(data);
           	}
			   
	});
}

/****发红包****/
mrg.redMoney = function(data){
	redEnvelopes.save(data, function(err){
	            if(err) {
	                //res.send({'success':false,'err':err});
	            } else {
	                //res.send({'success':true});
	            }
   	}); 	
}

/*****修改发过红包的*******/

mrg.reviseAward = function(obj){
	var newObj = {}
		newObj.form = obj.form;
		newObj.openid = obj.openid;
		newObj.uuid = obj.uuid;
		newObj._id = obj._id;
		newObj.award = obj.award;
		newObj.session = obj.session;
		newObj.time = obj.time;
		newObj['award'] = "yes";
		console.log("yui:" , newObj  , newObj['award'])
		
		share.findByIdAndUpdate(newObj , function(err , data){console.log("修改发红包状态修改完成" , err , data)})
}

/*******看看是否需要发红包***********/
mrg.sendRedEnvelopes = function(data){
	console.log("根据session来查是不是被分享过:" , data.session)
	share.findByName({session:data.session} , function(err , obj){      //查询是不是被分享过
		console.log("分享过的数据:" , obj);
		
		if(obj && data.openid != obj.openid){  //如果被分享过
			
			console.log("分享过:" , data , obj)
			if(obj.award=='no'){
				var myMoney={
					openid:data.openid, //
					status:'no',
					fromOpenid:'',
					money:2
				}
				
				var otherMoney={
					openid:obj.openid, //
					fromOpenid:data.openid,
					status:'no',
					money:1
				}
				
				mrg.redMoney(myMoney);     //给自己发钱
				mrg.redMoney(otherMoney);  //给分享人发钱
				
				/*******修改已经领红包标志*********/
				
				mrg.reviseAward(obj);
				
			}else{
				console.log("红包已经发送过了:")
			}
			
			
		}else{   //如果没有被分享过，给自己发红包
			var dataSend={
				openid:data.openid, //
				status:'no',
				fromOpenid:'',
				money:2
			}
			console.log("没有被分享过")
			mrg.redMoney(dataSend);
		}
		
	})
}



exports.registerServer = function(req, res){
	console.log('>>> register server <<<' + ' address = ' + req.body.address);
   	var session = req.sessionID;
	var json = {
		name: req.body.name,
		tel:req.body.phone,
		session:session,
		address:req.body.address
	}
	
	var cookie = req.headers.cookie;
	var cookies = {};
	if(cookie){
		cookie && cookie.split(';').forEach(function(cook) { 
        var parts = cook.split('='); 
        cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim(); 
    });  
	}
	
	json.openid = cookies['openID'];
	
	console.log("dddddddddddddddddddddddddddddddd registerServer:" ,  cookies)
	//return
	mrg.findRegister(json);

	res.write("success:ok");
	res.end();
	//res.render('register', {share:true});
};

