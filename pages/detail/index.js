// pages/detail/index.js
var INFO = wx.getSystemInfoSync();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    date: [],
    _item: '',
    STATUS_BAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 解析item参数
    var item = JSON.parse(decodeURIComponent(options.item));
    this.setData({
      data: item,
      date: item.date.split(' / '),
      _item: options.item
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
  /**
   * 预览图片
   */
  viewImageHandler: function (e) {
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
  }
})