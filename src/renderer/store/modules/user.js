import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    name: '',
    userId: '',
    avatar: '',
    iconurl: '',
    roles: [],
    version: '',
    current_ver: '1.0.1',
    expires: '',
    patientInfo: null,
    planInfo: null,
    planInfoTemp: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ICONURL: (state, iconurl) => {
      state.iconurl = iconurl
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_VERSION: (state, version) => {
      state.version = version
    },
    SET_EXPIRE: (state, expires) => {
      state.expires = expires
    },
    SET_PATIENTINFO: (state, expires) => {
      state.patientInfo = expires
    },
    SET_PLANINFO: (state, expires) => {
      const newObj = { ...state.planInfo, ...expires }
      state.planInfo = newObj
    },
    CLEAR_PLANINFO: (state) => {
      state.planInfo = null
    },
    SET_PLANINFOTEMP: (state, expires) => {
      const newObj = { ...state.planInfoTemp, ...expires }
      state.planInfoTemp = newObj
    },
    CLEAR_PLANINFOTEMP: (state) => {
      state.planInfoTemp = null
    }
  },

  actions: {
    savePlanInfoTemp({ commit }, expires) {
      commit('SET_PLANINFOTEMP', expires)
    },
    clearPlanInfoTemp({ commit }, expires) {
      commit('CLEAR_PLANINFOTEMP', expires)
    },

    savePatientInfo({ commit }, expires) {
      commit('SET_PATIENTINFO', expires)
    },

    savePlanInfo({ commit }, expires) {
      commit('SET_PLANINFO', expires)
    },

    clearPlanInfo({ commit }, expires) {
      commit('CLEAR_PLANINFO', expires)
    },

    // Login
    LoginByUsername({ commit, state }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)

          // var fs = require('fs')
          // try { fs.writeFileSync('config.txt', username, 'utf-8') } catch (e) { alert('Failed to save the file !') }

          var fs = require('fs')
          const { remote } = require('electron')
          const configDir = remote.app.getPath('userData')
          try { fs.writeFileSync(configDir + '/config.txt', username, 'utf-8') } catch (e) { console.log('Failed to save the file !') }

          // commit('SET_VERSION', data.version)
          // commit('SET_EXPIRE', data.expires * 1000)
          /*
          if (data.version !== state.current_ver) {
            Message.error({ message: '请下载最新版客户端后重新登录!' })
            window.location.href = 'http://47.92.162.154:8085/upload/files/VR.7z'
            reject()
          }
          */
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // Get User Info
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_USERID', data.userId)
          commit('SET_AVATAR', data.avatar)
          commit('SET_ICONURL', data.iconurl)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
