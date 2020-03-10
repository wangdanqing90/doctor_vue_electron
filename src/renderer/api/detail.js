import request from '@/utils/request'

export function fetchHospitalList(query) {
  return request({
    url: '/api/hospitallist/',
    method: 'get',
    params: query
  })
}

export function fetchDeptList(query) {
  return request({
    url: '/api/department/',
    method: 'get',
    params: query
  })
}

export function fetchDoctorInfo(query) {
  return request({
    url: '/api/doctorinfo/',
    method: 'get',
    params: query
  })
}

export function editDoctor(data) {
  return request({
    url: '/api/doctorinfo/',
    method: 'put',
    data
  })
}

export function fetchDoctorList(query) {
  return request({
    url: '/api/doctorlist/',
    method: 'get',
    params: query
  })
}

export function fetchPatientInfo(query) {
  return request({
    url: '/api/patientinfo/',
    method: 'get',
    params: query
  })
}

export function createPatient(data) {
  return request({
    url: '/api/patientinfo/',
    method: 'post',
    data
  })
}

export function editPatient(data) {
  return request({
    url: '/api/patientinfo/',
    method: 'put',
    data
  })
}

export function deletePatient(query) {
  return request({
    url: '/api/patientinfo/',
    method: 'delete',
    params: query
  })
}

export function verifyPatient(data) {
  return request({
    url: '/api/verifypatient/',
    method: 'put',
    data
  })
}

export function modifyicon(data) {
  return request({
    url: '/api/modifyicon/ ',
    method: 'put',
    data
  })
}

export function chgface(data) {
  return request({
    url: '/api/chgface/',
    method: 'put',
    data
  })
}

/*
//获取医生列表
export const apiDoctorlist= p => get('/api/doctorlist/', p)
//医生注册
export const apiRegister= p => post('/api/register/', p)
//获取患者列表
export const apiPatientlist= (p) => get('/api/patientlist/?page='+p.page+'&limit='+p.limit+'&search='+p.search)
//获取医生信息
export const apiDoctorinfo= () => get('/api/doctorinfo/')
//修改医生信息
export const apichangeDoctorinfo= p => put('/api/doctorinfo/', p)
//获取患者信息
export const apiGetPatientinfo= (p) =>get('/api/patientinfo/?patientid='+p.patientid)
//新增患者
export const apiAddPatientinfo = p => post('/api/patientinfo/', p)
//修改患者
export const apiChangePatientinfo = p => put('/api/patientinfo/', p)
//审批患者通过申请
export const apiVerifypatient = p => put('/api/verifypatient/', p)
//删除患者
export const apiDeletepatient = p => deletefun('/api/patientinfo/', p)
//获取训练报告
export const apiReportinfo = (p) => get('/api/reportinfo/', p)
*/
