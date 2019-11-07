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

// 登录接口  http://localhost:5000/users/api/login.do
export const reqLogin = (data) => Axios(httpURL + '/users/api/login.do',data,'post')

// 添加用户
export const reqAddUser = (data) => Axios(httpURL + 'manager/user/add',data,'post')

// 获取天气
export const reqGetWeather = (data) => Axios(httpURL + '/users/api/weather.do',data,'get')

// 获取分类(一级/二级)
export const reqCategory = (data) => Axios(httpURL + '/users/api/category/getCategoryList.do',data,'get')

// 添加分类
export const addCategory = (data) => Axios(httpURL + '/users/api/category/addCategory.do',data,'post')

// 更新分类
export const reqUpdateCategory = (data) => Axios(httpURL + '/users/api/category/updateCategory.do',data,'post')