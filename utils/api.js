Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(),    //day
    "h+": this.getHours(),   //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}

class API {
  constructor () {
    this.KEY = 'DATAS';
    this.API = 'https://api.hibai.cn/api/index/index';
  }

  /**
   * 解析数据格式
   */
  formatData (data) {
    var new_data = [];
    data.map(function (d) {
      new_data.push({
        id: d.id,
        title: d.vol,
        img_url: d.img_url,
        picture_author: d.img_kind + ' | ' + d.img_author,
        date: d.date.split(' ')[0].replace(/-/g, ' / '),
        content: d.word,
        text_authors: d.word_from
      })
    });
    return new_data;
  }

  /**
   * 获取数据
   */
  getData () {
    return new Promise((RES, REJ) => {
      // 获取缓存
      var HAS_CACHE = this.getCache();
      if (HAS_CACHE !== false) return RES(HAS_CACHE);
      // 请求数据
      wx.request({
        url: this.API,
        method: 'POST',
        dataType: 'json',
        data: {
          'TransCode': '030112',
          'OpenId': '123456789',
          'Body': ''
        },
        success: ret => {
          var datas = this.formatData(ret.data.Body);
          // 存储缓存
          wx.setStorageSync(this.KEY, datas);
          RES(datas);
        },
        fail: REJ
      })
    });
  }

  /**
   * 获取本地缓存
   */
  getCache () {
    var datas = wx.getStorageSync(this.KEY);
    if (!datas) return false;
    // 判断时间
    var data = datas[0];
    if (data.date === new Date().format('yyyy / MM / dd')) return datas;
    return false;
  }

  /**
   * 根据ID获取单条数据
   * 如果不存在，则重新获取
   */
  getDataById (id) {
    return new Promise((RES, REJ) => {
      this.getData().then(datas => {
        var data = {};
        datas.map(d => {
          if (d.id === parseInt(id)) data = d;
        });
        return RES(data);
      })
    })
  }
}

module.exports = new API();