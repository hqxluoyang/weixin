var React = require('react');
var DefaultLayout = require('./layouts/default');

var RegisterPage = React.createClass({
	render: function(){
		var reg = 'none';
		var share = 'none';
		if(this.props.share){
			reg = 'none';
			share = 'block';
		}else{
			reg = 'block';
			share = 'none';
		}
		console.log('this.props.share = ' + this.props.share);
		return(
			<DefaultLayout>
				<div className="registerPage" style={{display: reg}}>
					<h2>用户注册</h2>
					<form action="/register" method="post" style={{padding: '2em 0 0 0'}}>
						<div className="form-group">
							<label for="fieldName" className="col-sm-2 control-label">姓名</label>
							<div className="col-sm-4">
								<input type="text" className="form-control" required id="fieldName" name="name" />
							</div>
						</div>

						<div className="form-group">
							<label for="fieldPhone" className="col-sm-2 control-label">手机号</label>
							<div className="col-sm-4">
								<input type="text" className="form-control" required id="fieldPhone" name="phone" />
							</div>
						</div>
						
						<div className="form-group">
							<label for="fieldAddress" className="col-sm-2 control-label">营业厅地址</label>
							<div className="col-sm-4">
								<input type="text" className="form-control" required id="fieldAddress" name="address" />
							</div>
						</div>

						<div className="form-group">
							<div className="col-sm-offset-2 col-sm-4">
								<button type="submit" className="btn btn-default floatR">注册</button>
							</div>
						</div>
					</form>
				</div>

				<div className="follow-page" style={{display: share}}>
					<h2>分享有红包</h2>
					<div className="qrcode">
						<img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFz8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1VTWlnOFBtQ0taeGlLZ3lSR19IAAIEtWPlVQMEAAAAAA==" />
					</div>
					<div className="follow-btns">
						<a className="waves-effect waves-light btn" href="http://weixin.shanchuan.cn/test.html">点击关注</a>
						<a className="waves-effect waves-light btn" href="weixin://contacts/profile/gh_fc19de108776">点击关注</a>
					</div>
					<div className="follow-des">
						<div className="follow-content">
							<h3>注册有红包</h3>
							<p>
								关注"一键换机"公众号, 并注册成功, 就有红包拿
							</p>
						</div>
						<div className="follow-content">
							<h3>分享有红包</h3>
							<p>
								关注"一键换机"公众号, 并分享给好友, 也有红包拿
							</p>
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
});

module.exports = RegisterPage;