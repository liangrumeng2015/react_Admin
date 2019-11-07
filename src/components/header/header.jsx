import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';
import './header.less'
import formateDate from '../../utils/dateUtils'
import {reqGetWeather} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import {LinkButton} from '../link-button/index'
/**
 * 顶部导航组件
 */
class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentTime:formateDate(Date.now()),   // 当前时间字符串
            weatherStatus:'',  // 天气状态
            weatherPic:''   // 天气图片【暂无】
        }
    }
    /**
     * 获取当前时间
     */
    getTime = () =>{
        this.intervalId = setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    /**
     * 获取天气数据
     */
    getWeatherData = async () =>{
        let data = {
            version:'v1',
            city:'北京'
        }
        console.log('getWeatherData')
        const result = await reqGetWeather(data)
        this.setState({
            weatherStatus:result.body.data[0].wea
        })
    }
    /**
     * 获取标题
     */
    getTitle = () =>{
        // 获取当前路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach((item)=>{
            if(item.key === path){
                title = item.title;
            }else if(item.children){
                // 在children 子item中查找匹配
                const cItem = item.children.find((cItem)=>cItem.key === path)
                if(cItem){
                    title = cItem.title;
                }
            }
        })
        return title
    }
    /**
     * 退出登录
     */
    logOut = () =>{
        Modal.confirm({
            content: '确定要退出登录？',
            okText:'确定',
            cancelText:'取消',
            onOk:() => {
                // 清除登录数据
                storageUtils.removeUser();
                memoryUtils.user = {}
                // 跳转
                this.props.history.replace('/login')
            },
            onCancel:() =>{
                console.log('Cancel');
            },
        })
    }
    /**
     * 第一次render之后执行，一般在此执行异步操作:ajax请求，启动定时器
     */
    componentDidMount(){
        this.getTime();
        this.getWeatherData();
    }
    /**
     * 当前组件卸载之前调用
     */
    componentWillUnmount(){
        // 清除定时器
        clearInterval(this.intervalId)
    }
    render(){
        const {currentTime,weatherStatus} = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle();   // 取到title的值
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                    {/* <span onClick={this.logOut} className="link-button">退出</span> */}
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="" />
                        <span>{weatherStatus}</span>
                    </div>
                </div>

            </div>
        )
    }
}
// export default Header;
export default withRouter(Header);