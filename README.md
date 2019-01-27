# 一ONE小程序

> 开源版本：v2
> https://mssnn.cn

## 简介
开源的第三方一个图文小程序，每天为你推送一张精美的照片和文字。    
复杂的世界里，一个就够了。

## 配置域名
小程序需要连接后端数据API+vPush推送API域名，所以需要在微信公众平台设置request域名。    
首先，你需要开通vpush推送平台，请输入：[https://你的小程序appId.mssnn.cn](https://你的小程序appId.mssnn.cn)进行注册登陆古人云小程序控制台。   
然后，进入[微信公众平台](https://mp.weixin.qq.com)，进入到开发设置，设置域名，request里边填入如下配置：

- https://one.mssnn.cn
- https://你的小程序appId.mssnn.cn

## 配置小程序
小程序，只需要你在`app.js`里配置好vpush即可。 
很简单！点击`app.js`进行编辑，然后在vPush的初始化操作里，输入你的小程序appId即可!

![]()