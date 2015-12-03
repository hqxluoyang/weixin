var React = require('react');
var DefaultLayout = require('./layouts/default');

var AttentionPage = React.createClass({
	render: function(){
		return(
			<DefaultLayout>
				<div className="attention-page">
					<div className="">关注一键换机公众号</div>
				</div>
			</DefaultLayout>
		);
	}
});

module.exports = AttentionPage;