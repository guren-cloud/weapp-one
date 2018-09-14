var vPush = require('./_vpush.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    vPushHandler: function (e) {
      vPush.add(e);
      this.triggerEvent('clickHandler', e, {});
    }
  }
})
