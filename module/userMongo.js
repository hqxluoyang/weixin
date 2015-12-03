/***
	数据库操作
**/


var mongodb = require('./db');
var mongo = require('./mongo');    
var Schema = mongodb.mongoose.Schema;

var salesSchema = new Schema({
       user:String,
	   password:String,
	   status:String
});

var sales = mongodb.mongoose.model("user", salesSchema);

module.exports = new mongo(sales);

