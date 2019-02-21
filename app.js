// 色卡：
// #4bc3c2
// #f17875
// #fef200

const vPush = require('./components/vpush-pro-sdk/vpush.pro.js');
// 吐个槽ID，点击联系反馈后，会跳转吐槽小程序
// 请自行开通
// https://tucao.qq.com
// 留空，则会直接进入联系客服聊天界面

const TUCAO_ID = '54900';


App({
  // 
  // 请在这里设置你的小程序appId，提供给vpush使用
  // 
  vPush: new vPush('wx5bbe79dd056cb238'),
  TUCAO_ID,

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
