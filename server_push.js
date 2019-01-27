// 一ONE小程序：：每日推送脚本
// https://mssnn.cn
// 请替换推送API地址和密钥

const request = require('superagent');

new Promise(RES => {
  request
    .get("https://one.mssnn.cn/?act=latest")
    .then(ret => {
      RES(ret.body);
    })
}).then(data => {
  request
    .post("https://xxx.mssnn.cn/v2/api/vpush?id=") // 这里替换成你的推送API地址
    .set({
      "Content-Type": "application/json"
    })
    .send({
      "secret": "-", // 在这里替换成你的API密钥
      "path": "pages/home/index?scene=" + data.id,
      "data": [
        data.title,
        data.date,
        data.content
      ]
    })
    .end(() => {
      console.log('[pushed]', data.title);
    })
})