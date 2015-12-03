/***
	数据库操作
**/


var mongodb = require('./db');
var mongo = require('./mongo');    
var Schema = mongodb.mongoose.Schema;

var salesSchema = new Schema({
        openid:String,
		uuid:String,
		path:String,
		from:String,
		award:String,
		session:String,
		time:Number
});

var share = mongodb.mongoose.model("share", salesSchema);

module.exports = new mongo(share);
