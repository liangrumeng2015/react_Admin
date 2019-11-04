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

## 高阶函数、高阶组件
`高阶函数`：
（1）接受函数类型的参数、返回值是函数
（2）eg：
    定时器：setTimeout、setInterval()、
    Promise：Promise(()=>{})  then(()=>{})
    数组遍历：forEach()、filter()、map()、reduce()、find()、findIndex()
    函数对象的bind()
    Form.create()()  /  getFieldDecorator()()
（3）高阶函数更新动态、更加具有扩展性。

`高阶组件`：
（1）本质就是一个函数
（2）接收一个组价（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性。
（3）作用：扩展组件的功能。
(4)eg:
    包装Form组件生成一个新的组件：Form(Login)
    新组件会向Form组件传递一个强大的对象属性：form
    const WrapLogin = Form.create()(Login)
(5)高阶组件也是高阶函数：接收一个组件函数，返回是一个新的组件函数。

## 前台表单验证
(1)声明式实时表单验证
form.getFieldDecorator('标示名称',{rules:[{}]})(<Input />)

(2)自定义表单验证：
form.getFieldDecorator('标示名称',{rules:[validator:this.validatorPwd]})(<Input />)
validatorPwd=(rule,value,callback)=>{
    callback()  // 成功
    callback('xxx')   // 验证失败
}

(3)点击提交时，统一验证
form.validateFields((err,values)=>{
    if(!err){
        console.log('成功',values)
    }else{
        console.log('失败');
    }
})

## 数据请求
`axios`

## 跨域：
端口、协议、域名  三个必须一致
`解决办法`：
（1）jsonp，但是只能处理get请求
（2）让后台允许跨域。
（3）使用代理，启动代理服务器 [ 转发请求 ]   "proxy":"http://localhost:5000"

## async 和 await
(1)作用是什么?
    简化promise对象的使用：不用在使用.then()来指定成功和失败的函数
    以同步编码（没有回调函数了）方式实现异步流程
(2)哪里写await？
    在返回promise的表达式的左侧写await，不想要promise，想要promise异步执行成功的value数据。
(3)哪里写async？
    await所在函数最近的左侧写async。

## 路由跳转
this.props.history.push()   #需要回退的话，用push
this.props.history.replace()   #不需要回退回来
this.props.history.go()

