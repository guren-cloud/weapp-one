var { API, vPush } = getApp();
var INFO = wx.getSystemInfoSync();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    first: [],
    opacity: 0,
    LOADING: true,
    STATUSBAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onPullDownRefresh();
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
      setTimeout(() => {
        this.setData({
          first: datas[0],
          data: datas.slice(1),
          LOADING: false
        })
      }, 500);
    })
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
  
  },

  /**
   * 卡片点击事件
   */
  addPushHandler: function (e) {
    // 插入vPush
    vPush.add(e, () => null);
    // 跳转详情
    var { item } = e.currentTarget.dataset;
    if (!item) return console.log('[not item]');
    wx.navigateTo({
      url: '/pages/detail/index?item=' + encodeURIComponent(JSON.stringify(item)),
    });
  },

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

  gotoSetting: function () {
    wx.navigateTo({
      url: '/pages/setting/index',
    })
  },

  gotoOpenSource: function () {
    wx.navigateTo({
      url: '/pages/setting/openSource',
    })
  }
})