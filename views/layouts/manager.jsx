var React = require('react');
var FooterEle = require('./footer');

var ManagerDefault = React.createClass({
	render: function(){
		return (
			<html>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0" />

					<title>{this.props.title + ' >> default.jsx'}</title>
					<link rel="stylesheet" type="text/css" href="../css/common.css"></link>
					<link rel="stylesheet" type="text/css" href="../css/materialize.css"></link>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					<script dangerouslySetInnerHTML={{__html:'console.log("haha")'}} />
				</head>
				<body>
					
					{this.props.children}
					
					<div id="example"></div>

				    <FooterEle></FooterEle>
					<script data-main="/js/main.js" src="/js/require.js"></script>
				</body>
			</html>
		);
	}
});

module.exports = ManagerDefault;