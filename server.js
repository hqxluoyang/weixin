'use strict';
var server = require('./viewEngine-jsx');

server.listen(server.get('port'), function(){
	console.log('jsx engine server is starting on http://weixin.xender.com:' + server.get('port') + ', press Ctrl-C to terminate...');
});
