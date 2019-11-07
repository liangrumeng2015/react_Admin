/**
 * 
 */
import React, { Component } from 'react';
import { Card, Table, Icon, Button } from 'antd';
import {LinkButton} from '../../components/link-button'
import './category.less'
class Category extends Component {
    render() {
        // card的左侧标题
        const title = '一级标题'
        // card的右侧标题
        const extra = (
            <Button type="primary">
                <Icon type="plus" />添加
            </Button>
        )
        const dataSource = [
            {
                parentId:'0',
                _id:'1',
                name:'服装'
            },
            {
                parentId:'0',
                _id:'2',
                name:'食品'
            },
            {
                parentId:'0',
                _id:'3',
                name:'玩具'
            }
        ];
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',   // 显示数据对应的属性名
            },
            {
                title: '操作',
                width:300,
                render: () => (   // 返回需要显示的
                    <div>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </div>
                )
            }
        ];
        return (
            <div className="category">
                <Card title={title} extra={extra}>
                    <Table dataSource={dataSource} rowKey='_id' bordered columns={columns} />
                </Card>
            </div>
        )
    }
}
export default Category;