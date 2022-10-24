import Request from './request'
import { BASE_URL, TIMEOUT } from './config'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

export const request2 = new Request({
  baseURL: 'http://codercba.com:1888/airbnb/api',
  timeout: 8000,

  interceptors: {
    requestSuccessFn: (config) => {
      console.log('爱彼迎的请求成功的拦截')
      return config
    },
    requestFailureFn: (err) => {
      console.log('爱彼迎的请求失败的拦截')
      return err
    },
    responseSuccessFn: (res) => {
      console.log('爱彼迎的响应成功的拦截')
      return res
    },
    responseFailureFn: (err) => {
      console.log('爱彼迎的响应失败的拦截')
      return err
    }
  }
})

export default request
