/**
 * product 默认的子路由界面
 */
import React ,{Component} from 'react';
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import {LinkButton} from '../../components/link-button'
import {reqGetProductList,reqSearchProduct} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constants'
const Option = Select.Option;

class ProductHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            products:[],   // 商品的数组
            total:0,   // 总页数
            loading:false,
            productTxt:'',   // 搜索的关键字
            searchType:'1'   // 默认按照名称搜索
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
                            <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
          ];
    }

    /**
     * 获取产品列表
     */
    getProductList = async (pageNum) =>{
        
        const {searchType,productTxt} = this.state;
        let result,param;
        if(productTxt){
            param = {
                searchType:searchType,
                productTxt:productTxt,
                pageNum: pageNum,
                pageSize:PAGE_SIZE,
            }
            result =  await reqSearchProduct(param);
        }else{
            param = {
                pageNum: pageNum,
                pageSize:PAGE_SIZE
            }
            result = await reqGetProductList(param);
        }
        this.setState({
            loading:true
        })
        if(result.success){
            const {total,list} = result.data
            this.setState({
                total:total || '',
                products:list,
                loading:false
            })
        }
    }

    componentWillMount(){
        this.initColumns();
    }
    componentDidMount(){
        this.getProductList(1)
    }
    render(){
        // 取出数据
        const {products,total,loading,searchType,productTxt} = this.state;
        const title = (
            <span>
                <Select 
                    value={searchType} 
                    style={{width:'150px'}} 
                    onChange={(value)=>this.setState({searchType:value})}
                >
                    <Option value="1">按名称搜索</Option>
                    <Option value="2">按描述搜索</Option>
                </Select>
                <Input 
                    placeholder="关键字" 
                    style={{width:'150px',margin:'0 15px'}} 
                    value={productTxt}
                    onChange={(event)=>this.setState({productTxt:event.target.value})}
                    onPressEnter={()=>{this.getProductList(1)}}
                />
                <Button type="primary" onClick={()=>this.getProductList(1)}>搜索</Button>
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
                        loading={loading}
                        bordered
                        rowKey='_id'
                        dataSource={products} 
                        columns={this.columns} 
                        pagination ={{
                            defaultPageSize:PAGE_SIZE,
                            showQuickJumper:true,
                            total,
                            onChange:this.getProductList
                        }}
                    />
                </Card>
            </div>
        )
    }
}
export default ProductHome;