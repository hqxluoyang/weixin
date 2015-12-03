var WXPay = require('weixin-pay');

var wxpay = WXPay({
    appid: 'oQ00huFZa7AA1UwtUoQ5xKbY2b-Q',
    mch_id: '1264424901',
    partner_key: 'anWddf9uiShanChuan1985anqizhiliY' //微信商户平台API密钥
  //  pfx: fs.readFileSync('./wxpay_cert.p12'), //微信商户平台证书
});

wxpay.createUnifiedOrder({
    body: '扫码支付测试',
    out_trade_no: '20140703'+Math.random().toString().substr(2, 10),
    total_fee: 1,
    spbill_create_ip: '192.168.2.210',
    notify_url: 'http://wxpay_notify_url',
    trade_type: 'NATIVE',
    product_id: '1234567890'
}, function(err, result){
    console.log(result);
});