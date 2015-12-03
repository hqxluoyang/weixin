exports.test = function(req, res){

	res.render('test', {name: 'Test', title: 'Test Page', liked: false});
};