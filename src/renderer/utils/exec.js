import store from '../store'

export function execJob(appId, filename) {
  // // console.log(store.getters.token)
  const child = require('child_process').execFile
  const executablePath = './app/' + filename + '/' + filename + '.exe'
  var parameters = ['appId=' + appId, 'user=' + store.getters.userId, 'access_token=' + store.getters.token]
  child(executablePath, parameters, function(err, data) {
    if (err) {
      console.error(err)
      return
    }
  })
}

export function setAccessToken(token) {
  const fs = require('fs')
  fs.writeFile('./config.ini', token, function(err) {
    if (err) {
      // console.log('Failed')
    } else {
      // console.log('Saved')
    }
  })
}
