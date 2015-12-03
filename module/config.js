var config = {
	keyUrl: "http://weixin.shanchuan.cn:9090/",
	access_token: '',
	token: "yijianhuanji9686354985435",

	port: "80",

	db: {
		cookieScret:"",
		db:"people",
		host:"mongodb://localhost/weixin"
	},
	
	attention:{        //关注
		
	},     
	
	getIDUrl:"https://api.weixin.qq.com/sns/oauth2/access_token?",
	getIDinformation:"https://api.weixin.qq.com/cgi-bin/user/info?",     //根据ipenid获得用户的基本信息
	dbData: {
		
	},
	sessionID:{
		
	},
	
	openID:"",

	menu: {
		"button": [
			{
				"type": "",
				"name": "使用说明",
				"sub_button": [
					{
						"type": "view",
						"name": "产品介绍",
						"key": "menuresult-0-0",
						"url": "http://mp.weixin.qq.com/s?__biz=MzA4OTE5MDIxMQ==&mid=207954177&idx=1&sn=799c6e2439a8c03ac829f10a1cb6e46d&scene=0#rd"
					},
					{
						"type": "view",
						"name": "视频教程",
						"key": "menuresult-0-1",
						"url": "http://v.qq.com/page/p/7/s/p0162h70d7s.html"
					}
				]
			},

			{
				"type": "view",
				"name": "下载闪传",
				"url": "http://weixin.shanchuan.cn/download.html"
			},

			{
				"name": "营业员区",
				"sub_button": [
					{
						"type": "view",
						"name": "注册有红包",
						"key": "menuresult-0-2",
						"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxefde828d58d60ea7&redirect_uri=http://weixin.shanchuan.cn/reg-share.html?action=viewtest&response_type=code&scope=snsapi_base&state=1#wechat_redirect" 
					},
					{
						"type": "view",
						"name": "分享列表",
						"key": "menuresult-0-3",
						"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxefde828d58d60ea7&redirect_uri=http://weixin.shanchuan.cn/share-list.min.html?action=viewtest&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
					},
					{
						"type": "click",
						"name": "有问题反馈",
						"key": "menuresult-0-4",
						"url": "您的支持就是我们的动力，任何问题，请致电 010 - 84934398 反馈 或通过公共号给我们留言，我们会认真对待您的每一条留言，再次感谢！"
					}
				]
			}
		]
	}
}

module.exports = config;

