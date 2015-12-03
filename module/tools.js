/***********工具******************/

var tools = {};

tools.parseCookie = function(cookieStr){
	var cookie = cookieStr;
	var cookies = {};
	if(cookie){
		cookie && cookie.split(';').forEach(function(cook) { 
        var parts = cook.split('='); 
        cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim(); 
    });  
	}
	
	return cookies;
}

module.exports = tools;




