/***
	数据库操作
**/


var dbs = require("./db");

function Post(name , tel , address , time){
	this.tel = tel;
	this.name = name;
	this.address = address;
	
	 if(time) {
                this.time = time;
        } else {
                this.time = new Date();
        }
}


module.exports = Post;

/**
	保存数据
**/

Post.prototype.save = function save(callback){
	var post = {
		name:this.name,
		tel: this.tel,
		address:this.address,
		time:this.time
	};
	
	var peopleSchema = dbs.Schema;

	var pS = dbs.db.model("user" , peopleSchema);

	var author = new pS(post)

	pS.create(post)
	//author.save();
}

/**
	获取数据
**/

Post.prototype.get = function get(username, callback) {
	var post = {
		name:this.name,
		tel: this.tel,
		address:this.address,
		time:this.time
	};
	
	var peopleSchema = new dbs.Schema({
		name:String,
		tel:String,
		address:String
	})

	var pS = dbs.db.model("user" , peopleSchema);

	pS.find(username).exec(callback)
};

