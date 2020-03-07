import axios from 'axios'
import Cookies from 'vue-cookies'
import { Loading, Message } from 'element-ui'

import { customizingPort, customizingPortIp } from './customizingConfig.js'
const MyHttpServer = {}

MyHttpServer.install = Vue => {
  let stopTime
  let loadingSta = 2
  const loadingTime = 1000
  // 请求拦截
  axios.interceptors.request.use(
    config => {
      if (config.url === 'system/update/step/' || config.url === '/system/update/firmware/') {
        if (process.env.NODE_ENV === 'production') {
          axios.defaults.baseURL = '/api/'
        } else if (process.env.NODE_ENV === 'development') {
          axios.defaults.baseURL = `${customizingPortIp.development}` + ':' + `${customizingPort.upgrade}` + '/api/'
        }
      }
      // console.log(axios.defaults.baseURL)
      if (config.url !== 'login/') {
        const singleToken = Cookies.get('singleToken')
        if (singleToken) {
          config.headers.common['token'] = `${singleToken}`
        }
      }
      if (!stopTime) {
        setTimeout(() => {
          if (!stopTime) {
            Loading.service({ text: 'Loading...' })
            loadingSta = 1
          }
        }, loadingTime)
      }
      // Loading.service({ text: 'Loading...' })
      return config
    },
    error => {
      Loading.service().close()
      return Promise.reject(error)
    }
  )
  console.log(axios.defaults.baseURL)

  // 响应拦截
  axios.interceptors.response.use(
    res => {
      stopTime = Date.now()
      if (loadingSta === 1) {
        Loading.service().close()
      }
      let { data } = res
      if (data.code !== 200) {
        if (data.code === 4008) {
          this.$cookies.remove('token')
          window.location.href = '/login'
        } else if (data.code === 4000) {
          console.log(22222)
          window.location.href = '/activate'
          // this.$router.push({'name': 'activate'})
        }
        Message.error(data.msg)
      }
      return res.data
    },
    error => {
      Message.error('服务器无响应')
      Loading.service().close()
      return Promise.reject(error)
    }
  )
  // 全局配置
  if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/api/'
  } else if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = `${customizingPortIp.development}` + ':' + `${customizingPort.normal}` + '/api/'
  }
  // axios.defaults.baseURL = `${customizingPortIp.development}` + ':' + `${customizingPort.normal}` + '/api/'
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // 允许在向服务器发送前，修改请求数据
  axios.defaults.transformRequest = [
    // 对 data 进行任意转换处理
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  Vue.prototype.$http = axios
}
export default MyHttpServer
