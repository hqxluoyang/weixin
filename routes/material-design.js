exports.MaterialDesign = function(req, res){
	res.type('text/html');
	res.render('material-design', {name: 'Material Design', title: 'Material Design test'});
}