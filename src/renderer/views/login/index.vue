<template>
  <div class="container">
    <Header :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <el-link :underline="false" @click="aboutUs">关于我们</el-link>
        </div>
      </template>
    </Header>

    <el-row>
      <el-col :span="24">
        <div class="login-container">
          <el-card class="box-card">
            <div class="display_flex justify-content_flex-around">
              <div class="left" style=" margin: 116px auto 0 auto ;">
                <div class="left-txt">{{lefttxt}}</div>
                <div
                  id="camdemo"
                  style="width: 240px; height: 160px; text-align: center; margin: 0 auto 0 auto ;"
                ></div>
              </div>
              <el-form
                class="login-form"
                autocomplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="left"
              >
                <div class="title" style="color: #606266;">账号登录</div>
                <el-form-item prop="username">
                  <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input
                    name="username"
                    type="text"
                    v-model="loginForm.username"
                    autocomplete="on"
                    placeholder="用户名"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password"></svg-icon>
                  </span>
                  <el-input
                    name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autocomplete="on"
                    placeholder="密码"
                  ></el-input>
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye" />
                  </span>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="success"
                    style="width:100%;"
                    :loading="loading"
                    @click.native.prevent="handleLogin"
                  >登 录</el-button>
                </el-form-item>
                <div
                  class="header-right-div display_flex justify-content_flex-center align-items_center"
                >
                  <el-link :underline="false" @click="jumpForgetPassword">忘记密码</el-link>
                  <span class="vertaicl-line"></span>
                  <el-link :underline="false" @click="jumpRegister">用户注册</el-link>
                </div>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="关于我们"
      :visible.sync="aboutDialogVisible"
      width="600px"
      center
      class="aboutDialog"
    >
      <div class="aboutDialogBody">
        <img src="../../assets/images/logo.png" />
        <div>版本信息：IREGO 1.0.3</div>
        <div>上海金矢机器人科技有限公司</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/page/Header/Header.vue'
import { isvalidUsername } from '@/utils/validate'
import {
  facefeature
} from '@/api/login.js'
import { setToken } from '@/utils/auth'
export default {
  name: 'login',
  components: {
    Header
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      leftImg: '',
      title: '医生管理平台',
      aboutDialogVisible: false,
      setDialogVisible: false,
      frontUltrasonic: false,
      backUltrasonic: false,

      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      cameraImg: '',
      cameradisabled: true,
      isLoaded: true,
      timer1: null,
      lefttxt: '未检测到摄像头'
    }
  },
  created() {
    this.leftImg = require('../../assets/images/logo.png')
    var fs = require('fs')
    var data = fs.readFileSync('config.txt', 'utf-8')
    this.loginForm.username = data
  },
  mounted() {
    var _this = this
    this.WebCamera = require('webcamjs')
    this.WebCamera.set({
      width: 240,
      height: 160,
      dest_width: 480,
      dest_height: 320,
      flip_horiz: true
    })
    this.WebCamera.attach('#camdemo')
    this.WebCamera.on('load', () => {
      this.loading = false
      this.cameradisabled = false
      this.lefttxt = '';
      //定时调用人脸识别
      this.timer1 = setInterval(() => {
        this.isLoaded && this.takephone();
      }, 3000);
    })
    this.WebCamera.on('error', function (error) {
      // 摄像头出错
    })
  },
  beforeDestroy() {
    // this.isLoaded = false;
    clearInterval(this.timer1)
    this.timer1 = null;
  },
  methods: {
    takephone() {
      this.isLoaded = false;
      var _this = this
      this.WebCamera.snap(function (data_uri) {
        _this.cameraImg = data_uri;
        _this.cameraNextClick()
      })
    },
    cameraNextClick() {
      window.vue = this
      var _this = this;
      var params = {
        img: this.cameraImg
      }
      facefeature(params).then(res => {
        if (res.message === 'success') {
          console.log('success')
          setToken(res.data.token)
          _this.$store.commit('SET_TOKEN', res.data.token)
          _this.$router.push({ path: '/' })
        } else {
          this.lefttxt = res.message;
          this.isLoaded = true;
        }
      })
    },
    aboutUs() {
      this.aboutDialogVisible = true
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    jumpForgetPassword() {
      this.$router.push({
        path: '/forgetPassword',
        name: 'forgetPassword',
        query: { step: 1 }
      })
    },
    jumpRegister() {
      this.$router.push({
        path: '/register',
        name: 'register',
        query: { step: 0 }
      })
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
.left {
  text-align: center;
  .left-txt {
    color: #8da1f2;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
  }

  .left-img {
    border: 1px solid #d8dce5;
    padding: 10px;
  }
}

.vertaicl-line {
  display: inline-block;
  width: 1px;
  height: 15px;
  background: #000;
}
.header-right-div {
  a {
    height: 30px;
    line-height: 30px;
    padding: 5px 10px;
    font-size: 14px;
    color: #101012;
    text-decoration: underline;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    input {
      background: rgb(232, 240, 254);
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      &:-webkit-autofill {
        box-shadow: 0px 0px 0 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #d8dce5;
    background: rgb(232, 240, 254);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content {
    line-height: 30px;
  }
}

.aboutDialogBody {
  text-align: center;
  :nth-child(1) {
    width: 120px;
  }
  :nth-child(2) {
    margin-top: 20px;
    font-size: 20px;
  }
  :nth-child(3) {
    font-size: 12px;
    margin-top: 50px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/index.scss';

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  width: 800px;
  height: 800px;
  margin: 30px auto 0 auto;
  .login-form {
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 50px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 15px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
