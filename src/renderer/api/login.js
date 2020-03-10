import request from '@/utils/request'

export function loginByUsername(account, password) {
  return request({
    url: '/api/login/',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/user/info/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/logout/',
    method: 'post'
  })
}

export function fetchPhoneCode(data) {
  return request({
    url: '/api/phonecode/',
    method: 'post',
    data
  })
}

export function verifyCode(data) {
  return request({
    url: '/api/checkcode/',
    method: 'post',
    data
  })
}

export function modifyPassword(data) {
  return request({
    url: '/api/modifypwd/',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/api/register/',
    method: 'post',
    data
  })
}

export function regfacefeature(data) {
  return request({
    url: '/api/regfacefeature/',
    method: 'post',
    data
  })
}

export function facefeature(data) {
  return request({
    url: '/api/facefeature/',
    method: 'post',
    data
  })
}

