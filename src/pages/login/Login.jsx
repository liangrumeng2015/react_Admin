import React, { Component } from 'react'
import { Form, Icon, Input, Button,message } from 'antd';
import {reqLogin} from '../../api'
import logo from './images/favicon.ico'

import './login.less'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    handleSubmit=(event)=>{
        // 阻止事件的默认行为
				event.preventDefault();
				
				this.props.form.validateFields(async (err, values) => {
					if (!err) {
                        console.log('提交表单的数据请求',values);
                        let data = {
                            username:values.username,
                            password:values.password
                        }
                        // reqLogin(data).then((res)=>{
                        //     console.log('reqLogin请求结果',res.data);
                        // }).catch((error)=>{
                        //     console.log(error)
                        // })
                        const result = await reqLogin(data);   // await和async一起使用。async写在await所定义的函数的左侧。
                        console.log('reqLogin请求成功',result);
                        if(result.status === 0){
                            message.success('登录成功')
                            // 跳转
                            this.props.history.replace('/');
                        }else{
                            message.error(result.msg)
                        }
					}else{
						console.log('验证失败')
					}
				});

        // // 得到form对象
        // const form = this.props.form;
        // const values = form.getFieldsValue();
        // console.log('得到表单里面提交的值：',values);
		}
		// 对密码进行自定义验证，callback必须被调用
		//  callback()  验证通过    callback('xxx')  验证失败，并指定提示的文本
		validatorPwd=(rule, value, callback)=>{
			console.log(rule,value)
			if(!value){
				callback('密码必输');
			}else if(value.length <= 4){
				callback('密码长度不能小于4')
			}else if(value.length >= 12){
				callback('密码的长度不能大于12')
			}else if(!/^[a-zA-Z0-9_]+$/.test(value)){
				callback('密码必须是英文、数字、或下划线组成')
			}else{
				callback();   // 验证通过
			}
		}
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目后台管理系统</h1>
                </header>
                <div className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
											{/* 
												校验规则：
												（1）必须输入
												（2）>=4 且 <=12
												（3）必须是英文、数字、或下划线组成。
											*/}
                        <Form.Item>
                            {
                                getFieldDecorator('username',{
																	// 声明式验证
																	rules: [
																		{ required: true, message: '用户名必须输入' },
																		{ min: 4, message: '用户名最少4位' },
																		{ max: 12, message: '用户名不能超过12位' },
																		{ pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字、或下划线组成'}
                                  ],
                                  initialValue:'admin'   // 指定初始值
																})(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
																	rules:[
																		{validator:this.validatorPwd}
																	]
																})(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
// export default Login;
const WrapLogin = Form.create()(Login)
export default WrapLogin