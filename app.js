/**
 * 一ONE小程序
 * 项目：https://github.com/guren-cloud/weapp-one
 * 古人云小程序：https://guren.cloud
 * 作者微信：hack_fish
 */

//app.js
var API = require('./utils/api.js');
var vPush = require('./libs/vpush/_vpush.js');
var FAV = require('./utils/fav.js');

App({
  API,
  vPush,
  FAV: new FAV(),

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
