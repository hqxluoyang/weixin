require.config({
	baseUrl: '/js',

	// 加载AMD规范模块
	paths: {
		jquery: 'jquery-1.11.2.min',
		material: 'materialize-hou',
		hammerjs: 'hammer.min',
		config: 'config',
		tools: 'tools',
		wxLib: 'http://res.wx.qq.com/open/js/jweixin-1.0.0',
		weixin: 'weixin',
		regShare: 'reg-share',
		loader: 'loader'
	},

	// 加载非AMD规范模块
	shim: {
		'hammerjs':{
			deps :['jquery'],
			exports: 'jQuery.fn.hammer'
		},
		'material': {
			deps: ['jquery', 'hammerjs'],
			exports: 'Material'
		}
	},

	waitSeconds: '30'
});


require(['jquery', 'tools', 'weixin', 'regShare'], function($, tools, weixin, regShare){
	// alert('app is begin in the main.js');
	var wsend = new weixin().init();
	// alert('111111111111');
	regShare.init();
	//wsend.send();
});