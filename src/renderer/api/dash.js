import request from '@/utils/request'

export function fetchPatientlist(query) {
  return request({
    url: '/api/patientlist/',
    method: 'get',
    params: query
  })
}
