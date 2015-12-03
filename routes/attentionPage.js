var url = require("url");
var querystring = require("querystring");
var insertData = require('../module/shareMongo');
var share = {};

share.shareInMongo = function(data){
	this.save(data);
};

share.save = function(shareData){
	//console.log("obj.openid == shareData.openid:" , obj.openid , shareData.openid)
	//if(obj.openid == shareData.openid) return;
	
	if(shareData.from && shareData.openid){
		var data = {
			openID:shareData.openid,
			uuid:shareData.uuid,
			path:shareData.pathname,
			from:shareData.from,
			session:shareData.session,
			time:1
		}
		//weixinPay(shareData.openid);
		insertData.save(data, function(err){
            if(err) {
               // res.send({'success':false,'err':err});
			    console.log("err share")
			//	res.render('register', {});
			return ;
            } else {
               // res.send({'success':true});
			   console.log("succc share")
			//   res.render('register', {});
			return
            }
		});
		
	}
};


exports.attentionPage = function(req, res){
	
	var session = req.sessionID;
	var urlParam = url.parse(req.url);
	var json = querystring.parse(urlParam.query);
	console.log("ssssssssssssssssssssssssssssssssssssssshare:" , req.sessionID)
	json.pathname = urlParam.pathname;
	json.session = req.sessionID;
	
	share.shareInMongo(json);
	
	res.render('AttentionPage', {name: 'Attention', title: 'Attention Page', liked: false});
};