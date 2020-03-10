import request from '@/utils/request'

export function getAppList(params) {
  return request({
    url: '/api/DemoApp/info/' + params,
    method: 'get'
    // params
  })
}

export function getAppDetail(appId) {
  return request({
    url: '/api/DemoApp/detail/' + appId,
    method: 'get'
    // params: { appId }
  })
}
