/**
 * 
 */
import React ,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './ProductHome'
import AddUpdate from './AddUpdate'
import Detail from './Detail'
class Product extends Component{
    render(){
        return(
            <Switch>
                {/* exact路径完全匹配 */}
                <Route exact path='/product' component={ProductHome} />
                <Route path='/product/detail' component={Detail} />
                <Route path='/product/addupdate' component={AddUpdate} />
                <Redirect to="/product" />
            </Switch>
        )
    }
}
export default Product;