# 一ONE小程序

> 开源版本：v2    
> https://mssnn.cn

## 微信扫一扫体验
![](https://wx5bbe79dd056cb238.mssnn.cn/v2/api/vcode?id=18)

## 简介
开源的第三方一个图文小程序，每天为你推送一张精美的照片和文字。    
复杂的世界里，一个就够了。

![](https://i.loli.net/2019/01/27/5c4c8454c5e31.jpg)

## 配置域名
小程序需要连接后端数据API+vPush推送API域名，所以需要在微信公众平台设置request域名。    
首先，你需要开通vpush推送平台，请输入：[https://你的小程序appId.mssnn.cn](https://你的小程序appId.mssnn.cn)进行注册登陆古人云小程序控制台。   
然后，进入[微信公众平台](https://mp.weixin.qq.com)，进入到开发->开发设置，设置域名，request里边填入如下配置：

- https://one.mssnn.cn
- https://你的小程序appId.mssnn.cn

![](https://i.loli.net/2019/01/26/5c4c7e5ed9db0.jpg)

## 配置小程序
小程序，只需要你在`app.js`里配置好vpush即可。 
很简单！点击`app.js`进行编辑，然后在vPush的初始化操作里，输入你的小程序appId即可!

![](https://i.loli.net/2019/01/26/5c4c7d5e2f974.jpg)

## 定时推送
进入[古人云小程序开发平台](https://mssnn.cn)，然后创建任务脚本（nodejs），模块添加`superagent`，代码复制`server_push.js`文件内容，然后时根据情况去设置啦，保持默认就是每天早上09:10进行推送。

首先，创建一个推送API：
![](https://i.loli.net/2019/01/27/5c4d3f78c0631.jpg)

然后，在任务脚本里，添加模块：
![](https://i.loli.net/2019/01/27/5c4d2d2cbd8b4.jpg)

接着，粘贴代码：
> **注意：** 这里，我们需要把代码里的推送API地址+密钥，改成我们上边创建好的推送API

![](https://i.loli.net/2019/01/27/5c4d2d5746573.jpg)

最后，配置时间：
![](https://i.loli.net/2019/01/27/5c4d2d6aea63f.jpg)

创建完毕后，点击运行按钮，即可实现每天自动推送啦！！

## 其他问题
目前分享功能暂没完善，所以你可以参与项目一起开发。   
推送平台来自于：[古人云小程序](https://mssnn.cn)。

![](https://mssnn.cn/img/qr_gurenyun.jpg)