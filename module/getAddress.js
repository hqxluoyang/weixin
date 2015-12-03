var getkey = require("./getkey")
var http=require("http");
var openIDMsg = require("./openIDmsg");



var mrg = {};

mrg.url = "http://api.map.baidu.com/geocoder/v2/?ak=o6u0MlD0wBUIEf2HO3kC98RT&callback=renderReverse&output=json&pois=0&coordtype=bd09ll"

mrg.baiduMap = "http://api.map.baidu.com/geoconv/v1/?from=3&to=5&ak=o6u0MlD0wBUIEf2HO3kC98RT"

mrg.setAddressMongo = function(openid , address){
	openIDMsg.findByName({openid:openid} , function(err , doc){
		if(doc){
			doc.position = address;
			doc.save();
		}
	})
}

mrg.setAddress = function(openid , data){
	//console.log("获得的营业员的具体地址:" , JSON.parse(data))
	if(data){
		try{
			var str = data.substring(data.indexOf("(") + 1  , data.indexOf(")"));
			var jsonStr = JSON.parse(str);
			var position = jsonStr["result"]["formatted_address"] ; 

			mrg.setAddressMongo(openid , position);
			console.log("jsonStr获得百度地图的地址 :" , jsonStr);
		}catch(e){}
		
	}
}

mrg.getBaiduxy = function(x , y , openid){
	var url = mrg.baiduMap + "&coords=" + x + "," + y;
	
	http.get(url ,  function(res) {
	res.setEncoding('utf8'); 
	//console.log("get key res")
	res.on('data', function (chunk) {
		//	console.log("返回的百度的坐标:" , chunk)

			if(chunk){
				var xy = JSON.parse(chunk);
				var position = xy.result[0];
				mrg.getAddress(openid , position.x , position.y);
			}  
			
    });
	
　　}).on('error', function(e) {
		console.log("getKey:err:" , e)
	});

};

mrg.getAddress = function(openid , x , y){
	var url = mrg.url + "&location=" + x + "," + y;
	//console.log("根据维度快开始获取：" , x , y , openid , url)
	http.get(url ,  function(res) {
	res.setEncoding('utf8'); 
	//console.log("get key res")
	res.on('data', function (chunk) {  
			mrg.setAddress(openid , chunk);
    });
	
　　}).on('error', function(e) {
		console.log("getKey:err:" , e)
	});
}

module.exports = function(x , y, openid){
	
	mrg.getBaiduxy(x , y , openid);
}
