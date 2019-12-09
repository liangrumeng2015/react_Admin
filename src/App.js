import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './assets/css/App.css';

import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
import Test from './pages/test/test'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  
  render(){
    return(
      <BrowserRouter>
      {/* switch值匹配一个，匹配到了后面的不会在匹配 */}
        <Switch>   
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
          {/* <Route path='/test' component={Test} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
