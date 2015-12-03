var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
	render: function(){
		return (
			<DefaultLayout title={this.props.title + ' >> index.jsx'}>
				<div>HelloMessage - {this.props.name}</div>
			</DefaultLayout>
		);
	}
});

module.exports = HelloMessage;