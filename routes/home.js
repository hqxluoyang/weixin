exports.homePage = function(req, res){
	res.render('home', {name: 'Home', title: 'this is home page'});
};
