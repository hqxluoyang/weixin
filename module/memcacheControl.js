var memcache = require('memcache');


var memcacheControl = {
	memOptions: {
		port: '2000',
		host: '54.223.230.13'
	}
};

var memObject = new memcache.Client(memcacheControl.memOptions.port, memcacheControl.memOptions.host);

memcacheControl.setData = function(key, value){
	memObject.set(key, value, function(err, result){
		if(err){
			console.error(err);
		}
		console.dir(result);
		memObject.end();
	});
}

memcacheControl.getData = function(key){
	memObject.get(key, function(err, result){
		if(err){
			console.error(err);
		}else{
			if(result){
				return result;
			}
		}
	})
}

module.exports = memcacheControl;