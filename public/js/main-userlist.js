require.config({
	baseUrl: '/js',

	// 加载AMD规范模块
	paths: {
		jquery: 'jquery-1.11.2.min',
		material: 'materialize-hou',
		hammerjs: 'hammer.min',
		config: 'config',
		md5:"md5.min",
		tools: 'tools',
		wxLib: 'http://res.wx.qq.com/open/js/jweixin-1.0.0',
		userlist: 'UserList'
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
		},
		
		 'md5': {
            exports: 'md5'
        }
	},

	waitSeconds: '30'
});


require(['jquery', 'material', 'tools', 'userlist'], function($, material, tools, userlist){
	console.info('main-userlist.js');
	
	$(function(){
		userlist.init();	
	});
	
});