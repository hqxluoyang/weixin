var React = require('react');

var TestPage = React.createClass({
	getInitialState: function(){
		return {liked: false};
	},

	handleClick: function(event){
		console.log('handle click event = ' + event);
		this.setState({liked: !this.state.liked});
	},

	render: function(){
		var text = this.state.liked ? 'like' : 'haven\'t liked';
		console.log('text = ' + text);
		return (
			<p onClick={this.handleClick}>
			You {text} this. Click to toggle.
			</p>
		);
	}
});


module.exports = TestPage;