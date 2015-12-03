var React = require('react');
var DefaultLayout = require('./layouts/default');

var FriendList = React.createClass({
	render: function(){
		var html = [];
		if(this.props.data.length > 0){
			this.props.data.map(function(child){
				html.push(<div className="col s12 m8 offset-m2 l6 offset-l3">
						    <div className="card-panel grey lighten-5 z-depth-1">

							    <div className="row friend-item">
							        <div className="col s2">
							        	<img src={child.imgUrl === '' ? '/images/xender@3x.png': child.imgUrl} />
							        </div>
							        <div className="col s10">
						            	<span className="black-text">{child.name}</span>
						            </div>
						            <div className="col s10">
							        	<span className="black-text">{child.money}</span>
							        </div>
							        <div className="col s10">{child.status === 'yes' ? '已领取' : '未领取'}</div>
							    </div>

						    </div>
					    </div>
					);
			})
		}else{
			html = <div className="alingCenter">
						您还没有分享给好友, 赶快分享赚钱吧!
					</div>
		}

		return (
			<DefaultLayout title={this.props.title}>
				<div className="friend-list">
					<h2>分享列表</h2>
					{
						html
					}
					
				</div>
			</DefaultLayout>
		);
	}
});

module.exports = FriendList;