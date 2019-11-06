import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import storageUtils from '../src/utils/storageUtils'
import memoryUtils from '../src/utils/memoryUtils'

// 读取本地localStorage中保存的user,保存在内存中
const user = storageUtils.getUser();
memoryUtils.user = user;


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
