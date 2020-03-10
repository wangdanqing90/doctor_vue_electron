<template>
  <div class="app-container">
    <div class style="width: 1200px; margin: 0 auto;">
      <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
        <template v-slot:right>
          <div class="header-right-div display_flex justify-content_flex-center align-items_center">
            <img
              src="../../assets/images/certain.png"
              @click="onSubmit('formLabelAlign')"
              style="cursor: pointer;"
            />
            <img
              v-if="type == 'patientModify'"
              src="../../assets/images/close.png"
              style="cursor: pointer;"
              @click="deletePatientProfile"
            />
            <img
              src="../../assets/images/back.png"
              title="返回工作台"
              style="cursor: pointer;"
              @click="goBack"
            />
          </div>
        </template>
      </HeaderDoctor>

      <el-card class="box-card">
        <el-row class="body-container" :gutter="40">
          <el-col :span="6">
            <div class="left">
              <div v-if="type=='doctor'">
                <div class="left-txt">请选择头像</div>
                <div class="left-img">
                  <el-upload
                    class="avatar-uploader"
                    :action="actionUrl()"
                    :data="uploadParams"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="geticonurl" :src="geticonurl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>

                <el-button
                  class="purple fl"
                  style="margin:50px 0 0 40px"
                  @click="initCamera()"
                >人脸识别拍照</el-button>
              </div>
              <img class="head" v-else src="../../assets/images/elderly.png" />
            </div>
          </el-col>
          <el-col :span="18">
            <div class="right">
              <el-form
                :disabled=" type=='examine'"
                label-position="left"
                :inline="true"
                :model="formLabelAlign"
                :rules="rules"
                ref="formLabelAlign"
                class="demo-form-inline text-left"
              >
                <el-form-item label="姓名" prop="name" label-width="100px">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex" label-width="100px">
                  <el-radio-group v-model="formLabelAlign.sex" style="margin-top: 12px;">
                    <el-radio :label="1" v-model="formLabelAlign.sex" value="1">男</el-radio>
                    <el-radio :label="0" v-model="formLabelAlign.sex" value="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="年龄" prop="age" label-width="100px">
                  <el-input v-model="formLabelAlign.age" placeholder="请输入年龄"></el-input>
                </el-form-item>

                <el-form-item
                  label="密码"
                  prop="password"
                  label-width="100px"
                  :required="type == 'patient'"
                >
                  <el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item label="身份证号" prop="IDNumber" label-width="100px">
                  <el-input v-model="formLabelAlign.IDNumber" placeholder="请输入身份证号"></el-input>
                </el-form-item>

                <el-form-item label="工号" prop="jobNumber" v-if="type=='doctor'" label-width="100px">
                  <el-input v-model="formLabelAlign.jobNumber" placeholder="请输入工号"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone" label-width="100px">
                  <el-input
                    v-model="formLabelAlign.phone"
                    placeholder="请输入手机号"
                    :disabled="type != 'patient'"
                  ></el-input>
                </el-form-item>

                <el-form-item label="所属医院" prop="hospital" label-width="100px">
                  <el-select
                    v-model="formLabelAlign.hospital"
                    filterable
                    placeholder="请选择医院"
                    value-key="id"
                    @change="initdepartment"
                    style="width: 202px;"
                    :disabled="type === 'patient'"
                  >
                    <el-option
                      v-for="item in hospitalsData"
                      :key="item.name"
                      :label="item.name"
                      :value="item"
                      :id="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="所属科室" prop="department" label-width="100px">
                  <el-select
                    v-model="formLabelAlign.department"
                    placeholder="请选择所属科室"
                    style="width: 202px;"
                    :disabled="type === 'patient'"
                  >
                    <el-option
                      v-for="item in departmentsData"
                      :key="item.name"
                      :label="item.name"
                      :value="item"
                      :id="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="办公电话"
                  prop="officePhone"
                  v-if="type === 'doctor'"
                  label-width="100px"
                >
                  <el-input v-model="formLabelAlign.officePhone" placeholder="请输入办公电话"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email" v-if="type=='doctor'" label-width="100px">
                  <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>

                <el-form-item
                  label="所属医生"
                  prop="department"
                  v-if="type=='patientModify'||type=='patient'||type=='examine'"
                  label-width="100px"
                >
                  <el-select
                    v-model="formLabelAlign.doctor"
                    placeholder="请选择所属医生"
                    value-key="id"
                    :disabled="type === 'patient'"
                    style="width: 202px;"
                  >
                    <el-option
                      v-for="item in doctorsData"
                      :key="item.id"
                      :label="item.name"
                      :value="item"
                      :id="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="身高(cm)"
                  prop="height"
                  v-if="type=='patientModify'||type=='patient'||type=='examine'"
                  label-width="100px"
                >
                  <el-input v-model="formLabelAlign.height" placeholder="请输入身高"></el-input>
                </el-form-item>

                <el-form-item
                  label="体重(kg)"
                  prop="weight"
                  v-if="type=='patientModify'||type=='patient'||type=='examine'"
                  label-width="100px"
                >
                  <el-input v-model="formLabelAlign.weight" placeholder="请输入体重"></el-input>
                </el-form-item>

                <el-form-item
                  label="联系信息"
                  prop="inform"
                  label-width="100px"
                  v-if="type=='patientModify'||type=='patient'||type=='examine'"
                >
                  <el-input v-model="formLabelAlign.inform" placeholder="请输入联系信息"></el-input>
                </el-form-item>

                <el-form-item
                  label="骨盆高度"
                  prop="PelvicHeight"
                  label-width="100px"
                  v-if="type=='patientModify'||type=='patient'||type=='examine'"
                  title="单位: cm"
                >
                  <el-input v-model="formLabelAlign.PelvicHeight" placeholder="请输入骨盆高度"></el-input>
                </el-form-item>

                <el-form-item
                  label="减重值"
                  title="单位: kg"
                  prop="lossWeight"
                  label-width="100px"
                  v-if="type ==='patientModify' || type === 'patient' || type === 'examine'"
                >
                  <el-input v-model="formLabelAlign.lossWeight" placeholder="请输入减重值"></el-input>
                </el-form-item>

                <el-form-item
                  label="偏瘫侧"
                  prop="hemiplegiaSide"
                  label-width="100px"
                  v-if="type === 'patientModify'|| type === 'patient' || type === 'examine'"
                >
                  <el-radio-group v-model="formLabelAlign.hemiplegiaSide" style="margin-top: 12px;">
                    <el-radio :label="1" v-model="formLabelAlign.hemiplegiaSide" value="1">左</el-radio>
                    <el-radio :label="2" v-model="formLabelAlign.hemiplegiaSide" value="2">右</el-radio>
                    <el-radio :label="3" v-model="formLabelAlign.hemiplegiaSide" value="3">双侧</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-dialog title :visible.sync="outerVisible" v-loading="loading" @opened="opened">
      <el-dialog width="30%" title :visible.sync="innerVisible" append-to-body>
        <img :src="cameraImg" alt class="sign-img-style" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">重拍</el-button>
          <el-button type="primary" @click="cameraNextClick">使用此照片</el-button>
        </span>
      </el-dialog>
      <div id="camdemo" style="width: 320px; height: 240px; text-align: center; margin: 0 auto;"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="takephone">拍照</el-button>
      </div>
    </el-dialog>
  </div>
