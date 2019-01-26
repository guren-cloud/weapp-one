// components/one/page.js

var TOUCH_START = 0;
var TOUCH_END = 0;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: String,
    title: String,
    content: String,
    pic_author: String,
    txt_author: String,
    date: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    SHOW_DATA: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function () {
      wx.previewImage({
        urls: [this.data.image],
      });
    },
    toggleData: function () {
      this.setData({
        SHOW_DATA: !this.data.SHOW_DATA
      });
    },

    touchStart: function (e) {
      TOUCH_START = e.changedTouches[0].clientY;
    },
    touchEnd: function (e) {
    },
    touchMove: function (e) {
      // 如果是两个手指
      if (e.changedTouches.length > 1) return this.twoTouchMove(e);
      TOUCH_END = e.changedTouches[0].clientY;
      // 判断数值
      let IS_TOP = (TOUCH_START - TOUCH_END) > 0;
      let MOVE_NUM = Math.abs(TOUCH_START - TOUCH_END);
      if (MOVE_NUM < 100) return;
      // 如果向上，并且没有显示
      let SHOW_DATA = !!this.data.SHOW_DATA;
      if (IS_TOP && !SHOW_DATA) {
        this.setData({
          SHOW_DATA: true
        })
      }
      if (!IS_TOP && SHOW_DATA) {
        this.setData({
          SHOW_DATA: false
        })
      }
    },

    twoTouchMove: function (e) {
      TOUCH_END = e.changedTouches[0].clientY;
      // 判断数值
      let IS_TOP = (TOUCH_START - TOUCH_END) > 0;
      let MOVE_NUM = Math.abs(TOUCH_START - TOUCH_END);
      if (MOVE_NUM < 100) return;

      this.triggerEvent(IS_TOP ? 'twoTop' : 'twoBottom', {}, {});
    }
  }
})
