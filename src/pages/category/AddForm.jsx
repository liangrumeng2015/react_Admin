import React,{Component} from 'react';
import {Form,Select,Input} from 'antd'

const Item = Form.Item
const Option = Select.Option
/**
 * 添加分类的form
 */
class AddForm extends Component{
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                <Option value='1'>图书</Option>
                                <Option value='2'>服饰</Option>
                                <Option value='3'>电脑</Option>
                                <Option value='4'>厨具</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('parentName',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入分类名称"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
// export default AddForm;
export default Form.create()(AddForm)