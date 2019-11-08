import React,{Component} from 'react';
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const Option = Select.Option
/**
 * 添加分类的form
 */
class AddForm extends Component{
    static propTypes = {
        setForm:PropTypes.func.isRequired,   // 用户传递form对象的函数
        category:PropTypes.array.isRequired,   // 一级分类的数组
        parentId:PropTypes.string.isRequired   // 父分类id
    }
    componentWillMount(){
        this.props.setForm(this.props.form);
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const {category,parentId} = this.props;
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId
                            
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    category.map((item,key)=>{
                                        return  <Option key={key} value={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('parentName',{
                            initialValue:'',
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
// export default AddForm;
export default Form.create()(AddForm)