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
    });

    this.SHARE_IMG = null;
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
      // TOAST.info("不能被您欢真是遗憾！")
    } else {
      FAV.add(data);
      // TOAST.success("很高兴能得到您的喜欢！")
    }
    this.setData({
      IS_LIKED: !IS_LIKED
    })
  },

  // 分享
  shareHandler: function (e) {
    vPush.add(e);

    // 如果已经生成了，那么就显示
    if (this.SHARE_IMG) {
      return wx.previewImage({
        urls: [this.SHARE_IMG],
      })
    }
    TOAST.info('生成图片后长按保存分享！');
    wx.showLoading({
      title: '生成图片中',
      mask: true
    });

    var ctx = wx.createCanvasContext('shareCanvas', this);
    // ctx.save();
    ctx.drawImage('/assets/share_tpl@2x.jpg', 0, 0, 414, 736);
    // ctx.draw();

    // 下载图片地址
    var { img_url, content, text_authors } = this.data.data;
    wx.getImageInfo({
      src: img_url.replace('http://image.wufazhuce.com', 'https://weapp.safedog.cc'),
      success: res => {
        // 写入canvas
        // var ctx = wx.createCanvasContext('shareCanvas', this);
        ctx.drawImage(res.path, 0, 0, 414, 276);

        //作者
        ctx.setFontSize(20);
        ctx.setFillStyle('#666666');
        ctx.fillText('@'+text_authors, 20, 350);
        // 文字
        ctx.setFontSize(20);
        ctx.setFillStyle("#333333");
        ctx.setLineWidth(1);
        var titleHeight = 10;
        var canvasWidth = 370;
        var initHeight = 400;

        function drawText(ctx, str, initHeight, titleHeight, canvasWidth) {
          var lineWidth = 0;
          var lastSubStrIndex = 0; //每次开始截取的字符串的索引
          for (let i = 0; i < str.length; i++) {
            lineWidth += ctx.measureText(str[i]).width;
            if (lineWidth > canvasWidth) {
              ctx.fillText(str.substring(lastSubStrIndex, i), 15, initHeight);//绘制截取部分
              initHeight += 30;//20为字体的高度
              lineWidth = 0;
              lastSubStrIndex = i;
              titleHeight += 30;
            }
            if (i == str.length - 1) {//绘制剩余部分
              ctx.fillText(str.substring(lastSubStrIndex, i + 1), 15, initHeight);
            }
          }
          // 标题border-bottom 线距顶部距离
          titleHeight = titleHeight + 10;
          return titleHeight
        }

        titleHeight = drawText(ctx, content, initHeight, titleHeight, canvasWidth);

        ctx.stroke();

        ctx.draw();

        // 导出图片
        setTimeout(() => {
          wx.hideLoading();

          wx.canvasToTempFilePath({
            canvasId: 'shareCanvas',
            x: 0,
            y: 0,
            width: 414,
            height: 736,
            success: ret => {
              this.SHARE_IMG = ret.tempFilePath;
              // 判断是否是第一次分享，如果是，则显示帮助分享图片，否则只显示分享图片
              var urls = [ret.tempFilePath];
              var IS_FIRST_SHARE = parseInt(wx.getStorageSync('share_count') || 0);
              if (IS_FIRST_SHARE < 3) {
                urls.push('https://i.loli.net/2018/07/09/5b4341c50063e.jpg');
                wx.setStorageSync('share_count', IS_FIRST_SHARE + 1);
              }

              wx.previewImage({
                urls
              });
            }
          }, this)
        }, 1000);
      },
      fail: err => {
        console.warn(err)
      }
    })
  }
})