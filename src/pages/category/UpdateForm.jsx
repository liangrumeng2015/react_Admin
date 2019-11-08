import React,{Component} from 'react';
import PropType from 'prop-types'
import {Form,Input} from 'antd'

const Item = Form.Item
/**
 * 更新分类的form
 */
class UpdateForm extends Component{
    // 接收父传过来的值
    static propTypes = {
        categoryName:PropType.string.isRequired,
        setForm:PropType.func.isRequired
    }
    componentWillMount(){
        // 将form对象通过setForm传递给父组件
        this.props.setForm(this.props.form);
    }
    render(){
        const {categoryName} = this.props
        const {getFieldDecorator} = this.props.form;
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentName',{
                            initialValue:categoryName,
                            rules:[
                                {required:true,message:'分类名称必须输入'}
                            ]
                        })(
                            <Input type="text" placeholder="请输入分类名称"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
// export default UpdateForm;
export default Form.create()(UpdateForm)