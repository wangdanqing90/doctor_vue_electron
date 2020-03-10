<template>
  <div class="app-container">
    <div class="" style="width: 100%; margin: 0 auto;">
      <Header :leftImg="leftImg"></Header>
      <el-row class="inform-container" style="text-align: center;">
        <el-card class="box-card">
          <el-col :span="24">
            <div v-if="type==='success'">
              <div class="informSuccess">{{ message }}</div>
            </div>
            <div v-else-if="type==='fail'">
              <div class="informFail">{{message}}</div>
              <div class="failReason">{{ failReason }}</div>
            </div>

            <div class="timer">页面将在{{count}}秒后跳转回登录页面</div>
          </el-col>
          <el-col :span="24" class="margin-top-80 margin-bottom-50 confirm-button">
            <el-button class="purple" @click="backClick">确认</el-button>
          </el-col>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Page/Header/Header.vue'

export default {
  name: 'result',
  components: {
    Header
  },

  data() {
    return {
      leftImg: '',
      type: '',
      message: '',
      failReason: '',
      count: '',
      timer: null
    }
  },
  created() {
    this.leftImg = require('../../assets/images/logo.png')
    this.type = this.$route.query.type

    if (this.$route.query.message) {
      this.message = this.$route.query.message
    }
    if (this.$route.query.failReason) {
      this.failReason = this.$route.query.failReason
    }
    this.getCode()
  },
  methods: {
    getCode() {
      const TIME_COUNT = 5
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 1 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.backClick()
          }
        }, 1000)
      }
    },
    backClick() {
      clearInterval(this.timer)
      this.timer = null
      this.$router.push({
        path: '/login'
      })
    }
  },
  watch: {}
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.inform-container {
  width: 800px;
  margin: 30px auto 30px auto;
}
.inform-container {
  margin: 100px auto 50px auto;
  .informSuccess {
    color: $purpleFontColor;
    font-size: 30px;
    padding: 20px;
  }
  .informFail {
    color: #fa8caa;
    font-size: 30px;
    padding: 20px;
  }
  .timer {
    font-size: 18px;
  }
  .failReason {
    font-size: 16px;
    color: #959595;
    padding-bottom: 20px;
  }
}

.confirm-button {
  .el-button {
    width: 230px;
  }
}
</style>
