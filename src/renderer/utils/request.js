import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

// {"code":20000,"data":{"token":"admin"}}
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ' + store.getters.token
    // config.headers['X-Token'] = store.getters.token// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非10000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // // console.log('err' + error) // for debug

    if (error.message.indexOf('400') !== -1) {
      Message({
        message: '用户名或密码错误',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.message.indexOf('500') !== -1) {
      /*
      Message({
        message: '连接已超时，请稍后重试',
        type: 'error',
        duration: 5 * 1000
      })
      */
    } else if (error.message.indexOf('401') !== -1) {
      MessageBox.confirm('您的会话已过期，请重新登录', '', {
        confirmButtonText: '重新登录',
        showCancelButton: false,
        type: 'warning',
        center: true
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        return Promise.reject('error')
      })
    } else {
      /*
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      */
    }

    return Promise.reject(error)
  }
)

export default service
