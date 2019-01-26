Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    // 是否显示返回按钮
    goBack: {
      type: Boolean,
      value: false
    },
    // 深色模式（图标标题白色）
    dark: {
      type: Boolean,
      value: false
    },
    // 背景颜色
    bgColor: String,
    // 底部border
    borderBottom: String,
    shadow: String,
    leftIcon: String,
    leftHandler: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    STATUSBAR_HEIGHT: wx.getSystemInfoSync().statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBackHandler: function () {
      // 如果只有一个页面，则返回主页
      if (getCurrentPages().length === 1) {
        return wx.reLaunch({
          url: '/pages/home/index',
        })
      }
      wx.navigateBack({})
    },
    // 需要在父组件：bindlefthandler
    onLeftHandler: function () {
      this.triggerEvent('lefthandler', {}, {})
    }
  }
})