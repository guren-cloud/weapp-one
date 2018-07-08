/**
 * 喜欢/收藏模块
 */

class Like {
  constructor () {
    this.CACHE = [];
    this.KEY = 'favorited/data';

    this.init();
  }

  init () {
    var cache = wx.getStorageSync(this.KEY);
    try {
      this.CACHE = JSON.parse(cache);
    } catch (err) {}
  }

  /**
   * 添加收藏
   */
  add (item) {
    this.CACHE.push(item);
    wx.setStorageSync(this.KEY, JSON.stringify(this.CACHE));
  }

  /**
   * 取消收藏
   */
  del (id) {
    var new_data = [];
    this.CACHE.map(cache => {
      if (cache.id === id) return;
      new_data.push(cache);
    });
    this.CACHE = new_data;
    wx.setStorageSync(this.KEY, JSON.stringify(new_data));
  }

  /**
   * 检查是否已经喜欢
   */
  check (id) {
    var isLiked = false;
    this.CACHE.map(cache => {
      if (cache.id === id) isLiked = true;
    });

    return isLiked;
  }
}

module.exports = Like;