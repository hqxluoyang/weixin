var http = require('http');
var equal = require('assert').equal;
 
var options = {
    host: 'api.weixin.qq.com',
    port: 80,
    path: '/cgi-bin/menu/create?access_token=L3o9IsXslSCRynwTDvwCCh2bLI4yb0EtTXHcnJpTdrKt1ouB-j0rxq8G7Tu80GcaQe7cQP_fM5JWJbNluSI9a_RvFInVYUsFAim7qSknK-Q',
    method: 'POST',
    headers:{
        'accept': '*/*',
        'content-type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
        'user-agent': 'nodejs client'
    }
};
 
var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    equal(200, res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
 
    res.on('data',function (chunk) {
         console.log('BODY: ' + chunk);
    });
});
 
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
var jsonString = {
    "button":[
      {	
        "type":"click",
        "name":"一键换机",
        "key":"V1001_TODAY_MUSIC"
      },
      {	
        "type":"click",
        "name":"一键介绍",
        "key":"V1001_TODAY_MUSIC"
      },
      {
        "name":"菜单",
        "sub_button":[
      {	
        "type":"view",
        "name":"注册红包",
        "url":"http://weixin.shanchuan.cn/register"
      },
      {
        "type":"view",
        "name":"视频",
        "url":"http://v.qq.com/"
      },
      {
        "type":"click",
        "name":"赞一下我们",
        "key":"V1001_GOOD"
      }
    ]
 }
 
//var str = jsonString.toString();
var json = JSON.stringify(jsonString);
console.log("json:" , json)
req.write(json);
req.end();