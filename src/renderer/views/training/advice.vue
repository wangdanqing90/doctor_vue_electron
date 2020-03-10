<template>
  <div class>
    <el-card class="box-card">
      <div class="application-container">
        <div class="bottom">
          <div>
            <div class="margin-bottom-5">医嘱或备注:</div>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea"
              :disabled="selectInfo.status!=0"
            ></el-input>
            <el-button v-if="selectInfo.status==0" class="purple f-right" @click="submit()">确认</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchAskInfo, postAskInfo } from '@/api/training.js'
let _this

export default {
  name: 'PatientApplication',
  components: {
  },

  data() {
    return {
      leftImg: '',
      textarea: '',
      planid: ''
    }
  },
  props: {
    selectInfo: {
      type: Object,
      default: () => { }
    }
  },
  created() {
    _this = this
    this.planid = this.selectInfo.planid
    this.show = false

    this.initaskinfo()
  },
  methods: {
    initaskinfo() {
      var params = {
        planid: this.planid
      }
      fetchAskInfo(params).then(res => {
        if (
          res.message === 'success' &&
          !this.common.isNullOrBlank(res.data.content)
        ) {
          this.textarea = res.data.content
        }
      })
    },
    passClick() {
      this.$confirm('请确认医嘱', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-button purple'
      })
        .then(() => {
          _this.submit()
        })
        .catch(() => { })
    }, // 通过

    submit() {
      var params = {
        planid: this.planid,
        content: this.textarea.trim()
      }
      postAskInfo(params).then(res => {
        if (res.message === 'success') {
          this.$alert('设置医嘱成功', '', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              this.$emit('closeAdvice')
            }
          })
        } else {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
      })
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

.application-container {
  // padding: 0 250px;
  margin: 100px auto 100px auto;
  font-size: 12px;

  .bottom {
    margin-top: 20px;
    font-size: 16px;

    text-align: left;
    div {
      color: #b0b3b9;
    }
    .el-button {
      margin: 20px 0;
    }
  }
}
</style>
