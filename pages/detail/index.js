// pages/detail/index.js
var INFO = wx.getSystemInfoSync();
var { vPush, FAV } = getApp();
var weToast = require('../../libs/weToast/weToast.js');
var TOAST;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    date: [],
    _item: '',
    // 是否已经喜欢
    IS_LIKED: false,
    // 是否是点击分享进来的页面
    IS_SHARE_PAGE: false,
    SCROLL_TOP: 0,
    // 导航栏透明度
    opacity: 0,
    HEIGHT: INFO.windowHeight,
    STATUSBAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    TOAST = new weToast(this);
    // 解析item参数
    var item = JSON.parse(decodeURIComponent(options.item));
    this.setData({
      data: item,
      date: item.date.split(' / '),
      _item: options.item,
      IS_LIKED: FAV.check(item.id),
      HEIGHT: wx.getSystemInfoSync().windowHeight,
      IS_SHARE_PAGE: getCurrentPages().length === 1
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.data.title,
      path: '/pages/detail/index?item=' + this.data._item
    }
  },

  /**
   * 返回
   */
  goBackHandler: function () {
    wx.navigateBack({});
  },
  goHomeHandler: function () {
    wx.redirectTo({
      url: '/pages/home/index',
    })
  },
  /**
   * 预览图片
   */
  viewImageHandler: function (e) {
    vPush.add(e);
    var { url } = e.currentTarget.dataset;
    wx.previewImage({
      urls: [url],
    })
  },

  /**
   * 复制内容
   */
  copyHandler: function () {
    wx.setClipboardData({
      data: this.data.data.content,
    })
  },

  /**
   * vPush添加formId
   */
  addPushHandler: function (e) {
    vPush.add(e);
  },

  /**
   * 返回顶部
   */
  toTopHandler: function (e) {
    vPush.add(e);
    this.setData({
      SCROLL_TOP: 0
    })
  },

  /**
   * 滚动事件
   */
  scrollHandler: function (e) {
    var { scrollTop } = e.detail;
    // 计算透明度
    var opacity = parseFloat(scrollTop / 250).toFixed(2);
    if (opacity > 1) opacity = 1;
    if (opacity < 0.1) opacity = 0;
    // 这里设置<300是减少setData次数，节省内存
    if (scrollTop < 300) {
      this.setData({
        opacity
      })
    }
  },

  /**
   * 喜欢/取消
   */
  toggleLikeHandler: function (e) {
    vPush.add(e);
    var { IS_LIKED, data } = this.data;
    if (IS_LIKED) {
      // 取消
      FAV.del(data.id);
      TOAST.info("不能被您欢真是遗憾！")
    } else {
      FAV.add(data);
      TOAST.success("很高兴能得到您的喜欢！")
    }
    this.setData({
      IS_LIKED: !IS_LIKED
    })
  }
})