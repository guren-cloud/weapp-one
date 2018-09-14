/**
 * vPush核心模块
 * 用于创建提交用户推送凭证信息
 * -------------
 * vPush - 一款专业高效实用的微信小程序推送平台
 * https://vpush.cloud
 * https://dev.vpush.cloud
 * https://github.com/safe-dog/vpush-sdk
 * 版本：20180906
 */

var CONFIG = require('./config');
/**
 * 自建服务接口配置
 * 如果不使用自己搭建的推送服务，那么请留空，默认会使用vPush的API接口
 */
var CUSTOM_API_URL = CONFIG.custom.api;
var CUSTOM_API_APPID = CONFIG.custom.key;

/**
 * vPush的API接口配置
 * 请自行替换VPUSH_APPID为你在开发者控制台添加的ID
 */

var VPUSH_APPID = CONFIG.id; // 自行更换

// 旧版本的接口，如果你当前小程序配置的域名为这个，那么可以暂时不更换
// var VPUSH_HOST = 'https://vpush2.safedog.cc/api';

// 新版本接口，请将cloud.safedog.cc添加到request域名列表
var VPUSH_HOST = 'https://cloud.safedog.cc/vpush';

// 旧版本的接口KEY
// var VPUSH_KEY = 'c0c0_0g0o0d0e0f0a0s0_020h0s0u0p0v'.split('0').reverse().join('');
var VPUSH_KEY = 'guren_cloud_vpush';

// ^_^
/**
 * API调用函数：
 * add(formId)
 * setTags(['tag1'])
 * setAlias('test-user')
 */
// ^_^

class vPush {
  constructor () {

    if (!CUSTOM_API_APPID && !VPUSH_APPID) {
      console.warn('[VPUSH_ERROR] 请编辑vpush/config.js文件，加入您的应用ID或者接口配置！');
      throw new Error('[VPUSH_INIT]');
    }
    this.openId = '';

    // 标签
    this.TAGS = [];
    // 短名
    this.ALIAS = "";

    // 其他设备信息
    var _info = wx.getSystemInfoSync();
    this.INFO = {
      sdk: _info.SDKVersion,
      language: _info.language,
      model: _info.model,
      platform: _info.platform,
      system: _info.system,
      version: _info.version
    };

    // 获取本地存储的openId
    try {
      var cache = wx.getStorageSync('VPUSH_OPEN_ID');
      if (cache) this.openId = cache;
    } catch (e) {}

    this.init();
  }

  /**
   * 初始化，获取openId
   */
  init () {
    if (this.openId) return console.log('[init.has-openid]', this.openId);
    wx.login({
      success: ret => {
        wx.request({
          url: CUSTOM_API_URL ? (CUSTOM_API_URL + '/getOpenId') : (VPUSH_HOST + '/functions/getOpenId'),
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': CUSTOM_API_APPID || VPUSH_KEY
          },
          dataType: 'json',
          data: {
            appId: VPUSH_APPID,
            code: ret.code
          },
          success: _ret => {
            console.log('[vpush.init]', _ret);
            if (CUSTOM_API_URL) {
              var openId = _ret.data.openId;
            } else {
              var openId = _ret.data.result.data.openid;
            }
            if (openId) {
              this.openId = openId;
              wx.setStorageSync('VPUSH_OPEN_ID', openId);
            }
          }
        })
      }
    });
  }

  /**
   * 添加formId
   */
  add (event) {
    var formId = '';
    if (typeof event === 'object') {
      formId = event.detail.formId;
    } else {
      formId = String(event);
    }

    this._create(formId, result => {
      console.log('[vpush.add.result]', result);
    })
  }

  /**
   * 添加id
   */
  _create(formId, callback) {
    if (!this.openId) return console.warn('[vpush.create.no-openid]');
    if (formId.startsWith('the')) return console.warn('[vpush.formId]', formId);
    wx.request({
      url: CUSTOM_API_URL ? (CUSTOM_API_URL + '/vpush/classes/FormIds') : (VPUSH_HOST + '/classes/FormIds'),
      method: 'POST',
      header: {
        'X-Parse-Application-Id': CUSTOM_API_APPID || VPUSH_KEY,
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      data: Object.assign({}, this.INFO, {
        formId,
        openId: this.openId,
        tags: this.TAGS,
        alias: this.ALIAS
      }, CUSTOM_API_URL ? {} : {
        "app": {
          "__type": "Pointer",
          "className": "Apps",
          "objectId": VPUSH_APPID
        }
      }),
      success: ret => {
        console.log('[vpush.create.success]', ret);
        callback && callback(true);
      },
      fail: err => {
        console.warn('[vpush.create.fail]', err);
        callback && callback(false);
      }
    })
  }


  /**
   * 设置短名标识
   */
  setAlias (alias) {
    this.ALIAS = alias;
  }

  /**
   * 设置标签
   * 参数可以是string或者array
   */
  setTags (tag) {
    if (typeof tag === 'string') {
      this.TAGS = [tag];
    } else if (Array.isArray(tag)) {
      this.TAGS = tag;
    } else {
      throw new Error('tag 应为string或array类型！')
    }
  }

  /**
   * 推送给当前用户
   * data = {id, secret, data, path}
   */
  pushToMe (data, callback) {
    wx.request({
      url: VPUSH_HOST + '/functions/PUSH_API',
      method: 'POST',
      header: {
        'X-Parse-Application-Id': VPUSH_KEY,
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      data: Object.assign(data, {
        openId: this.openId
      }),
      success: ret => {
        console.log('[pushToMe.success]', ret);
        callback && callback(ret);
      },
      fail: err => {
        console.log('[pushToMe.failed]', err);
        callback && callback(false);
      }
    })
  }
}

module.exports = new vPush();