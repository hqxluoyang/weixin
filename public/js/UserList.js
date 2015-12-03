define(['jquery', 'config', 'material' , "tools" , "md5"], function($, config, material , tools , md5){
	var UserList = {
		options: {
			listUrl: '/manager/user-list',			// 用户列表URL
			sendMoneyURL: '/sendMoney',				// 发红包URL
			verifyURL: '/verify',
			users: []
		},

		createVerifyUser: function(user){
			var self = this;
			var dom = document.createElement('div');
			dom.id = 'verifyUser';
			dom.className = 'verifyUser divShadow';

			var html = '<dl class="verify-item">'
						+ '<dt>'
							+ '<img src="' + user.headimgurl + '" />'
						+ '</dt>'
					 	+ '<dd>'
					 		+ user.nickname
					 	+ '</dd>'
					 	+ '<dd>'
					 		+ self.getSex(user.sex)
					 	+ '</dd>'
					 	+ '<dd>'
					 		+ user.tel
					 	+ '</dd>'
					 	+ '<dd>'
					 		+ user.address
					 	+ '</dd>'
					 	+ '<dd>'
					 		+ user.position
					 	+ '</dd>'
					 	+ '<dd>'
					 		+ '未验证'
					 	+ '</dd>'
					 + '</dl>'
					 + '<div class="verify-btn">'
					 	+ '<div class="btn-ct"><div id="btn-verify" class="waves-effect waves-light btn verify-bg">验证</div></div>'
					 	+ '<div class="btn-ct"><div id="btn-close" class="waves-effect waves-light btn">关闭</div></div>'
					 + '</div>';

			dom.innerHTML = html;

			return dom;
		},

		showVerifyUser: function(user){
			var self = this;

			if(!self.verifyUser){
				self.verifyUser = self.createVerifyUser(user);
				document.getElementsByTagName('body')[0].appendChild(self.verifyUser);

				var bindEvt = function(){
					var btnVerify = document.getElementById('btn-verify');
					var btnClose = document.getElementById('btn-close');

					tools.addEvt(btnVerify, 'click', function(e){
						$.ajax({
							url: self.options.verifyURL + '?openid=' + user.openid,
							method: "GET",
							success: function(data){
								var user = JSON.parse(data);

								if(user.verify === 'yes'){
									var packets = $('#table tbody tr');

									for(var i = 0; i < self.options.users.length; i++){
										if(self.options.users[i].openid === user.openid){
											self.options.users[i].verify = 'yes';
											$(packets[i]).find('td[data-title="status"]')[0].innerHTML = '已验证';
											$(packets[i]).find('td[data-title="button"] a')[0].innerHTML = '发红包';
											$(packets[i]).find('td[data-title="button"] a').removeClass('verify-bg');
										}
									}
								}

								self.showVerifyUser();
							}
						});
					});

					tools.addEvt(btnClose, 'click', function(e){
						self.showVerifyUser();
					});
				}
				bindEvt();
			}else{
				self.verifyUser.remove();
				self.verifyUser = null;
			}
		},

		getSex: function(c){
			var sex = '';
			if(c == '1'){
				sex = '男';
			}else if(c == '2'){
				sex = '女';
			}else{
				sex = '未知'
			}
			return sex;
		},

		createItem: function(user){
			var self = this;
			
			var status = '';
			var btnTxt = '';
			if(user.verify === 'yes'){
				if(user.status === 'no'){
					status = '未发放';
					btnTxt = '发红包';
				}else{
					status = '已发放';
				}
			}else{
				status = '未验证';
				btnTxt = '验证';
			}
			var str = '<tr class="' + user.openid + '">'
			        	+ '<td data-title="headImg" class="head-img"><img src="' + user.headimgurl + '"></td>'
			        	+ '<td data-title="nickname">' + user.nickname + '</td>'
			        	+ '<td data-title="sex">' + self.getSex(user.sex) + '</td>'
			        	+ '<td data-title="tel">' + user.tel + '</td>'
			        	+ '<td data-title="address">' + user.address + '</td>'
			        	+ '<td data-title="position">' + user.position + '</td>'
			        	+ '<td data-title="money">' + user.money + '.00￥' + '</td>'
			        	+ '<td data-title="status">' + status + '</td>'
			        	+ '<td data-title="button">'
			        		+ '<a class="waves-effect waves-light btn' + (user.verify === 'yes' ? '' : ' verify-bg') + (user.status === 'no' ? '' : ' disabled') + '">' + btnTxt + '</a>'
			        	+ '</td>'
			        + '</tr>';

			return str;
		},

		processList: function(d){
			var self = this;
			var html = '';
			var tb = document.getElementsByTagName('tbody')[0];
			var elArr = '';
			
			if(d.length < 1){
				html = '';
				tb.innerHTML = html;
			}else{
				for(var i = 0; i < d.length; i++){
					if(d[i].status === 'no'){
						html += self.createItem(d[i]);
						elArr = self.createItem(d[i]);
					}else{
						html += self.createItem(d[i]);
						elArr = self.createItem(d[i]);
					}
				}
				tb.innerHTML = html;

				console.log('elArr = ' + elArr);

				var bindEvt = function(){
					var idx = -1;
					$('.btn').unbind().bind('click', function(){
						idx = $('.btn').index(this);
						if(d[idx].status === 'yes'){
							return;
						}else{
							self.sendUserInfo(d[idx]);	
						}
					});
				}

				bindEvt();
			}

		},
		
		sendLogin:function(){
			var user = document.getElementById("user").value;
			var p = document.getElementById("password").value;
			var password = md5(p);
			var url = "/login?user=" + user + "&password=" + password ; 
			
			$.ajax({
				url:url,
				method: 'GET',
				success: function(data){
					console.log("ddddddddddd:" , data , data.status === "yes")
					var data = JSON.parse(data);
					if(data.status === "yes"){
						document.getElementById("loginForm").style.display = "none";
						tools.cookie.setCookie("user" , "addmin" , "20s");
					}else{
						
					}
				}
			});
			
		},
		
		login:function(){
			var cookie = tools.cookie.getCookie("user")
			
			if(cookie){
				document.getElementById("loginForm").style.display = "none";
				return;
			}
			
			$("#login").click(function(){
				UserList.sendLogin();
			})
		},

		initPage: function(){
			var self = this;
			var ph = tools.getPageSize()[1];
			var head = 64;

			var setPageSize = function(){
				var mbody = document.getElementById('manager-body');
				
				mbody.style.height = (ph - head) + 'px';

			};
			setPageSize();

			window.onresize = function(){
				ph = tools.getPageSize()[1];

				setPageSize();
			}
		},

		init: function(){
			this.initPage();
			this.login();

			this.getList();
			
			/*
			var cookie = tools.cookie.getCookie("user")
			console.log("start read:" , cookie , tools);
			tools.cookie.setCookie("user" , "addmin" , "20s");
			console.log("end read:" , cookie);
			*/
			console.log("login")
		},

		fixStatus: function(status, idx){
			var self = this;
			if(status === 'yes'){
				self.options.users[idx].status = status;
				
				$('tbody tr td[data-title="status"]')[idx].innerHTML = '已发放';
				$('tbody tr td a:eq(' + idx + ')').addClass('disabled');
				
			}
		},

		sendUserInfo: function(user){
			var self = this;

			if(user.verify === 'yes'){
				// 发红包
				$.post(self.options.sendMoneyURL, {'_id': user._id, 'openid': user.openid}, function(data){
					var user = JSON.parse(data);

					if(user.status === 'no'){
						// 显示需要验证的用户, 并提供验证按钮
						self.showVerifyUser(user.msg);
					}else{
						for(var i = 0; i < self.options.users.length; i++){
							if(self.options.users[i]._id == user._id && user.status === 'yes'){
								self.fixStatus(user.status, i);
							}else{
								continue;
							}
						}
					}

				});
			}else{
				// 验证注册用户
				$.ajax({
					url: self.options.verifyURL + '?openid=' + user.openid,
					method: "GET",
					success: function(data){
						var user = JSON.parse(data);

						if(user.verify === 'yes'){
							var packets = $('#table tbody tr');

							for(var i = 0; i < self.options.users.length; i++){
								if(self.options.users[i].openid === user.openid){
									self.options.users[i].verify = 'yes';
									$(packets[i]).find('td[data-title="status"]')[0].innerHTML = '已验证';
									$(packets[i]).find('td[data-title="button"] a')[0].innerHTML = '发红包';
									$(packets[i]).find('td[data-title="button"] a').removeClass('verify-bg');
								}
							}
						}
					}
				});
			}
			
		},

		getList: function(){
			var self = this;
			$.ajax({
				url: this.options.listUrl,
				method: 'GET',
				success: function(data){
					self.options.users = JSON.parse(data).data;
					self.processList(self.options.users);
				}
			});
		}
	};


	return UserList;
});


