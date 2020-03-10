<template>
  <div class="container">
    <Header :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div
          class="header-right-div display_flex justify-content_flex-center align-items_center"
          style="margin-top: 20px;"
        >
          <img src="../../assets/images/back.png" @click="goBack" style="cursor: pointer;" />
        </div>
      </template>
    </Header>
    <el-row>
      <el-col :span="24" class="margin-top-50">
        <div class="form-container">
          <el-card class="box-card">
            <el-form :model="formLabelAlign" ref="formLabelAlign" status-icon :rules="rules">
              <div v-if="step == 1">
                <el-form-item label="手机号：" label-width="100px" prop="phone">
                  <el-input placeholder="请输入手机号" v-model="formLabelAlign.phone"></el-input>
                  <el-link :underline="false" v-show="verShow" @click="sendSms()">发送验证码</el-link>
                  <el-link :underline="false" v-show="!verShow">
                    <span>{{timer}}</span>秒后重新获取
                  </el-link>
                </el-form-item>
                <el-form-item label="验证码：" label-width="100px" prop="verificationCode">
                  <el-input placeholder="请输入验证码" v-model="formLabelAlign.verificationCode"></el-input>
                </el-form-item>
              </div>
              <div v-else-if="step == 2">
                <el-form-item label="新密码：" label-width="100px" prop="newPassword">
                  <el-input placeholder="请输入新密码" show-password v-model="formLabelAlign.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" label-width="100px" prop="confirmPassword">
                  <el-input
                    placeholder="请确认密码"
                    show-password
                    v-model="formLabelAlign.confirmPassword"
                  ></el-input>
                </el-form-item>
              </div>
              <el-form-item class="margin-top-70" style="text-align: center;">
                <el-button class="purple" @click="nextStep()">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '@/components/page/Header/Header.vue'
import { fetchPhoneCode, verifyCode, modifyPassword } from '@/api/login.js'

export default {
  name: 'forgetPassword',
  components: {
    Header
  },
  data() {
    return {
      title: '用户密码重置',
      leftImg: '',
      step: '',
      timer: 60,
      verShow: true,
      auth_timer: '',
      formLabelAlign: {
        phone: '',
        verificationCode: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: '长度在 8 到 16 个字符'
          },
          {
            pattern: /^(\w){8,16}$/,
            message: '只能输入8-16个字母、数字、下划线'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: '长度在 8 到 16 个字符'
          },
          {
            pattern: /^(\w){8,16}$/,
            message: '只能输入8-16个字母、数字、下划线'
          }
        ]
      }
    }
  },
  created() {
    this.leftImg = require('../../assets/images/logo.png')
    this.step = this.$route.query.step
  },
  methods: {
    // 点击获取短信验证码
    sendSms() {
      if (!this.common.isPoneAvailable(this.formLabelAlign.phone.trim())) {
        this.$message.error('请输入正确的手机号码')
        return false
      }
      var params = {
        phone: this.formLabelAlign.phone.trim()
      }

      fetchPhoneCode(params).then(res => {
        if (res.data.status === 'T') {
          this.$message({
            message: '验证码已发送',
            type: 'success'
          })
          this.sendSmsCallback()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    },

    sendSmsCallback() {
      this.verShow = false
      this.timer = 60
      clearInterval(this.auth_timer)
      this.auth_timer = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          this.verShow = true
          clearInterval(this.auth_timer)
        }
      }, 1000)
    },

    nextStep() {
      if (this.step === 1) {
        this.$refs['formLabelAlign'].validate(valid => {
          if (valid) {
            var params = {
              phone: this.formLabelAlign.phone.trim(),
              code: this.formLabelAlign.verificationCode.trim()
            }
            verifyCode(params).then(res => {
              if (res.data.status === 'T') {
                this.nextStepCallback()
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
              }
            })
          }
        })
      } else {
        this.$refs['formLabelAlign'].validate(valid => {
          if (valid) {
            if (
              this.formLabelAlign.newPassword ===
              this.formLabelAlign.confirmPassword
            ) {
              // 修改密码
              var params = {
                phone: this.formLabelAlign.phone.trim(),
                code: this.formLabelAlign.verificationCode.trim(),
                password: this.formLabelAlign.newPassword.trim()
              }
              modifyPassword(params).then(res => {
                this.nextPage(res.data.status, res.data.msg)
              })
            } else {
              this.$message({
                message: '密码输入不一致',
                type: 'warning'
              })
            }
          }
        })
      }
    },
    nextStepCallback() {
      this.step = 2
      this.verShow = true
      clearInterval(this.auth_timer)
    },
    nextPage(status, msg) {
      if (status === 'T') {
        this.$alert('密码重设成功！', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({
              path: '/login'
            })
          }
        })
      } else {
        this.$alert('密码重设失败！', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({
              path: '/login'
            })
          }
        })
      }
    },

    goBack() {
      if (this.step === 2) {
        this.step = 1
      } else {
        this.$router.go(-1) // 返回上一层
      }
    }
  },
  watch: {
    step(newVal, oldVal) {
      // if (newVal == 1) {
      //   this.title = "用户密码找回";
      // } else if (newVal == 2) {
      //   this.title = "用户密码重置";
      // }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

::v-deep .header-middle {
  color: $purpleFontColor;
}

.header-right-div {
  img {
    width: 60px;
  }
}

.form-container {
  width: 800px;
  margin: 0 auto;
  .el-form {
    width: 432px;
    margin: 70px auto;
    .title {
      font-size: 18px;
    }
    .el-input {
      width: 230px;
      float: left;
    }
    .el-button {
      width: 230px;
    }
    .el-link {
      float: right;
      color: $purpleFontColor;
    }
  }
}
</style>
