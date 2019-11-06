import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './left-nav.less';
import logo from '../../assets/images/favicon.ico'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
class LeftNav extends Component {
    render() {
        return (
            <div>
                <div className="left-nav">
                    <Link to="/" className="left-nav-top">
                        <img src={logo} alt={logo} />
                        <h1>后台管理</h1>
                    </Link>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Icon type="mail" />
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="mail" />
                            <span>商品管理</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
export default LeftNav;