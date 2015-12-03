/***
	数据库操作
**/


var mongodb = require('./db');
var mongo = require('./mongo');    
var Schema = mongodb.mongoose.Schema;

var salesSchema = new Schema({
        openid:String,
        status:String,
		fromOpenid:String,
		money:Number
});

var reEnvalopes = mongodb.mongoose.model("reEnvalopes", salesSchema);

module.exports = new mongo(reEnvalopes);
