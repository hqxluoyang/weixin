define(['jquery', 'tools'], function($, tools){
	var shareList = {
		paths: {
			listURL: '/friend-list'
		},

		setInfo: function(d){
			document.getElementById('self-headimg').src = d.msg.headimgurl || 'images/ch_xender@3x.png';
			document.getElementById('self-name').innerHTML = d.msg.nickname + '的红包';
			document.getElementById('p-number').innerHTML = d.num + '个';
			document.getElementById('all-money').innerHTML = d.total + '.00￥';
		},

		createItem: function(user){
			if(!user){
				return;
			}
			
			var flag = (user.status === 'no');
			var html = '<ul class="list-item">'
							+ '<li class="user-headimg">'
								+ '<div class="table-div">'
									+ '<div class="cell-div">'
										+ '<img src="' + user.headimgurl + '" />'
									+ '</div>'
								+ '</div>'
							+ '</li>'
							+ '<li class="user-name">'
								+ user.nickname
							+ '</li>'
							+ '<li class="user-money">'
								+ user.money + '<span>.00￥</span>'
							+ '</li>'
							+ '<li class="user-status ' + (flag ? '' : 'color-green') + '">'
								+ (flag ? '未发放' : '已发放')
							+ '</li>'
						+ '</ul>';

			return html;
		},

		createList: function(users){
			var self = this;
			var html = '';

			var list = document.getElementById('share-list');
			list.innerHTML = '';
			
			for(var i = 0; i < users.length; i++){
				html += self.createItem(users[i]);
			}

			list.innerHTML = html;
		},

		getList: function(){
			var self = this;
			$.ajax({
				url:  self.paths.listURL,
				method: 'GET',
				success: function(d){
					var data = JSON.parse(d);
					
					self.createList(data.list);
					self.setInfo(data.msg);
				}
			});
		},

		init: function(){
			var self = this;
			var href = location.href;

			var paras = tools.parseTxt(href);

			self.paths.listURL = self.paths.listURL + '?code=' + paras.code + '&state='+ paras.state;

			self.getList();
		}
	};

	return shareList;
});


