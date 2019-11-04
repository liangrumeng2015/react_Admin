/**
 * 包含应用中【所有接口请求函数的模块】
 * 每个函数的返回值都是promise
 * 
 * 
 * export default {
        reqLogin=(data)=>{
            return Axios('/login',data,'post')
        }
    }

    export const reqLogin = (data) => {
        return Axios('/login',data,'post')
    }
 */
import Axios from './axios'
const httpURL = ''

// 登录接口
export const reqLogin = (data) => Axios(httpURL + '/login',data,'post')

// 添加用户
export const reqAddUser = (data) => Axios(httpURL + 'manager/user/add',data,'post')