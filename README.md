# 一ONE
> 每天为你提供一张精美的图片和文字。    
> 复杂的世界里，一个就够了。    

**本小程序为第三方开源小程序，并非官方出品，代码仅开源提供学习交流。**     
**如果你打算修改这个小程序进行上架操作，请保留作者来源等信息，互相尊重，感谢支持**

# 古人云小程序
> 古人云小程序开发平台，解决微信小程序开发中的50%难点。    
> 本小程序中的推送系统、分享小程序码均使用这个平台，所以你可以注册添加应用后直接修改对应的配置即可正常使用。
> 官网：[https://guren.cloud](https://guren.cloud)

## 截图
![一ONE截图](https://i.loli.net/2018/07/10/5b44c4b461383.jpg)

## 配置
本项目需要做一些配置才能正常运行。    

1. 域名信息：request 合法域名，用于请求API和vPush-sdk    

- https://api.hibai.cn    
- https://cloud.safedog.cc

2. 下载域名：downloadFile 合法域名，用于下载图片生成分享图    

- https://weapp.safedog.cc    
- https://cloud.safedog.cc

![](https://i.loli.net/2018/09/15/5b9bdb91f08c6.png)

### 推送配置
在[古人云开发后台](https://dev.guren.coud)添加你的小程序之后，复制应用ID，然后编辑`/libs/vpush/config.js`中的`id`变量即可完成推送系统配置。

### 小程序码配置
编辑`/pages/detail/index.js`中的**下载动态二维码**代码（224行左右），修改`src`为你在[古人云开发后台](https://dev.guren.coud)中创建的动态码接口即可。

创建动态码配置：

- **接口类型**：`B`    
- **页面路径**： `pages/detail/index`
- 其他默认

![](https://i.loli.net/2018/09/14/5b9bda66991ea.png)


## 体验
微信中搜索[一ONE]    
或者直接扫描程序码：

![一ONE小程序码](https://i.loli.net/2018/06/19/5b28801446220.jpg)

## 帮助
> 如果你遇到了解决不了的问题，或者想一起研究探讨更多有意思的产品，以及小程序开发相关的任何帮助，都可以通过扫描下方二维码加入我们，获取专业的技术支持！

![](https://vpush.cloud/static/qr.png)