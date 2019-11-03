import React,{Component} from 'react';
import './assets/css/App.css';
import {Button,message} from 'antd';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  handlerClick = () =>{
    message.info('This is a normal message');
  }
  render(){
    return(
      <div>
        App.js文件
        <Button type="primary" onClick={this.handlerClick}>Primary</Button>
      </div>
    )
  }
}

export default App;
