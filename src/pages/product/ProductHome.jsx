/**
 * product 默认的子路由界面
 */
import React ,{Component} from 'react';
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import {LinkButton} from '../../components/link-button'
const Option = Select.Option;

class ProductHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            products:[
                {
                    status:'1',   // 商品状态  在售1   已下架0
                    imgs:[

                    ],
                    _id:'',
                    name:'联想电脑',
                    desc:'描述',
                    price:66666,
                    pCategoryId:'',
                    categoryId:'',
                    detail:'',
                    _v:0
                }
            ],   // 商品的数组
        }
    }
    /**
     * 初始化table的列
     */
    initColumns = () =>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price)=>'￥' + price    // 当前指定了对应的字段属性，传入的是对应的属性值
            },
            {
                width:'100px',
                title: '状态',
                dataIndex: 'status',
                render:(status)=>{
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width:'100px',
                title: '操作',
                render:(product)=>{
                    return(
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
          ];
    }
    componentWillMount(){
        this.initColumns();
    }
    render(){
        // 取出数据
        const {products} = this.state;
        const title = (
            <span>
                <Select value="0" style={{width:'150px'}}>
                    <Option value="0">按名称搜索</Option>
                    <Option value="1">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{width:'150px',margin:'0 15px'}} />
                <Button type="primary">搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary">
                <Icon type="plus"></Icon>
                添加商品
            </Button>
        )
                 
        return(
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                        bordered
                        rowKey='_id'
                        dataSource={products} 
                        columns={this.columns} 
                    />
                </Card>
            </div>
        )
    }
}
export default ProductHome;