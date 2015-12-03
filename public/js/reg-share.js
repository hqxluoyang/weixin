define(['jquery', 'tools', 'loader'], function($, tools, loader){
	var regShare = {
		formValues: {},
		paraObjths: {
			shareStatusURL: '/register'
		},
		
		getShareStatus: function(code , openid){
			var self = this;
			// alert('code = ' + code + ' openid = ' + openid);
			$.ajax({
				url: self.paraObjths.shareStatusURL + '?code=' + code + "&openid=" + openid,
				method: "GET",
				success: function(d){
					var p = JSON.parse(d);
					// p = {"share": false,"register": false};
					// alert('p.register = ' + p.register + ' p.share = ' + p.share);
					loader.displayD();

					if(p.register){
						if(p.share){
							self.showPage('register', 'share');
						}else{
							self.showPage('register', 'register');
						}
					}else{
						self.showPage('follow', 'follow');
					}
					
				}
			});
		},

		getPara: function(name){
			var h = location.href;
			// alert('href = ' + h);
			var data = h.split("?");
			var paraObj = tools.parseTxt(data[1]);
			var pa = '';
			if(paraObj[name]){
				for(i in paraObj){
					if(i === name){
						pa = paraObj[name];
					}else{
						continue;
					}
				}
			}
			return pa;
		},

		showPage: function(p, s){
			var reg = document.getElementById('register-page');
			var sh = document.getElementById('share-page');
			var fol = document.getElementById('follow-page');
			if(p.indexOf('reg') != -1){
				if(s.indexOf('share') != -1){
					sh.style.display = 'block';
					reg.style.display = 'none';
				}else{
					reg.style.display = 'block';
					sh.style.display = 'none';
				}
				fol.style.display = 'none';
			}else{
				reg.style.display = 'none';
				sh.style.display = 'none';
				fol.style.display = 'block';
			}
		},

		verifyFn: function(type, str){
			switch(type){
				case 'name':
					var n = /^([\u4e00-\u9fa5]{2,15}|[0-9a-zA-Z_]{4,30})$/;			// /^[a-zA-z]\w{3,15}$/; 			// /^[a-zA-Z]{1}[0-9a-zA-Z_]{1,}$/;
					if(n.test(str)){
						return 'ok';
					}else{
						return '只能以英文字母开头, 并由字母、数字或者下划线组成';
					}
				case 'phone':
					var e = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
					if(e.test(str)){
						return 'ok';
					}else{
						return '您输入的E-mail地址格式有误, 请确认后重新输出';
					}
				case 'address':
					if(str.length > 5){
						return 'ok';
					}else{
						return 'no';
					}
				default:
					break;
			}
		},

		bindEvt: function(){
			var self = this;
			var btn = document.getElementById('invite-btn');
			tools.addEvt(btn, 'click', function(e){
				var s = document.querySelector('#guide-share');
				s.style.display = 'block';
			});

			var guide = document.querySelector('#guide-share');
			tools.addEvt(guide, 'click', function(e){
				this.style.display = 'none'
			});

			var textArr = document.querySelectorAll('#register-page input[type="text"]');
			var t = ['name', 'phone', 'address'];

			for(var i = 0; i < t.length; i++){
				tools.addEvt(textArr[i], 'blur', function(e){
					e.stopPropagation();

					var n = this.name;
					var v = this.value;

					if(self.verifyFn(n, v) !== 'ok'){
						// console.log('======= 输出字段' + n + '不合法 =========');
						this.parentNode.style.border = '1px solid #f00';
						self.formValues[n] = '';
					}else{
						this.parentNode.style.border = '0px';
						self.formValues[n] = v;
						
						// console.log('ooooooooooooooooooooookkkkkkk');
					}
				});
			}

			var reg = document.querySelector('#reg-submit');
			tools.addEvt(reg, 'click', function(e){
				e.stopPropagation();

				var flag = false;
				if(!self.formValues.name || !self.formValues.phone || !self.formValues.address){
					flag = false;
				}else{
					for(i in self.formValues){
						if(self.formValues === ''){
							// console.log('no submit');
							flag = false;
							break;
						}else{
							// console.log('submit formValues');
							flag = true
							continue;
						}
					}	
				}
				

				if(flag){
					$.ajax({
						url: '/register',
						method: 'POST',
						data: self.formValues,
						success: function(d){
							// console.log('d ==== ' + d);
							self.showPage('register', 'share');
						}
					})
				}
			});
		},

		init: function(){
			// alert('222222222222');
			var self = this;
			loader.init();
			
			self.getShareStatus(self.getPara('code') , self.getPara('openid'));

			self.bindEvt();
		}
	}

	return regShare;
});