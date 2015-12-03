/**********session 数据库****************/

保存用户session数据

/***********weixin 数据库*******************************/

介绍: 包含了数据库所有的表单 ;
 
 1 ：shares : 保存了分享的所有的参数

 {
	 openID : "",   //保存了发送分享链接人的 openID
	 uuid:"" , //每次分享的一个唯一变量
	 path:"" ,  //被分享的页面
	 from: "", //区分分享到朋友圈了还是个人了
	 award:"no/ok"  //是否被成功的点击过了
	 session:""      //点击分享链接的人的 session
 }
 
 
 2 : sales : 保存了注册人的所有注册信息
 
 {
	 name:""      //注册人的姓名
	 tel: ""      //注册人的电话
	 address:""   //注册人的地址
	 ipenID: ""   //注册人的openID
	 
 }
 
 3  :reenvalopes : 红包的所有信息
 
 {
	 openID:(no/ok)   : //领红包人的openID
	 status:[no/ok]    : //红包是否被发送
	 money:""          //要发红包的钱数;
 }