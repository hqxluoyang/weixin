/***
	数据库操作
**/


var mongodb = require('./db');
var mongo = require('./mongo');    
var Schema = mongodb.mongoose.Schema;

var salesSchema = new Schema({
        openID:String,
		session:String
});

var session = mongodb.mongoose.model("session", salesSchema);

module.exports = new mongo(session);
