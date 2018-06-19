// pages/home/index.js
var { API } = getApp();

var INFO = wx.getSystemInfoSync();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    // view高度
    HEIGHT: INFO.screenHeight,
    // 状态栏高度
    STATUSBAR_HEIGHT: INFO.statusBarHeight,
    // 标题栏透明度
    HEADER_OPACITY: 0,
    // 返回顶部按钮
    TO_TOP_OPACITY: 0,
    // 顶部距离
    scrollTOP: 0,
    loadingMore: false,
    // 显示更多数据
    SHWO_MORE: false,
    LOADING: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onPullDownRefresh();
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
    this.setData({
      LOADING: true
    });
    API.getData().then(datas => {
      this.setData({
        datas,
        LOADING: false
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 加载更多
   */
  loadMoreHandler: function () {
    return false;
    if (this.data.loadingMore) return;
    API.getNext(this.data.datas).then(datas => {
      this.setData({
        loadingMore: false,
        datas: this.data.datas.concat(datas)
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '复杂世界里, 一个就够了',
      path: '/pages/home/index'
    }
  },

  /**
   * 滚动事件
   */
  scrollHandler: function (e) {
    var { scrollTop } = e.detail;
    // 计算透明度
    var HEADER_OPACITY = parseFloat(scrollTop / 200).toFixed(2);
    if (HEADER_OPACITY > 1) HEADER_OPACITY = 1;
    if (HEADER_OPACITY < 0.1) HEADER_OPACITY = 0;

    // 如果超过一页的高度，则显示返回顶部按钮
    var TO_TOP_OPACITY = parseFloat(scrollTop / (INFO.windowHeight * 2)).toFixed(2);
    if (TO_TOP_OPACITY > 1) TO_TOP_OPACITY = 1;
    if (TO_TOP_OPACITY < 0.1) TO_TOP_OPACITY = 0;

    this.setData({
      HEADER_OPACITY,
      TO_TOP_OPACITY,
    });
  },
  /**
   * 返回顶部
   */
  toTopHandler: function () {
    this.setData({
      scrollTOP: 0
    })
  },
  /**
   * 点击卡片事件
   */
  viewHandler: function (e) {
    var { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/detail/index?item=' + encodeURIComponent(JSON.stringify(item)),
    })
  },

  showMoreHandler: function () {
    this.setData({
      SHOW_MORE: true
    })
  }
})