import {
  getRequest,
  httpUrl,
  postRequest
} from '@/config/network'

// 获取活动信息
export const getActivityIndex = params => {
  return getRequest(httpUrl + '/assistance/index', params)
}

// 助力
export const helpUser = params => {
  return getRequest(httpUrl + '/assistance/assistance-friend', params)
}

// 获取验证码
export const getCode = params => {
  return getRequest(httpUrl + '/basic/user/identify', params)
}

// 获取微信appid和redirect_uri
export const getWinXinInfo = params => {
  return getRequest(httpUrl + '/config/authorize-info', params)
}

// 上传图片
export const uploadImg = params => {
  return postRequest(httpUrl + '/assistance/update-info', params)
}

// 上传图片到服务器
export const uploadImgServer = params => {
  return postRequest(httpUrl + '/down/uploadImage', params)
}