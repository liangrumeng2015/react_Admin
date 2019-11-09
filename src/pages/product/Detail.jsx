/**
 * product 的详情页子路由
 */
import React ,{Component} from 'react';
import {Card,Icon,List} from 'antd'
import { LinkButton } from '../../components/link-button';
const Item = List.Item;

class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            cName1:'',   // 一级分类名称
            cName2:''  // 二级分类名称
        }
    }
    render(){
        // 接收携带过来的参数：
        const {name,desc,price} = this.props.location.state.product;

        const title = (
            <span>
                <LinkButton>
                    <Icon type="arrow-left" 
                        style={{color:'green',marginRight:'15px',fontSize:'20px'}}
                        onClick={()=>this.props.history.goBack()}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return(
            <div className="product-detail">
               <Card title={title} bordered>
                    <Item>
                        <span className="left">商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格：</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span>联想 ---->Thinkpad</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        <span className="product-img">
                            <img src="https://www.baidu.com/favicon.ico" alt=""/>
                            <img src="https://www.baidu.com/favicon.ico" alt=""/>
                            <img src="https://www.baidu.com/favicon.ico" alt=""/>

                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:'<h1>商品详情的内容</h1>'}}></span>
                    </Item>
               </Card>
            </div>
        )
    }
}
export default Detail;