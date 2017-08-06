![](http://upload-images.jianshu.io/upload_images/959455-f182a26dbe2201da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>接口来自[知乎日报 API 分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

# 一、 构建工具
使用[weexpack](https://www.npmjs.com/package/weexpack)构建 [weex](https://weex-project.io/cn/) 项目十分方便

>weexpack 命令介绍
weexpack 所提供的命令大致可分为三组，分别是：
> * 打包命令
>weexpack create — 创建 weex 工程项目。
>weexpack platform add/remove — 安装／移除 weex 应用模版，默认模版支持 weex bundle 调试和插件机制。
>weexpack platform list — 查看已安装的平台模版及版本。
>weexpack platform run - 打包应用并安装到设备运行。
> * 插件使用者命令
>weexpack plugin add/remove — 安装／移除 weex 插件。
> *  插件开发者命令
>weexpack plugin create - 生成weex插件模版，主要是配置文件和必需的目录。
>weexpack plugin publish - 发布插件到weex插件市场。
>

⚠️使用[weexpack](https://www.npmjs.com/package/weexpack)构建的项目要注意一点：
-
在Android 机器上不支持 ES6语法，虽然项目构建的时候已经集成了 [bable](http://babeljs.io/) 的 [NPM]()包来将ES6转换成ES5的语法。但是还需要在项目的根目录手动添加`.babelrc`文件，文件里的具体代码如下：

```
{
"presets": [
["env", {
"modules": false,
"targets": {
"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
}
}],
"stage-2"
],
"plugins": ["transform-runtime"],
"env": {
"test": {
"presets": ["env", "stage-2"],
"plugins": ["istanbul"]
}
}
}

```
❓为什么没有用[weex-toolkit](http://weex.apache.org/cn/guide/tools/toolkit.html)
-
>weex-toolkit 初始化的项目是针对开发单个 Weex 页面而设计的，也就是说这样的项目只包括单个页面开发需要的东西，比如前端页面源文件、webpack 配置、npm 脚本等。项目产生的输出就是一个 JS Bundle 文件，可以自由的进行部署。
>weex-pack 是初始化一个完整的 App 工程，包括 Android 和 iOS 的整个 App 起步，前端页面只是其中的一部分。这样的项目最终产出是一个 Android App 和一个 iOS App。

如果你不用weexpack来打包的话，[weex-toolkit](https://github.com/weexteam/weex-toolkit)可以替代weexpack来构建应用。[weex-toolkit](https://github.com/weexteam/weex-toolkit)集成对weexpack的命令调用支持，你可以使用[weex-toolkit](https://github.com/weexteam/weex-toolkit)命令来实现weexpack具备的功能。

# 二、项目效果

![iOS.gif](http://upload-images.jianshu.io/upload_images/959455-37048249420a4cb4.gif?imageMogr2/auto-orient/strip)

![android.gif](http://upload-images.jianshu.io/upload_images/959455-f575ff4bf9773b6b.gif?imageMogr2/auto-orient/strip)

只写了一个雏形，本来准备把详情页面也写一下的，发现详情接口的网页数据是 json 格式返回的 HTML 源码，而 weex 封装的 [web](http://weex-project.io/cn/references/components/web.html) 组件并没有暴露Native的`loadHTML`API，就没写了。
源码：https://github.com/yuan-gao/zhihuDaily
```
//安装依赖
npm installl

//运行 iOS
weex run ios

//运行 Android
weex run android
```
Web 端因为 js 跨域问题，`run` 的时候应该看不到效果。

# 三、结语
要完全使用[weex](https://weex-project.io/cn/) 来完成一个项目（Android+iOS+Web），**write once run everywhere**几乎不可能，除非项目的逻辑和交互都非常简单。因为使用[weex](https://weex-project.io/cn/)的功能有限，稍微复杂一点的需求就需要和 Native 端交互，虽说[weex](https://weex-project.io/cn/)团队提供了[Module 扩展](http://weex-project.io/cn/references/advanced/extend-to-ios.html),但是使用[Module 扩展](http://weex-project.io/cn/references/advanced/extend-to-ios.html)的前提是开发人员至少具备开发完整 Native 端应用的能力。
✅对大厂来说，可以不在乎开发人员的成本，追求产品快速迭代，将整个项目的 jsBundle 部署在服务器。
❎对初创公司来说，请一个即能开发 Android和 iOS 端 Native 应用的开发人员来开发 Weex 应用，所花的成本估计也并不比养两个开发 Android 和 iOS 的人员低，而且这种人也难找。
✅对开发人员来说，可以不用学习Native端知识就能开发一个跨平台的 APP，非常棒。
✅从产品的角度来说，既想频繁变更需求，又想要原生的体验，部分页面使用 Weex 是个不错的选择。

最后安利一个非常棒的 weex插件库：[Nat.js](https://github.com/natjs/nat)
