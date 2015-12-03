var config = require("./config")
var http=require("http");
/*
module.exports=function(back , type){
	http.get(config.keyUrl+"?model="+type, function(res) {
	res.setEncoding('utf8'); 	
	res.on('data', function (chunk) {  
			back(chunk);
    });
	
　　}).on('error', function(e) {
});
}
*/


http.get("http://54.223.230.13:9090/rsx/0/", function(res) {
	res.setEncoding('utf8'); 
	console.log("res:" , res);
	res.on('data', function (chunk) {  
			console.log("chunk:" , chunk);
   });
   
})
