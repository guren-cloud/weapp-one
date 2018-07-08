/**
 * weToast
 * 微信小程序自定义通知信息模块
 * 作者：safe-dog
 * 网站：safedog.cc
 * 项目：https://github.com/safe-dog/weToast
 */

// 默认配置
var TOAST_CONFIG = {
  // 动画时间
  duration: 200,
  // 隐藏卡片时间
  delay: 2000,
  // 默认卡片背景颜色
  defaultBG: 'linear-gradient(-135deg, #B4EC51 0%, #429321 100%)',
  // 默认卡片阴影颜色
  defaultSHADOW: 'rgba(0,0,0,0.50)'
};

// 消息队列
var MSG_QUEUE = [];

// 是否正在显示
var IS_SHOW = false;

// 隐藏卡片时间器
var HIDDEN_TIMMER = null;

class weToast {
  /**
   * 初始化
   * page = Page对象(this)
   */
  constructor (page) {
    this.page = page;
    page.weToastHideHandler = this._hide.bind(this);

    // 配置动画
    const animation = wx.createAnimation({
      duration: TOAST_CONFIG['duration'],
      timingFunction: 'ease'
    });

    // 显示动画数据
    animation.bottom(100).opacity(1).scale(1).step();
    this._showAnimation = animation.export();

    // 隐藏动画数据
    animation.bottom(-100).opacity(0).scale(0).step();
    this._hideAnimation = animation.export();

    // 初始化数据
    this.setData({
      icon: '',
      title: '',
      content: '',
      boxBG: TOAST_CONFIG['defaultBG'],
      SHADOW: TOAST_CONFIG['defaultSHADOW'],
      animation: this._hideAnimation
    });
  }

  setData (opt) {
    this.page.setData({
      weToast: opt
    })
  }

  getData (key) {
    return this.page.data.weToast[key];
  }

  /**
   * 添加消息到队列
   * opt = {content, title, style}
   */
  _add (opt) {
    MSG_QUEUE.push({
      icon: opt['icon'],
      title: opt['title'],
      content: opt['content'],
      boxBG: opt['style'] || TOAST_CONFIG['defaultBG'],
      SHADOW: opt['shadow'] || TOAST_CONFIG['defaultSHADOW'],
      animation: this._showAnimation
    });
    // 如果没在显示，则显示
    if (!IS_SHOW) {
      this._show();
    }
  }

  /**
   * 显示消息
   */
  _show () {
    const msg = MSG_QUEUE.shift();
    if (!msg) return;

    this.setData(msg);
    IS_SHOW = true;

    HIDDEN_TIMMER = setTimeout(
      this._hide.bind(this),
      TOAST_CONFIG['delay'] + TOAST_CONFIG['duration']
    );
  }

  /**
   * 隐藏消息
   */
  _hide () {
    if (HIDDEN_TIMMER) {
      clearTimeout(HIDDEN_TIMMER);
    }
    this.setData({
      title: '',
      content: '',
      boxBG: this.getData('boxBG'),
      SHADOW: this.getData('SHADOW'),
      animation: this._hideAnimation
    });
    // 200ms后调用_show
    setTimeout(() => {
      IS_SHOW = false;
      this._show();
    }, TOAST_CONFIG['duration']);
  }

  /**
   * 成功消息
   */
  success (content, title = '') {
    this._add({
      title, content,
      icon: 'ok',
      style: 'linear-gradient(135deg, #B4EC51 0%, #429321 100%)',
      shadow: 'rgba(180, 236, 81, 0.5)',
    })
  }

  /**
   * 提示消息
   */
  info (content, title = '') {
    this._add({
      title, content,
      icon: 'info',
      style: 'linear-gradient(-45deg, #009EFD 0%, #77CDFF 100%)',
      shadow: 'rgba(0, 158, 253, 0.5)'
    })
  }

  /**
   * 警告消息
   */
  warning (content, title = '') {
    this._add({
      title, content,
      icon: 'attention',
      style: 'linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)',
      shadow: 'rgba(250, 217, 97, 0.5)'
    })
  }

  /**
   * 错误消息
   */
  error (content, title = '') {
    this._add({
      title, content,
      icon: 'cancel',
      style: 'linear-gradient(135deg, #F5515F 0%, #D63547 36%, #9F041B 100%)',
      shadow: 'rgba(245, 81, 95, 0.5)'
    })
  }

  /**
   * 设置卡片停留时间
   * 默认2000ms
   */
  setDelay (delay = 2000) {
    TOAST_CONFIG['delay'] = delay;
  }
}

module.exports = weToast;