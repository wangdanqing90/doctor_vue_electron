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
            <el-form
              :model="formLabelAlign"
              ref="formLabelAlign"
              status-icon
              :rules="rules"
              v-loading="loading"
            >
              <div v-show="step == 0">
                <div
                  id="camdemo1"
                  style="width: 320px; height: 240px; text-align: center; margin: 0 auto;"
                ></div>
                <br />
                <div style="text-align:center;">
                  <el-form-item style="text-align: center; margin:50px 100px">
                    <el-button class="purple fl" style="width:100px" @click="takephone()">拍照</el-button>
                    <el-button class="purple fr" style="width:100px" @click="step = 1">跳过</el-button>
                  </el-form-item>
                </div>
              </div>
              <div v-if="step == 1">
                <el-form-item label="所属医院：" label-width="100px" prop="hosipital">
                  <el-select
                    v-model="formLabelAlign.hosipital"
                    filterable
                    placeholder="请选择医院"
                    value-key="id"
                    @change="initdepartment"
                  >
                    <el-option
                      v-for="item in hosipitalsData"
                      :key="item.name"
                      :label="item.name"
                      :value="item"
                      :id="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属科室：" label-width="100px" prop="department">
                  <el-select v-model="formLabelAlign.department" placeholder="请选择科室">
                    <el-option
                      v-for="item in departmentsData"
                      :key="item.name"
                      :label="item.name"
                      :value="item"
                      :id="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工号：" label-width="100px" prop="jobnumber">
                  <el-input placeholder="请输入工号" v-model="formLabelAlign.jobnumber"></el-input>
                </el-form-item>
              </div>
              <div v-else-if="step == 2">
                <el-form-item label="姓名：" label-width="100px" prop="name">
                  <el-input placeholder="请输入姓名" v-model="formLabelAlign.name"></el-input>
                </el-form-item>
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
                <el-form-item label="密码：" label-width="100px" prop="password">
                  <el-input placeholder="请输入密码" show-password v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" label-width="100px" prop="confirmPassword">
                  <el-input
                    placeholder="请确认密码"
                    show-password
                    v-model="formLabelAlign.confirmPassword"
                  ></el-input>
                </el-form-item>
              </div>
              <el-form-item v-if="step != 0" class="margin-top-50" style="text-align: center;">
                <el-button class="purple" @click="nextStep()">{{buttonTxt}}</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <img :src="cameraImg" alt class="sign-img-style" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">重拍</el-button>
        <el-button type="primary" @click="cameraNextClick">使用此照片</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/page/Header/Header.vue'
import { fetchHospitalList, fetchDeptList } from '@/api/detail.js'
import { fetchPhoneCode, register, regfacefeature } from '@/api/login.js'

export default {
  name: 'register',
  components: {
    Header
  },

  data() {
    return {
      title: '医生注册信息填写',
      buttonTxt: '',
      leftImg: '',
      step: '',
      verShow: true,
      timer: 60,
      formLabelAlign: {
        name: '',
        phone: '',
        verificationCode: '',
        password: '',
        confirmPassword: '',
        hosipital: '',
        department: '',
        jobnumber: ''
      },
      hosipitalsData: [],
      departmentsData: [],
      rules: {
        hosipital: [
          { required: true, message: '请选择医院', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择科室', trigger: 'change' }
        ],
        jobnumber: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
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
      },
      WebCamera: '',
      dialogVisible: false,
      cameraImg: '',
      cameradisabled: true,
      loading: true,
      key: ''
    }
  },
  created() {
    window.vue = this
    this.leftImg = require('../../assets/images/logo.png')
    this.step = this.$route.query.step
    this.initHosipital()
  },
  mounted() {
    var _this = this
    this.WebCamera = require('webcamjs')
    this.WebCamera.set({
      width: 320,
      height: 240,
      dest_width: 640,
      dest_height: 480,
      flip_horiz: true
    })
    this.WebCamera.attach('#camdemo1')
    this.WebCamera.on('load', function () {
      _this.loading = false
      _this.cameradisabled = false
    })
    this.WebCamera.on('error', function (error) {
      // 摄像头出错
      _this.$alert('未检测到摄像头', '', {
        confirmButtonText: '确定',
        callback: action => { _this.loading = false; _this.step = 1 }
      })
    })
  },
  methods: {
    takephone() {
      var _this = this
      this.WebCamera.snap(function (data_uri) {
        _this.cameraImg = data_uri
        _this.dialogVisible = true
      })
    },
    cameraNextClick() {
      this.dialogVisible = false
      var params = {
        img: this.cameraImg
      }
      regfacefeature(params).then(res => {
        if (res.message === 'success') {
          this.$alert('人脸识别上传成功！', '', {
            confirmButtonText: '确定',
            callback: action => {
              this.step = 1
              this.key = res.data.key
            }
          })
        } else {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
      })
    },
    initHosipital() {
      fetchHospitalList().then(res => {
        this.hosipitalsData = res.data
      })
    },
    initdepartment(item) {
      this.formLabelAlign.department = ''
      var params = {
        hospitalid: item.id
      }
      fetchDeptList(params).then(res => {
        this.departmentsData = res.data
      })
    },
    // 点击获取短信验证码
    sendSms() {
      if (!this.common.isPoneAvailable(this.formLabelAlign.phone.trim())) {
        this.$message.error('请输入正确的手机号码')
        return false
      }
      var params = {
        phone: this.formLabelAlign.phone.trim()
      }
      // 获取短信验证码
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
      this.$refs['formLabelAlign'].validate(valid => {
        if (valid) {
          if (this.step === 1) {
            this.step = 2
          } else {
            this.register()
          }
        }
      })
    },
    register() {
      var params = {
        hospitalid: this.formLabelAlign.hosipital.id,
        department: this.formLabelAlign.department.id,
        jobnumber: this.formLabelAlign.jobnumber.trim(),
        phone: this.formLabelAlign.phone.trim(),
        name: this.formLabelAlign.name.trim(),
        code: this.formLabelAlign.verificationCode.trim(),
        password: this.formLabelAlign.password.trim(),
        key: this.key
      }
      register(params).then(res => {
        this.registerCallback(res.message)
      })
    },
    registerCallback(message) {
      if (message === 'success') {
        this.$alert('注册成功！', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({
              path: '/login'
            })
          }
        })
      } else {
        this.$alert('注册失败！', '', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$router.push({
            //   path: '/login'
            // })
          }
        })
      }
    },
    goBack() {
      if (this.step === 2) {
        this.step = 1
      }
      else if (this.step === 1) {
        if (this.cameradisabled) {
          this.$router.go(-1) // 返回上一层
        } else {
          this.step = 0
        }
      } else {
        this.$router.go(-1) // 返回上一层
      }
    }
  },
  watch: {
    step(newVal, oldVal) {
      if (newVal === 1) {
        this.title = '医生注册信息填写'
        this.buttonTxt = '下一步'
      } else if (newVal === 2) {
        this.title = '医生注册详细信息填写'
        this.buttonTxt = '确认'
      }
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
    .el-input,
    .el-select {
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

.sign-img-style {
  width: 100%;
}
</style>
