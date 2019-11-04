## react项目   一个管理后台项目
index.js 入口文件
App.js  应用的根组件
## 项目目录结构如下：
|--src
|-------api  ajax相关
|-------assets  公共资源
|-------components  非路由组件
|-------config  配置
|-------pages  路由组件
|-------utils  工具模块
|-------app.js  应用根组件
|-------index.js  入口js

## 按需引入加载css文件。
## 按需打包、自定义主题
[高级配置]：https://ant.design/docs/react/use-with-create-react-app-cn

## 更改配置文件的话，需要重新启动项目
npm start

## 安装路由 
`npm install react-router-dom --save`
`yarn add react-router-dom`

## 路由【查看官方文档】
BrowserRouter   【没有#的路由】

## 图片问题

## 高阶函数、高阶组件
const WrapLogin = Form.create()(Login)
export default WrapLogin