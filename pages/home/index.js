const { vPush } = getApp();

const HELPER_KEY = 'HELPER_20181223';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    data: [],
    bg_img: '',
    process: 10,
    process_color: 'rgba(75, 195, 194, 0.5)',
    SHOW_MENU: false,
    OPEN_PUSH: true,
    SHOW_HELPER: false,
    nickName: null
  },

  closeHelper: function () {
    this.setData({
      SHOW_HELPER: false
    });
    wx.setStorageSync(HELPER_KEY, 'yes');
  },

  getUserInfo: function (e) {
    let { userInfo } = e.detail;
    this.setData({
      nickName: userInfo.nickName
    });
  },

  gotoAbout: function () {
    wx.navigateTo({
      url: '/pages/about/index',
    })
  },

  togglePush: function () {
    let OPEN_PUSH = !this.data.OPEN_PUSH;
    vPush.togglePush(OPEN_PUSH).then(() => {
      this.setData({
        OPEN_PUSH
      });
    });
  },

  openMenu: function () {
    this.setData({
      SHOW_MENU: true
    })
  },
  closeMenu: function () {
    this.setData({
      SHOW_MENU: false
    })
  },

  changeHandler: function (e) {
    let { current } = e.detail;
    let count = this.data.data.length;
    // 计算进度
    let process = (current + 1) / count * 100;
    // 计算颜色
    let color = 'rgba(75, 195, 194, 0.5)';
    if (process > 30) color = 'rgba(254, 242, 0, 0.5)';
    if (process > 70) color = 'rgba(241, 120, 117, 0.5)';
    this.setData({
      process,
      process_color: color,
      bg_img: this.data.data[e.detail.current].img_url
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断，如果又options.scene，则首先获取指定ID的文章
    this.loadData(options.scene);
    wx.getUserInfo({
      success: ret => {
        this.setData({
          nickName: ret.userInfo.nickName
        });
      }
    });

    // 检查是否已经展示引导
    let IS_SHOW_HELPER = wx.getStorageSync(HELPER_KEY);
    if (!IS_SHOW_HELPER) {
      this.setData({
        SHOW_HELPER: true
      });
    }
  },
  loadData: function (scene = '') {
    new Promise(RES => {
      if (scene && parseInt(scene) > 0) {
        wx.request({
          url: 'https://one.mssnn.cn/?act=one&id=' + scene,
          dataType: 'json',
          success: ret => {
            RES(ret.data);
          }
        })
      } else {
        return RES(null);
      }
    }).then(currentData => {
      console.log('currentData=', currentData);
      wx.request({
        url: 'https://one.mssnn.cn/?act=all',
        dataType: 'json',
        success: ret => {
          let { data } = ret.data;
          let new_data = [];
          if (currentData) new_data.push(currentData);
          data.map(d => {
            if (currentData && d.id === currentData.id) return;
            new_data.push(d);
          });
          this.setData({
            data: new_data,
            loading: false,
            bg_img: new_data[0].img_url
          })
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      vPush.isOpenPush().then(open => {
        this.setData({
          OPEN_PUSH: open
        })
      })
    }, 1000);
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

  }
})