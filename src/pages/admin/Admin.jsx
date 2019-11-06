import React ,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        const user = memoryUtils.user;
        if(!user){
            // 自动跳转到登录页面
            return <Redirect to="/login" />
        }
        return(
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{background:'#fff'}}>Content</Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>版权所有，xxxx</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default Admin;