</template> 

<script>
import HeaderDoctor from '@/components/Page/HeaderDoctor/HeaderDoctor.vue'
import { mapGetters } from 'vuex'
import {
  fetchHospitalList,
  fetchDeptList,
  fetchDoctorInfo,
  editDoctor,
  fetchDoctorList,
  verifyPatient,
  fetchPatientInfo,
  createPatient,
  editPatient,
  deletePatient,
  modifyicon,
  chgface
} from '@/api/detail.js'

export default {
  name: 'home',
  components: {
    HeaderDoctor
  },

  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };

    return {
      leftImg: '',
      title: '',
      titleName: '',
      type: '', // doctor：医生，patientModify：患者修改，patient：患者新增，examine:患者审核
      patientid: '',
      hospitalsData: [],
      departmentsData: [],
      doctorsData: null,
      formLabelAlign: {
        name: '',
        sex: '',
        age: '',
        password: '',
        IDNumber: '',
        hospital: '',
        department: '',
        jobNumber: '',
        officePhone: '',
        phone: '',
        email: '',
        doctor: '',
        height: '',
        weight: '',
        inform: '',
        PelvicHeight: '',
        lossWeight: '',
        hemiplegiaSide: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        IDNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号格式有误！',
            trigger: 'blur'
          }
        ],
        hospital: [
          { required: true, message: '请选择医院', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择科室', trigger: 'change' }
        ],
        jobNumber: [
          { required: true, message: '请选择工号', trigger: 'change' }
        ],
        doctor: [
          { required: true, message: '请选择所属医生', trigger: 'change' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        password: [{ message: '请输入密码', trigger: 'blur' }],
        height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入体重', trigger: 'blur' }],
        PelvicHeight: [
          { required: true, message: '请输入骨盆高度', trigger: 'blur' }
        ],
        lossWeight: [
          { required: true, message: '请输入减重值', trigger: 'blur' }
        ],
        hemiplegiaSide: [
          { required: true, message: '请选择偏瘫侧', trigger: 'change' }
        ]
      },
      doctorinfo: [],
      uploadParams: {
        type: '3'
      },
      WebCamera: '',
      cameraImg: '',
      outerVisible: false,
      innerVisible: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters(['iconurl']),
    geticonurl() {
      if (this.iconurl) {
        return 'http://www.irego.cn/static/upload/' + this.iconurl
      }
    }
  },
  created() {
    window.vue = this
    this.WebCamera = require('webcamjs')
    this.WebCamera.set({
      width: 320,
      height: 240,
      dest_width: 640,
      dest_height: 480,
      flip_horiz: true
    })
    fetchDoctorList().then(res => {
      this.doctorsData = res.data
    })
    this.leftImg = require('../../assets/images/logo.png')
    this.type = this.$route.query.type
    if (this.type === 'doctor') {
      this.title = '编辑我的基本信息'

      this.initDoctorinfo()
      this.inithospital()
    } else if (this.type === 'patient') {
      // 新建病人
      this.title = '请填写患者信息'
      this.initNewPatient()
      this.inithospital()
    } else if (this.type === 'patientModify' || this.type === 'examine') {
      // 修改病人
      this.title = '的基本信息'
      this.titleName = this.$store.state.user.patientInfo.name
      this.patientid = this.$store.state.user.patientInfo.id
      this.initOldPatient()
      this.inithospital()
    }
  },

  methods: {
    initCamera() {
      this.outerVisible = true
    },
    opened() {
      var _this = this
      if (this.loading) {
        this.WebCamera.attach('#camdemo')
        this.WebCamera.on('load', function () {
          // _this.loading = false
        })
        this.WebCamera.on('error', function (error) {
          // 摄像头出错
          _this.$alert('未检测到摄像头', '', {
            confirmButtonText: '确定',
            callback: action => { }
          })
        })
      }

    },
    takephone() {
      var _this = this
      this.innerVisible = true
      this.WebCamera.snap(function (data_uri) {
        _this.cameraImg = data_uri
        _this.dialogVisible = true
      })
    },
    cameraNextClick() {
      this.innerVisible = true
      this.outerVisible = true
      var params = {
        img: this.cameraImg
      }
      chgface(params).then(res => {
        if (res.message === 'success') {
          this.$alert('人脸识别修改成功！', '', {
            confirmButtonText: '确定',
            callback: action => {
              this.outerVisible = false
              this.innerVisible = false
            }
          })
        } else {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            callback: action => {
              this.outerVisible = false
              this.innerVisible = false
            }
          })
        }
      })
    },
    initDoctorinfo() {
      fetchDoctorInfo().then(res => {
        this.doctorinfo = res.data
        this.formLabelAlign.age = res.data.age
        this.formLabelAlign.email = res.data.email
        this.formLabelAlign.IDNumber = res.data.identitycard
        this.formLabelAlign.jobNumber = res.data.jobnumber
        this.formLabelAlign.name = res.data.name
        this.formLabelAlign.officePhone = res.data.officephone
        this.formLabelAlign.phone = res.data.phone
        this.formLabelAlign.sex = res.data.sex
        this.formLabelAlign.hospital = {
          id: res.data.hospitalid,
          name: res.data.hospital
        }
        this.formLabelAlign.department = {
          id: res.data.departmentid,
          name: res.data.department
        }
        var params = {
          hospitalid: res.data.hospitalid
        }
        fetchDeptList(params).then(res => {
          this.departmentsData = res.data
        })
      })
    },

    deletePatientProfile() {
      this.$confirm('您是否确定删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        confirmButtonClass: 'el-button purple'
      }).then(() => {
        this.deletePatientHandler()
      })
    },
    deletePatientHandler() {
      var params = {
        patientid: this.patientid
      }
      deletePatient(params).then(res => {
        this.$alert('删除成功', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.goBack()
          }
        })
      })
    },

    goBack() {
      this.$router.push({ path: '/' })
    },

    inithospital() {
      fetchHospitalList().then(res => {
        this.hospitalsData = res.data
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

    updateDept(params) {
      fetchDeptList(params).then(res => {
        this.departmentsData = res.data
      })
    },

    initdoctor() {
      this.formLabelAlign.doctor = ''
      var params = {
        hospitalid: this.formLabelAlign.hospital.id,
        departmentid: this.formLabelAlign.department.id
      }
      // console.log(this.formLabelAlign.hospital.id + '  ' + this.formLabelAlign.department.id)
      fetchDoctorList(params).then(res => {
        this.doctorsData = res.data
      })
    },

    updateDoctor() {
      var params = {
        hospitalid: this.formLabelAlign.hospital.id,
        departmentid: this.formLabelAlign.department.id
      }
      fetchDoctorList(params).then(res => {
        this.doctorsData = res.data
      })
    },

    initNewPatient() {
      fetchDoctorInfo().then(res => {
        this.formLabelAlign.doctor = res.data.name
        this.formLabelAlign.hospital = {
          id: res.data.hospitalid,
          name: res.data.hospital
        }
        this.formLabelAlign.department = {
          id: res.data.departmentid,
          name: res.data.department
        }
        // 初始化科室下拉框
        var params = { hospitalid: res.data.hospitalid }
        this.updateDept(params)
      })
    },

    initOldPatient() {
      var params = {
        patientid: this.patientid
      }
      fetchPatientInfo(params).then(res => {
        this.formLabelAlign.age = res.data.age
        this.formLabelAlign.height = res.data.height
        this.formLabelAlign.weight = res.data.weight
        this.formLabelAlign.inform = res.data.contactinfo
        this.formLabelAlign.IDNumber = res.data.identitycard
        this.formLabelAlign.name = res.data.name
        this.formLabelAlign.phone = res.data.phone
        this.formLabelAlign.sex = res.data.sex
        this.formLabelAlign.doctor = res.data.doctor
        this.formLabelAlign.PelvicHeight = res.data.pelv
        this.formLabelAlign.hemiplegiaSide = res.data.hemi
        this.formLabelAlign.lossWeight = res.data.loss
        this.formLabelAlign.contactinfo = res.data.contactinfo
        this.formLabelAlign.hospital = {
          id: res.data.hospitalid,
          name: res.data.hospital
        }
        this.formLabelAlign.department = {
          id: res.data.departmentid,
          name: res.data.department
        }
        this.formLabelAlign.doctor = {
          id: res.data.doctorid,
          name: res.data.doctor
        }

        // 初始化科室下拉框
        var params = { hospitalid: res.data.hospitalid }
        this.updateDept(params)
        this.updateDoctor()
      })
    },

    showResult() {
      this.$confirm('您已成功添加该患者?', '', {
        confirmButtonText: '回工作台',
        cancelButtonText: '制定计划',
        confirmButtonClass: 'el-button purple'
      })
        .then(() => {
          this.$router.push({
            path: '/',
            name: 'home',
            query: {}
          })
        })
        .catch(() => {
          this.$router.push({
            path: '/',
            name: 'home',
            query: {}
          })
        })
    },

    examine() {
      this.$router.push({
        path: '/',
        name: 'home',
        query: {}
      })
    },

    onSubmit(formName) {
      const _this = this
      if (this.type === 'examine') {
        this.$confirm('您是否确认审核通过?', '', {
          confirmButtonText: '通过',
          cancelButtonText: '拒绝',
          confirmButtonClass: 'el-button purple',
          center: true
        })
          .then(() => {
            _this.examPatient(1)
          })
          .catch(() => {
            _this.examPatient(2)
          })
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 修改医生信息
            if (this.type === 'doctor') {
              this.$confirm('您是否确认修改?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'el-button purple',
                center: true
              })
                .then(() => {
                  this.editDoctorProfile()
                })
                .catch(() => { })
            } else if (this.type === 'patient') {
              this.$confirm('确认添加该患者?', '', {
                confirmButtonText: '确认添加',
                cancelButtonText: '暂不添加',
                confirmButtonClass: 'el-button purple',
                center: true
              })
                .then(() => {
                  _this.addPatientProfile()
                })
                .catch(() => { })
            } else if (this.type === 'patientModify') {
              this.$confirm('是否确认修改?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'el-button purple',
                center: true
              })
                .then(() => {
                  _this.editPatientProfile()
                })
                .catch(() => { })
            }
          }
        })
      }
    },

    editDoctorProfile() {
      var params = {
        password: this.formLabelAlign.password,
        sex: this.formLabelAlign.sex,
        age: this.formLabelAlign.age,
        name: this.formLabelAlign.name,
        identitycard: this.formLabelAlign.IDNumber,
        email: this.formLabelAlign.email,
        jobnumber: this.formLabelAlign.jobNumber,
        officephone: this.formLabelAlign.officePhone,
        hospitalid: this.formLabelAlign.hospital.id,
        departmentid: this.formLabelAlign.department.id
      }
      this.$store.state.user.name = this.formLabelAlign.name
      editDoctor(params).then(response => {
        var status = response.message
        if (status === 'success') {
          this.$alert('修改成功！', '', {
            confirmButtonText: '确定'
          })
        } else {
          this.$message.error(response.message)
        }
      })
    },

    changeDoctorCallback() {
      this.$router.push({
        path: '/'
      })
    },

    examPatient(type) {
      var params = {
        patientid: this.patientid,
        type: type
      }
      verifyPatient(params).then(res => {
        var status = res.message
        if (status === 'success') {
          this.$alert('操作成功', '', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              this.goBack()
            }
          })
        } else {
          this.$message.error(status)
        }
      })
    },

    addPatientProfile() {
      var params = {
        name: this.formLabelAlign.name,
        sex: this.formLabelAlign.sex,
        age: this.formLabelAlign.age,
        phone: this.formLabelAlign.phone,
        password: this.formLabelAlign.password,
        identitycard: this.formLabelAlign.IDNumber,
        height: this.formLabelAlign.height,
        weight: this.formLabelAlign.weight,
        contactinfo: this.formLabelAlign.inform,
        pelv: this.formLabelAlign.PelvicHeight, //	骨盆高度
        loss: this.formLabelAlign.lossWeight, //	减重
        hemi: this.formLabelAlign.hemiplegiaSide //	偏瘫
      }
      createPatient(params).then(res => {
        if (res.message === 'success') {
          this.$alert('新增成功', '', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              this.goBack()
            }
          })
        } else {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
      })
    },

    editPatientProfile() {
      var params = {
        patientid: this.patientid,
        name: this.formLabelAlign.name,
        sex: this.formLabelAlign.sex,
        age: this.formLabelAlign.age,
        phone: this.formLabelAlign.phone,
        password: this.formLabelAlign.password,
        identitycard: this.formLabelAlign.IDNumber,
        height: this.formLabelAlign.height,
        weight: this.formLabelAlign.weight,
        contactinfo: this.formLabelAlign.inform,
        pelv: this.formLabelAlign.PelvicHeight, //	骨盆高度
        loss: this.formLabelAlign.lossWeight, //	减重
        hemi: this.formLabelAlign.hemiplegiaSide, //	偏瘫
        hospitalid: this.formLabelAlign.hospital.id,
        departmentid: this.formLabelAlign.department.id,
        doctorid: this.formLabelAlign.doctor.id
      }
      editPatient(params).then(res => {
        this.$alert('修改成功', '', {
          confirmButtonText: '确定',
          showClose: false,
          callback: action => {
            this.goBack()
          }
        })
      })
    },
    actionUrl() {
      return process.env.BASE_API + '/api/uploadfiles/'
    },
    // 修改头像
    handleAvatarSuccess(res, file) {
      var _this = this
      var params = { icon: file.response.data }
      modifyicon(params).then(res => {
        this.$alert('修改成功', '', {
          confirmButtonText: '确定',
          showClose: false,
          callback: action => {
            _this.$store.dispatch('GetUserInfo').then(res => { })
          }
        })
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  .header-right {
    img {
      width: 50px;
      margin-left: 20px;
    }
  }
}

.body-container {
  padding: 100px 110px;
  .left {
    text-align: center;

    .left-txt {
      color: #8da1f2;
      font-size: 14px;
      line-height: 40px;
    }

    .left-img {
      border: 1px solid #d8dce5;
      padding: 10px;
    }

    .head {
      width: 200px;
      height: 200px;
      border-radius: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    // div:nth-of-type(1) {
    //   font-size: 16px;
    //   margin: 15px auto;
    // }
    // div:nth-of-type(2) {
    //   margin-bottom: 20px;
    //   font-size: 12px;
    //   width: 140px;
    //   i {
    //     content: '*';
    //     color: #f56c6c;
    //     margin-right: 4px;
    //   }
    // }
    .gou,
    .back {
      font-size: 12px;
      img {
        width: 20px;
        vertical-align: middle;
        margin: auto 5px;
      }
    }
  }

  .right {
    ::v-deep .el-form-item__content {
      width: 200px !important;
      margin-right: 10px;
    }
    ::v-deep .el-form-item__label {
      padding: 0;
    }
    ::v-deep .el-radio-group {
      margin: 10px auto;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.sign-img-style {
  width: 100%;
}
</style>
