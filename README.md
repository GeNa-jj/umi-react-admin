# 基于umi、dva和antd响应式后台模版

## 目录结构
```
.
├── mock                 // mock 文件所在目录，基于 express
├── package.json
├── public               // favicon.ico
├── .env                 // 环境变量
├── .umirc.js            // umi 配置，包括路由
├── src
│   ├── app.js           // 运行时的配置文件  
│   ├── assets           // 本地静态资源 
│   ├── components       // 业务组件
│   ├── global.less      // 约定的全局样式文件，自动引入
│   ├── layouts          // 全局布局
│   ├── models           // use umi with dva (redux)
│   ├── pages            // 页面目录
│   │   ├── home         // 首页 
│   │   └──document.ejs  // html页面
│   ├── services         // 请求
│   └── utils            
├── webpack.config.js
└── yarn.lock

```

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8000
yarn start

# build for production with minification
yarn build
```

## 使用技术
> [umi](https://umijs.org/zh/guide/) + [dva](https://dvajs.com/guide/) + [antd](https://ant.design/index-cn)

1. 🚀 umi，是一个可插拔的企业级 react 应用框架，以路由为基础的，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。

2. 🌱 dva，是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

3. 🍁 antd，是一个基于 react 的 UI 组件库。
