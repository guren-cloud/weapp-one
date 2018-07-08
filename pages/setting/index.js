var { API, vPush } = getApp();
var INFO = wx.getSystemInfoSync();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否开启了推送
    PUSH_OPEN: false,
    // 加载推送状态中
    PUSH_LOADING: true,
    STATUSBAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载推送状态
    vPush.isOpenPush(success => {
      this.setData({
        PUSH_LOADING: false,
        PUSH_OPEN: success
      })
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
   * 添加vPush formId
   */
  addPushHandler: function (e) {
    vPush.add(e, () => null);
  },

  /**
   * 开关推送
   */
  togglePushHandler: function (e) {
    this.addPushHandler(e);
    var { PUSH_LOADING, PUSH_OPEN } = this.data;
    if (PUSH_LOADING) return console.log('loading push..');
    this.setData({
      PUSH_LOADING: true
    });

    if (PUSH_OPEN) {
      vPush.closePush(success => {
        this.setData({
          PUSH_LOADING: false,
          PUSH_OPEN: success ? false : PUSH_OPEN
        })
      })
    } else {
      vPush.openPush(success => {
        this.setData({
          PUSH_LOADING: false,
          PUSH_OPEN: success ? true : PUSH_OPEN
        })
      })
    }
  },

  /**
   * 返回
   */
  goBackHandler: function () {
    wx.navigateBack({
      
    })
  },

  /**
   * 开源声明
   */
  openSourceHandler: function (e) {
    this.addPushHandler(e);
    wx.navigateTo({
      url: '/pages/setting/openSource',
    })
  },
})