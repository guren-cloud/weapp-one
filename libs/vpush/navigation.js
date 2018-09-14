var vPush = require('./_vpush.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoHandler: function (e) {
      vPush.add(e);
      // 跳转
      if (!this.data.url) return;
      wx.navigateTo({
        url: this.data.url,
      })
    }
  }
})
