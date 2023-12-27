import {config} from '../config.js'
class HTTP{
  constructor(){
    this.baseRestUrl = config.api_blink_url
  }
  request(params){
    var that =this
    var url =this.baseRestUrl + params.url;
    if(!params.method){
      params.method = 'GET';
    }
    wx.request({
      url: 'url',
      data: params.data,
      method: params.method,
      header:{
        'content-type': 'application/json',
        'appkey':config.appkey
      },
      success:function(res){
        var code =res.statusCode.toString();
        var startChar =code.charAt(0);
        if (startChar == '2'){
          params.success && params.success(res.data);
        }else{
          params.error && params.error(res);
        }
      },
      fail:function(err){
        params.fail && params.fail(err)
      }
    });
  }
};
export { HTTP} ;