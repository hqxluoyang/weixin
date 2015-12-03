var React = require('react');
var DefaultLayout = require('./layouts/default');

var HomePage = React.createClass({
	render: function(){
		return (
			<DefaultLayout title={this.props.title}>
				<div>HomePage - {this.props.title}</div>
			</DefaultLayout>
		);
	}
});

module.exports = HomePage;