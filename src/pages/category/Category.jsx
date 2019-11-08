/**
 * 
 */
import React, { Component } from 'react';
import { Card, Table, Icon, Button, message,Modal } from 'antd';
import {LinkButton} from '../../components/link-button'
import './category.less'
import {reqCategory,reqUpdateCategory,addCategory} from '../../api/index'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            category:[],   // 一级分类列表
            subCategory:[],   // 二级分类列表
            loading:false,    // 是否正在获取数据
            parentId:'0',   // 当前显示的分类的列表的分类id
            parentName:'',    // 当前分类名称
            showStatus:0   // 标识确认框、更新的确认框  是否显示  0:都是不显示  1 显示添加  2显示更新
        }
    }
    /**
     * 初始化table列的数据
     */
    initColumns = () =>{
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',   // 显示数据对应的属性名
            },
            {
                title: '操作',
                width:300,
                render: (category) => (   // 返回需要显示的
                    <div>
                        <LinkButton onClick={()=>this.showUpdate(category)}>修改分类</LinkButton>
                        {
                            this.state.parentId === '0'? <LinkButton onClick={()=> this.showSubCategory(category)}>查看子分类</LinkButton>:null
                        }
                        {/* 如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数，并传入数据 */}
                    </div>
                )
            }
        ];
    }

    /**
     * 显示指定一级分类对象的二级列表
     */
    showSubCategory = (category) =>{
        console.log('category',category);
        // 更新状态是异步的。
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{   // 状态更新且重新render()后执行
            console.log('parentId',this.state.parentId);
            // 显示二级分类列表显示
            this.getCategoryList();
        })
    }
    /**
     * 获取category列表(一级或者二级)
     * parentIdParams 如果没有指定，就根据状态中的parentId请求，如果指定了，就根据指定的发送请求
     */
    getCategoryList = async (parentIdParams) =>{
        this.setState({
            loading:true
        })
        const parentId = parentIdParams || this.state.parentId;
        const result = await reqCategory({parentId});
        if(result.success){
            // 一级、二级分类数据
            if(parentId === '0'){
                this.setState({
                    loading:false,
                    category:result.categoryList,
                })
            }else{
                this.setState({
                    loading:false,
                    subCategory:result.categoryList,
                })
            }
            
        }else{
            message.error('获取分类列表失败')
        }
    }
    /**
     * 显示一级分类列表
     */
    showCategory = () =>{
        this.setState({
            parentId:'0',   // 一级列表
            parentName:'',  // 一级标题，在二级显示
            subCategory:[]   // 二级的列表
        })
    }

    /**
     *  添加按钮增加点击事件
     */
    showAdd = () =>{
        this.setState({
            showStatus:1
        })
    }

    /**
     *  添加分类
     */
    addCategory = () =>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                // 1.拿到数据
                const {parentId,parentName} = this.form.getFieldsValue()
                //2.调用添加接口
                const result = await addCategory({
                    parentId:parentId,
                    name:parentName
                });
                if(result.success){
                    // 当前传入的parentId 等于状态里面的parentId 才需要重新获取
                    if(parentId === this.state.parentId){
                        // 重新获取
                        this.getCategoryList();
                    }else if(parentId === '0'){   // 在二级分类列表下添加的一级分类项，需要重新获取一级分类列表，但不需要显示一级列表
                        this.getCategoryList('0');
                    }
                }
                // 2.隐藏确认框
                this.setState({
                    showStatus:0
                })
                // 3.重置清除数据
                this.form.resetFields()
            }
        })
    }

    /**
     *   修改按钮的点击事件
     */
    showUpdate = (categoryItem) =>{
        // 保存分类对象
        this.categoryItem = categoryItem;
        this.setState({
            showStatus:2,
        })
    }

    /**
     * 更新分类
     */
    updateCategory = () =>{

        // 先要进行表单验证，只有通过了才进行下一步
        this.form.validateFields(async(err,values)=>{
            if(!err){
                const {parentName} = values;
                //1.发请求
                await reqUpdateCategory({
                    id:this.categoryItem._id,
                    name:parentName
                })
                //2.隐藏确定
                this.setState({
                    showStatus:0
                })

                // 3.重新显示列表
                this.getCategoryList();

                //4.清除数据
                this.form.resetFields();
            }
        })
        
    }

    /**
     * 点击取消，隐藏确认框
     */
    handleCancel = () =>{
        //清除数据
        this.form.resetFields();

        this.setState({
            showStatus:0
        })
    }

    // 第一次render准备数据
    componentWillMount(){
        this.initColumns()
    }
    // 执行异步任务，发送异步ajax请求
    componentDidMount(){
        this.getCategoryList();
        console.log('componentDidMount')
    }

    render() {
        // 一级分类：
        const {category,subCategory,loading,parentId,parentName,showStatus} = this.state;
        const categoryItem = this.categoryItem || {}   // 如果还没有，就指定一个空对象
        // card的左侧标题
        const title = parentId === '0'?(
            <LinkButton>一级分类列表</LinkButton>
        ):(
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{marginRight:'5px'}}></Icon>
                <span>{parentName}</span>
            </span>
        )
        // card的右侧标题
        const extra = (
            <Button type="primary" onClick={this.showAdd}>
                <Icon type="plus" />添加
            </Button>
        )

        return (
            <div className="category">
                <Card title={title} extra={extra}>
                    <Table dataSource={parentId === '0'?category:subCategory} 
                        rowKey='_id' 
                        bordered 
                        columns={this.columns} 
                        loading = {loading}
                        pagination = {{defaultPageSize:5,showQuickJumper:true}}
                        />
                </Card>
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    >
                    <AddForm 
                        category={category} 
                        parentId={parentId} 
                        setForm={(form)=>{this.form = form}}
                    />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    >
                    <UpdateForm 
                        categoryName={categoryItem.name} 
                        setForm={(form)=>{this.form = form}}/>
                </Modal>
            </div>
        )
    }
}
export default Category;