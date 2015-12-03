define(['jquery', 'config', 'wxLib'], function($, config, wx){
	var weixinShare = (function(){
		var signUrl = {
			'top': "http://weixin.shanchuan.cn/rsx/0/"	
		};
		
		var cons = function(){
			var title, desc, link, imgUrl;
			
			this.setTitle = function(v){
				title = v;
			}
			this.getTitle = function(){
				return title;
			}
			
			this.setDesc = function(v){
				desc = v;
			}
			this.getDesc = function(){
				return desc;
			}
			
			this.setLink = function(v){
				link = v;
			}
			this.getLink = function(){
				return link;
			}
			
			this.setImgUrl = function(v){
				imgUrl = v;
			}
			this.getImgUrl = function(){
				return imgUrl;
			}
			
			this.getSignUrl = function(){
				return signUrl;
			}
			
			this.setTitle('闪传榜');
			this.setDesc('闪传应用分享排行榜');
			this.setLink("http://weixin.shanchuan.cn/share");
			this.setImgUrl('http://top.xender.com/static/images/top_xender_icon.png');
			
			//weixinShare.init();  
		};
		
		return cons;
	})();
	
	weixinShare.prototype = {
		init: function(){
			var self = this;
			//alert("share:init")
			self.send();
		},
		
		send: function(){
			var self = this;
			var url = self.getSignUrl().top;
	
			$.ajax({
				url: self.getSignUrl().top, 		// 此处url请求地址需要替换成你自己实际项目中服务器数字签名服务地址
				type: 'post',
				data: {
					url: location.href//.split('#')[0] // 将当前URL地址上传至服务器用于产生数字签名
				}
			}).done(function(r){
				// 返回了数字签名对象
//				console.log('r = ' + r);
//				console.log('r.appid = ' + r.appid);
//				console.log('r.timestamp = ' + r.timestamp);
//				console.log('r.nonceStr = ' + r.nonceStr);
//				console.log('r.signature = ' + r.signature);

				// 开始配置微信JS-SDK
				
				console.log("send share '''''''''''''''''''''''''''''''''''''''")
				wx.config({
			        debug: false,
			        appId: r.appid,
			        timestamp: r.timestamp,
			        nonceStr: r.nonceStr,
			        signature: r.signature,
			        jsApiList: [
			            'checkJsApi',
			            'onMenuShareTimeline',
			            'onMenuShareAppMessage',
			            'onMenuShareQQ',
			            'onMenuShareWeibo',
			            'hideMenuItems',
			            'chooseImage'
			        ]
			    });
				
				var getCookie = function(name){
			
					var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			 
					if(arr=document.cookie.match(reg))
						return (arr[2]);
					else
						return null;
			
				};
				
			   // var msg ="cid=:" +  getCookie("openID");
				var openid = getCookie("openID");
			    // 调用微信API
			    wx.ready(function(){
			    	  	
			    	self.setLink(self.getLink() + "?openid=" + openid);
			    	
			    	var shareData = function(){
			    		var sdata = {
						    title: self.getTitle(),
						    desc: self.getDesc(),
						    link: self.getLink(),
						    imgUrl: self.getImgUrl(),
						    type: 'link',
						    dataUrl: '',
						    success: function () { 
						    	for(var i in arguments){
						    		for(var k in i){
						    			alert(k)
						    		}
						    	}
						        console.log('用户确认分享后执行的回调函数');
						    },
						    cancel: function () { 
							//alert("faile")
						        console.log('用户取消分享后执行的回调函数');
						    }
						};
			    		// alert('self.getLink() = ' + self.getLink());
			    		return sdata;
			    	}
			    	
		    		wx.onMenuShareTimeline(shareData());
		    		wx.onMenuShareAppMessage(shareData());
			    	
					// 添加图片
					$('#addPic').on('click', function(){
						wx.chooseImage({
						    success: function (res) {
						        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						        // var imgs = localIds.split(',');
						        localIds.forEach(function(v, i){
						        	console.log(v);
						        	$('#picList').append('<li><img src="'+ v +'" alt="" width="50"></li>');
						        });
						    }
						});
					});
			    });
				
			    
			    wx.error(function(res){
			    	console.log('error res = ' + res);
			    });
			});
		}
	};
			
	return weixinShare;
});


