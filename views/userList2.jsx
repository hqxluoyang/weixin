var React = require('react');
var ManagerDefault = require('./layouts/manager');

var UserList = React.createClass({
	getInitialState: function(){
		return {

		}
	},
	componentDidMount: function(e){
		this.setState({value: event.target.value});
		console.log('send money');
		var url = '';
		$.get(url, function(result){
			console.log('>>>>>> ajax <<<<<<')
		}.bind(this));
	},

	handleClick: function(){
		console.log('...................................');
		React.findDOMNode(this.refs.btn)
	},

	render: function(){
		this.sendMoney = function(e){
			console.log('..............send money..............');
		};

		var that = this;

		return (
			<ManagerDefault>
				<div className="table-responsive-vertical shadow-z-1">
					<table id="table" className="table table-hover table-mc-light-blue">
				      <thead>
				        <tr>
				          <th ref="btn">openID</th>
				          <th>money</th>
				          <th>Status</th>
				          <th>button</th>
				        </tr>
				      </thead>
				      <tbody>
				        {
				        	that.props.data.map(function(child){
				        		return (
				        			<tr>
							          <td data-title="ID">{child.openID}</td>
							          <td data-title="Name">{child.money}</td>
							          
							          <td data-title="Status">{child.status === 'yes' ? '已领取' : '未领取'}</td>
							          <td data-title="button">
							            <span className="Floating action button" ref="btn" onClick={that.handleClick}>发红包</span>
							          </td>
							        </tr>
				        		);
				        	})
				        }
				        
				      </tbody>
				    </table>
				</div>
			</ManagerDefault>
		);
	}
});


module.exports = UserList;