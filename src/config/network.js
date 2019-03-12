import axios from 'axios'
import qs from 'qs'

// export const httpUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://app.marathonbm.com'
// export const httpUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://192.168.2.10:8082'   //http://ceshi.marathonbm.com
export const httpUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://ceshi.marathonbm.com' //http://ceshi.marathonbm.com

// post请求
export const postRequest = (url, params) => {
  return new Promise((resolve) => {
    axios.post(url, qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
  })
}

// get请求
export const getRequest = (url, params) => {
  return new Promise((resolve) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
  })
}
