# vPush
> 专业高效实用的微信小程序推送平台

## 文档
详细文档请登陆开发者后台，点击左侧的推送文档即可。    
[https://dev.vpush.cloud](https://dev.vpush.cloud)

## 配置
后台创建应用后，复制ID，编辑`config.js`文件，填写`id`变量即可。   

**域名：** 登陆微信开发者后台，设置添加一个request域名：

~~https://vpush2.safedog.cc~~ （旧接口，请勿使用）

> https://cloud.safedog.cc


## 使用
微信小程序页面`.json`配置文件加入组件的引用：
``` json
{
  "usingComponents": {
    "vpush-view": "/libs/vpush/view"
  }
}
```
然后就可以在页面中进行使用了：
``` wxml
<vpush-view>
  <view>
    <text>点击我即可自动收集推送凭证</text>
  </view>
</vpush-view>
```

## 帮助
如果您在使用的过程中有不明白的地方，可以加入我们的星球寻求最精准的解决方案：

![](https://dev.vpush.cloud/dist/assets/zsxq_qr.png)