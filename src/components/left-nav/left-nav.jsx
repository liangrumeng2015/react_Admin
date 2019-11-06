import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import './left-nav.less';
import logo from '../../assets/images/favicon.ico'
import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
class LeftNav extends Component {
    /**
     * 根据menu的数据数组生产对应的标签数组
     * 使用map() +递归调用
     */
    getMenuNodes_map = (menuList) =>{
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                    {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    getMenuNodes_reduce = (menuList) =>{
        // 得到当前路由路径
        const path = this.props.location.pathname;
        console.log('path===',path);

        return menuList.reduce((pre,item)=>{
            // 向pre中添加<Mene.Item> 或 <SubMenu>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{
                // 查找一个与当前请求路径匹配的子item
                const cItem = item.children.find((cItem)=>cItem.key === path)
                // 存在，说明当前对于的子列表需要展开
                if(cItem){
                    this.openKey = item.key;
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                    {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    // 第一次render()之前执行一次，为第一次render()准备数据，必须是同步的
    componentWillMount(){  
        this.menuNodes = this.getMenuNodes_reduce(menuList)
    }
    render() {
        // 得到当前路由路径
        const path = this.props.location.pathname;
        console.log('path===',path);
        // 得到需要打开菜单项的key
        const openKey = this.openKey;
        return (
            <div>
                <div className="left-nav">
                    <Link to="/" className="left-nav-top">
                        <img src={logo} alt={logo} />
                        <h1>后台管理</h1>
                    </Link>
                </div>
                <Menu
                    // defaultSelectedKeys={['/home']}
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        // this.getMenuNodes_map(menuList)
                        // this.getMenuNodes_reduce(menuList)
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}
// export default LeftNav;
/**
 * withRouter高阶组件，保包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性，history/location/match
 */
export default withRouter(LeftNav)