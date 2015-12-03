var config = require("./config")
var key=require("./getkey");
var gettoken = function(){
	
	var getK = function(){
		key(function(value){
			console.log("value:" , value)
			config['acc_token'] = value;
		//	menu.createMenu(value);
		} , "gettoken")
		
		setTimeout(getK , 60000)
	}
	console.log("get_token")
	getK();
}

module.exports = function(){
	gettoken();
};