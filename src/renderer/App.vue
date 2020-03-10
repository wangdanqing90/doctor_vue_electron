<template>
  <div id="app" @click='clicked'>
    <router-view></router-view>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  name: 'App',
  data() {
    return {
      // lTime: new Date().getTime(),
      // ctTime: new Date().getTime(),
      downloadPercent: null,
      tip: null
    }
  },
  mounted() {
    // window.setInterval(this.tTime, 1000)
    // 用来监听是否更新
    /*
    ipcRenderer.on('message', (event, { message, data }) => {
      // console.log(message)
      if (message === 'isUpdateNow') {
        if (confirm('是否现在更新？')) {
          ipcRenderer.send('updateNow')
        }
      }
    })
    this.autoUpdate()
    */
    ipcRenderer.send('checkForUpdate')

    ipcRenderer.on('message', (event, text) => {
      // console.log(text)
      this.tips = text
    })
    // 注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
    ipcRenderer.on('downloadProgress', (event, progressObj) => {
      // console.log(progressObj)
      this.downloadPercent = progressObj.percent || 0
    })
    ipcRenderer.on('isUpdateNow', (event, text) => {
      this.$alert('检测到最新版本, 程序将自动下载后安装')
      ipcRenderer.send('isUpdateNow')
    })
  },
  methods: {
    clicked() {
      // this.lTime = new Date().getTime()
    }
    /*
    tTime() {
      if (this.$store.state.user.name) {
        this.ctTime = new Date().getTime()
        // // console.log(this.ctTime - this.lTime)
        if (this.ctTime - this.lTime > this.$store.state.user.expires) {
          this.$store.dispatch('LogOut').then(() => {
            location.reload()
          })
        }
      }
    }
    */
  }
}
</script>
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式

.el-button--primary {
  color: #fff;
  background-color: #3A71A8;
  border-color: #3A71A8;
}
.el-button--primary:hover{
  background-color: #4678AA;
  border-color: #4678AA;  
}
.el-button--primary:focus{
  background-color: #4678AA;
  border-color: #4678AA;  
}  

.el-button--success {
  color: #fff;
  background-color: #8c69e7;
  border-color: #8c69e7;
}
.el-button--success:hover{
  background-color: #a588ec;
  border-color: #a588ec;  
}
.el-button--success:focus{
  background-color: #a588ec;
  border-color: #a588ec;  
}  

/*
.el-button--success {
  color: #fff;
  background-color: #4AB7BD;
  border-color: #4AB7BD;
}
.el-button--success:hover{
  background-color: #39BC9A;
  border-color: #39BC9A;  
}
.el-button--success:focus{
  background-color: #39BC9A;
  border-color: #39BC9A;  
}  
*/

.el-button--danger {
  color: #fff;
  background-color: #e65d6e;
  border-color: #e65d6e;
}
.el-button--danger:hover{
  background-color: #EA7C89;
  border-color: #EA7C89;  
}
.el-button--danger:focus{
  background-color: #EA7C89;
  border-color: #EA7C89;  
}

.el-button--warning {
  color: #fff;
  background-color: #fec171;
  border-color: #fec171;
}
.el-button--warning:hover{
  background-color: #FFCB86;
  border-color: #FFCB86;  
}
.el-button--warning:focus{
  background-color: #FFCB86;
  border-color: #FFCB86;  
}
</style>
