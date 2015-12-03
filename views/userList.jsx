var React = require('react');
var ManagerDefault = require('./layouts/manager');

var UserList = React.createClass({
	
	getInitialState: function(){
		return {value: 'Hello!'};
	},
	handleChange: function(e){
		this.setState({
			value: e.target.value
		});
	},
	render: function(){
		var value = this.state.value;
		return (
			<div>
				<input type="text" value={value} onChange={this.handleChange} />
				<p>{value}</p>
			</div>
		);
	}
});

React.render(
	<UserList />,

	document.getElementById('example')
);


module.exports = UserList;