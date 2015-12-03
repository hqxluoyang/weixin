var config = require("./config")
var http=require("http");
var https = require("https")

module.exports=function(back , type , flag , url){
	var getUrl = config.keyUrl+type;
	var httpGet = http;
	if(flag && flag == "https"){
		getUrl = url;
		httpGet = https;
	}
	console.log("getURL ::" , getUrl , back);
	httpGet.get(getUrl ,  function(res) {
	res.setEncoding('utf8'); 
	//console.log("get key res")
	res.on('data', function (chunk) {  
			back(chunk);
    });
	
　　}).on('error', function(e) {
		console.log("getKey:err:" , e)
	});
}