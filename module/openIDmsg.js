/***
	数据库操作
**/


var mongodb = require('./db');
var mongo = require('./mongo');    
var Schema = mongodb.mongoose.Schema;

var salesSchema = new Schema({
		name:String,
		tel:String,
		address:String,
		session:String,
		register:String,
        nickname:String,
		openid:String,
		sex:Number,
		language:String,
		city:String,
		verify:String,
		country:String,
		headimgurl:String,
		groupid:Number,
		position:String,
		province:String
});

var sales = mongodb.mongoose.model("openIDmsg", salesSchema);

module.exports = new mongo(sales);

