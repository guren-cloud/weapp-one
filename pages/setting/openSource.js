var { API, vPush } = getApp();
var INFO = wx.getSystemInfoSync();
var weToast = require('../../libs/weToast/weToast.js');
var TOAST;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    STATUSBAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    TOAST = new weToast(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  addPushHandler: function (e) {
    vPush.add(e);
  },
  goBackHandler: function () {
    wx.navigateBack({
      
    })
  },

  copyHandler: function (e) {
    var { cp } = e.currentTarget.dataset;
    wx.setClipboardData({
      data: cp,
      success: () => {
        TOAST.success(cp === 'h01ger' ? '作者微信已复制！' : '网址已经复制到剪贴板！')
      }
    });
  }
})