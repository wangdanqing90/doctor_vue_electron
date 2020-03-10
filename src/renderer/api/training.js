import request from '@/utils/request'

export function fetchTrainingPlanList(query) {
  return request({
    url: '/api/patientplanlist/',
    method: 'get',
    params: query
  })
}

export function deleteTrainingPlan(data) {
  return request({
    url: '/api/planinfo/',
    method: 'delete',
    data
  })
}

export function fetchAskInfo(query) {
  return request({
    url: '/api/askinfo/',
    method: 'get',
    params: query
  })
}

export function postAskInfo(data) {
  return request({
    url: '/api/askinfo/',
    method: 'post',
    data
  })
}

export function fetchModifiedPlan(query) {
  return request({
    url: '/api/modifyplan/',
    method: 'get',
    params: query
  })
}

export function verifyPlan(data) {
  return request({
    url: '/api/planinfo/',
    method: 'put',
    data
  })
}

export function fetchReport(query) {
  return request({
    url: '/api/reportinfo/',
    method: 'get',
    params: query
  })
}

export function fetchPlanList(query) {
  return request({
    url: '/api/planlist/',
    method: 'get',
    params: query
  })
}

export function fetchPlanInfo(query) {
  return request({
    url: '/api/planinfo/',
    method: 'get',
    params: query
  })
}

// 新增计划
export function createPlanInfo(data) {
  return request({
    url: '/api/planinfo/',
    method: 'post',
    data
  })
}

// 修改
export function editPlanInfo(data) {
  return request({
    url: '/api/planinfo/',
    method: 'put',
    data
  })
}

export function deletePlanInfo(data) {
  return request({
    url: '/api/planinfo/',
    method: 'delete',
    data
  })
}

// 获取计划表步长
export function fetchStepDetail(query) {
  return request({
    url: '/api/stepdetails/',
    method: 'get',
    params: query
  })
}

export function fetchPlanListPerWeek(query) {
  return request({
    url: '/api/patientplanlistperweek/',
    method: 'get',
    params: query
  })
}

// 锁定时间
export function locktimeidpost(data) {
  return request({
    url: '/api/locktimeid/',
    method: 'post',
    data
  })
}

// 锁定时间定时器
export function locktimeidput(data) {
  return request({
    url: '/api/locktimeid/',
    method: 'put',
    data
  })
}

// 锁定时间定时器
export function locktimeiddelete(data) {
  return request({
    url: '/api/locktimeid/',
    method: 'delete',
    data
  })
}

