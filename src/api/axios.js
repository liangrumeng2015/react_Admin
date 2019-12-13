/**
 * 发送异步请求的模块,
 * 封装axios请求
 * 返回值是promise对象
 * (1)统一处理请求异常   
 *      在外层自己创建一个promise对象，在请求出错时，不去reject，而是显示错误提示。
 * (2)异步得到response里面的data值
 */
import axios from 'axios'
import {message} from 'antd'
function Axios(url,data={},method='get'){
    // axios({
    //     method: method,
    //     url: url,
    //     data: data
    // }).then((res)=>{
    // })
    return new Promise((resolve,reject)=>{
        let promise;
        // 1.执行异步ajax请求
        if(method === 'get'){
            promise = axios.get(url,{params:data})
        }else{
            promise = axios.post(url,data)
        }
        //2. 成功，resolve
        promise.then((response)=>{
            resolve(response.data)
        }).catch((error)=>{
        //3. 失败，不调用reject，而是提示异常信息
            message.error('请求出错了:'+error.message)
        })
    })
    
    
}
export default Axios;