exports.indexPage = function(req, res){
	res.render('index', {name: 'Michael-W', title: 'this is index.js'});		// index >> .jsx文件
};