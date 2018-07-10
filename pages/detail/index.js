// pages/detail/index.js
var INFO = wx.getSystemInfoSync();
var { vPush, FAV, API } = getApp();
var weToast = require('../../libs/weToast/weToast.js');
var TOAST;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    date: [],
    // _item: '',
    LOADING: true,
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
    // 如果有optios.item，则显示Item，否则加载options.id
    new Promise(RES => {
      if (options.item) {
        return RES(JSON.parse(decodeURIComponent(options.item)));
      } else if (options.id) {
        API.getDataById(options.id).then(RES);
      } else if (options.scene) {
        API.getDataById(options.scene).then(RES);
      }
    }).then(item => {
      this.setData({
        data: item,
        date: item.date.split(' / '),
        // _item: encodeURIComponent(item),
        IS_LIKED: FAV.check(item.id),
        HEIGHT: wx.getSystemInfoSync().windowHeight,
        IS_SHARE_PAGE: getCurrentPages().length === 1
      });
      setTimeout(() => this.setData({ LOADING: false }), 500);
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
      path: '/pages/detail/index?id=' + this.data.data.id
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
    var IS_FIRST_SHARE = parseInt(wx.getStorageSync('share_count') || 0);
    if (IS_FIRST_SHARE < 3) {
      TOAST.info('生成图片后长按保存分享！');
    }
    wx.showLoading({
      title: '生成图片中',
      mask: true
    });

    var ctx = wx.createCanvasContext('shareCanvas', this);
    // ctx.save();
    ctx.drawImage('/assets/share_tpl2@2x.png', 0, 0, 414, 736);
    // ctx.draw();

    var {
      id, img_url, content, date,
      text_authors, picture_author
    } = this.data.data;
    new Promise(RES => {
      // 下载图片
      wx.getImageInfo({
        src: img_url.replace('http://image.wufazhuce.com', 'https://weapp.safedog.cc'),
        success: ret => {
          ctx.drawImage(ret.path, 0, 0, 414, 276);
          // 渲染模板图片
          ctx.drawImage('/assets/box@2x.png', 0, 174, 414, 562);
          RES();
        }
      })
    }).then(() => new Promise(RES => {
      // 下载动态二维码
      wx.getImageInfo({
        src: 'https://vpush.safedog.cc/qrcode/1one/' + id,
        success: ret => {
          // 渲染二维码
          ctx.drawImage(ret.path, 167, 618, 80, 80);
          RES();
        }
      })
    })).then(() => new Promise(RES => {
      // 绘制文字

      // 文字
      /**
       * 渲染主体内容思路：
       * 
       * 首先，通过\r\n进行分割，获取到每一行。
       * 然后，每一行进行每20*30个方格的计算，多出来的换到下一行，不满足的用空格填充
       * 综上，一共获取到前三行（换行过长算作下一行）—
       */


      // 一行多少字
      var NUMBER_OF_LINE = 15;
      // 每个字多宽
      var FONT_WIDTH = 22;
      // 1. 进行分割，获取前三行
      var c_temps = content.split('\r\n');
      var line_counts = 0;
      // 如果超过三行，那么只取前三行
      if (c_temps.length > 3) {
        c_temps = c_temps.slice(0, 3);
      }

      for (var i in c_temps) {
        var c_data = c_temps[i];
        // 计算要换多少行
        var c_lines = parseInt(c_data.length / NUMBER_OF_LINE) + 1;
        for (var j = 0; j < c_lines; j++) {
          startDraw(c_data.slice(j * NUMBER_OF_LINE, (j + 1) * NUMBER_OF_LINE), line_counts);
          line_counts++;
        }
      }

      // 开始绘制文字
      // text绘制的文字，line在第几行
      function startDraw(text, line) {
        // 如果line > 3，则忽略
        // 因为line从0开始
        // 如果最后一行，并且文字还是那么多，那么就省略号代替
        if (line === 2 && text.length === NUMBER_OF_LINE) {
          text = text.slice(0, 13) + '..';
        } else if (line > 2) {
          return;
        }
        var y = 450 + (line * 35); // 200为文字初始y坐标
        console.log('[draw]', text, y);
        ctx.setFontSize(20);
        ctx.setTextAlign('center');
        ctx.setFillStyle('#333333');
        for (var i in text) {
          var t = text[i];
          // 开始绘制
          ctx.fillText(t, 50 + (i * FONT_WIDTH), y);
        }
      }

      // 摄影
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setFillStyle('#888888');
      ctx.fillText(picture_author, 414 / 2, 260);

      //作者
      ctx.setFontSize(16);
      ctx.setTextAlign('center');
      ctx.setFillStyle('#999999');
      ctx.fillText(text_authors, 414 / 2, 590);

      // 时间
      var dates = date.split(' / ');
      // 日
      ctx.setFontSize(60);
      ctx.setTextAlign('center');
      ctx.setFillStyle('#666666');
      ctx.fillText(dates[2], 414 / 2, 350);
      // 月
      ctx.setFontSize(18);
      ctx.setTextAlign('center');
      ctx.setFillStyle('#999999');
      ctx.fillText(dates[1] + ' / ' + dates[0], 414 / 2, 390);


      ctx.stroke();

      ctx.draw();

      setTimeout(() => RES(), 1000);
    })).then(() => {
      // 导出图片
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
          if (IS_FIRST_SHARE < 3) {
            urls.push('https://i.loli.net/2018/07/09/5b4341c50063e.jpg');
            wx.setStorageSync('share_count', IS_FIRST_SHARE + 1);
          }

          wx.previewImage({
            urls
          });
        }
      }, this)
    });
  }
})