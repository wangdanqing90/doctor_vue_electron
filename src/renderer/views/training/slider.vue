/* eslint-disable vue/no-unused-vars */
<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="../../assets/images/certain.png" @click="okClick()" class="cursor" />
          <img src="../../assets/images/back.png" @click="goBack" class="cursor" />
        </div>
      </template>
    </HeaderDoctor>

    <el-card class="box-card">
      <div class="inform-container">
        <div class="title">手动选择</div>
        <div class="tips display_flex justify-content_flex-around align-items_center">
          <div class="display_flex justify-content_flex-start align-items_center">
            <div class="tip1"></div>
            <div class="tipName">行走训练</div>
          </div>
          <div class="display_flex justify-content_flex-start align-items_center">
            <div class="tip2"></div>
            <div class="tipName">坐站训练</div>
          </div>
          <div class="display_flex justify-content_flex-start align-items_center">
            <div class="tip3"></div>
            <div class="tipName">游戏训练</div>
          </div>
          <div class="display_flex justify-content_flex-start align-items_center">
            <div class="tip4"></div>
            <div class="tipName">平衡测定</div>
          </div>
        </div>

        <vue-slider
          v-model="value"
          tooltip="none"
          :process="process"
          :min-range="0"
          :contained="true"
          :enable-cross="true"
          :height="100"
          :dot-options="dotOptions"
          :min="0"
          :max="30"
        >
          <template v-slot:process="{ start, end, style, index }">
            <div class="vue-slider-process" :style="style">
              <div
                :class="[
              'merge-tooltip',
              'vue-slider-dot-tooltip-inner',
              'vue-slider-dot-tooltip-inner-top'
            ]"
              >{{ value[index + 1]-value[index] }}min</div>
            </div>
          </template>
        </vue-slider>
      </div>
    </el-card>
    <span class="demoSpan1"></span>

    <el-row>
      <el-col :span="24" class="inform-container"></el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderDoctor from '@/components/page/HeaderDoctor/HeaderDoctor.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { fetchPlanInfo, locktimeidput, locktimeiddelete } from '@/api/training.js'

export default {
  name: 'trainingPlan',
  components: {
    HeaderDoctor,
    VueSlider
  },

  data() {
    return {
      leftImg: '',
      planid: this.$route.query.planid,
      patientid: this.$store.state.user.patientInfo.id,
      value: [],
      process: val => [
        [val[0], val[1], { backgroundColor: '#8da1f2' }],
        [val[1], val[2], { backgroundColor: '#fd8dad' }],
        [val[2], val[3], { backgroundColor: '#fec85a' }],
        [val[3], val[4], { backgroundColor: '#a6e3dd' }]
      ],
      dotOptions: [
        {
          disabled: true
        },
        {
          disabled: false
        },
        {
          disabled: false
        },
        {
          disabled: false
        },
        {
          disabled: true
        }
      ],
      isLoaded: true,
      timer: '',
    }
  },
  created() {
    this.leftImg = require('../../assets/images/logo.png')
    this.title = '的训练模式选择'
    this.titleName = this.$store.state.user.patientInfo.name
    //if (!this.common.isNullOrBlank(this.planid)) {
    this.initLastPlan()
    // } else {
    //   this.value = [0, 8, 16, 24, 30]
    // }
    this.newClickInterval();
  },
  computed: {
    walkValue: function () {
      return this.value[1]
    },
    sitValue: function () {
      return this.value[2] - this.value[1]
    },
    gameValue: function () {
      return this.value[3] - this.value[2]
    },
    balanceValue: function () {
      return this.value[4] - this.value[3]
    }
  },
  methods: {
    //删除锁定id
    deletelocktimeid() {
      var params = {
        modelid: 1
      }
      locktimeiddelete(params).then(res => {
        if (res.message === 'success') {
          console.log('删除锁定时间success')
        } else {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
      })
    },
    initLastPlan() {
      const planInfoTemp = this.$store.state.user.planInfoTemp;
      //读取保存的选择
      if (!this.common.isNullOrBlank(planInfoTemp) && !this.common.isNullOrBlank(planInfoTemp.Walk_Time) && !this.common.isNullOrBlank(planInfoTemp.Gaming_Time) && !this.common.isNullOrBlank(planInfoTemp.Balance_Time) && !this.common.isNullOrBlank(planInfoTemp.SitAndStand_Time)) {
        this.value = [0]
        this.value.push(planInfoTemp.Walk_Time)
        this.value.push(planInfoTemp.Walk_Time + planInfoTemp.SitAndStand_Time)
        this.value.push(planInfoTemp.Walk_Time + planInfoTemp.SitAndStand_Time + planInfoTemp.Gaming_Time)
        this.value.push(30)
      } else {
        if (!this.common.isNullOrBlank(this.planid)) {
          //读取上次制定的计划
          var params = {
            planid: this.planid,
            patientid: this.patientid
          }
          fetchPlanInfo(params).then(res => {
            const data = res.data
            const wt = data.details.Walk_Time
            const st = data.details.SitAndStand_Time
            const gt = data.details.Gaming_Time
            this.value = [0]

            this.value.push(wt)
            this.value.push(wt + st)
            this.value.push(wt + st + gt)
            this.value.push(30)
          })

        } else {
          this.value = [0, 8, 16, 24, 30]
        }

      }
    },
    okClick() {
      var info = {}
      info['Walk_Time'] = this.walkValue
      info['Gaming_Time'] = this.gameValue
      info['Balance_Time'] = this.balanceValue
      info['SitAndStand_Time'] = this.sitValue
      // this.$store.dispatch('savePlanInfo', info)
      this.$store.dispatch('savePlanInfoTemp', info)

      if (!this.common.isNullOrBlank(this.planid)) {
        this.$router.push({
          path: '/training/setting',
          query: { planid: this.planid }
        })
      } else {
        this.$router.push({
          path: '/training/setting',
          query: {}
        })
      }
    },
    goBack() {
      this.deletelocktimeid()
      this.$router.go(-1)
    },
    //开启计时器
    newClickInterval() {
      var _this = this
      this.timer = setInterval(function () {
        _this.isLoaded && _this.startmyInterval();
      }, 3000);
    },
    startmyInterval() {
      this.isLoaded = false
      // 锁定时间
      var params = {
        modelid: 1
      }
      locktimeidput(params).then(res => {
        this.isLoaded = true
        if (res.message === 'success') {
          console.log('锁定时间Intervalsuccess')
        } else {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
      })
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  watch: {}
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.header {
  .header-right {
    img {
      width: 50px;
      margin-left: 20px;
    }
  }
}
.inform-container {
  padding: 0 250px;
  margin: 100px auto 100px auto;
  font-size: 12px;
  .title {
    font-size: 24px;
  }
  .tips {
    height: 100px;
    margin-bottom: 50px;
    .tipName {
      margin-left: 10px;
      font-size: 16px;
    }
    .tip1,
    .tip2,
    .tip3,
    .tip4 {
      display: inline-block;
      width: 30px;
      height: 40px;
      border-radius: 5px;
    }
    .tip1 {
      background: $purpleFontColor;
    }
    .tip2 {
      background: $pinkFontColor;
    }
    .tip3 {
      background: $yellowFontColor;
    }
    .tip4 {
      background: $greenFontColor;
    }
  }
}
</style>

<style  lang="scss">
.merge-tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -15px);
}
.vue-slider-dot-handle {
  position: relative;
  top: 60px;
}
.vue-slider-process {
  border-radius: 0;
}
.vue-slider-process {
  border-radius: 0;
}

.vue-slider-rail .vue-slider-process:nth-child(1) .merge-tooltip {
  border-color: #8da1f2;
  background-color: #8da1f2;
}
.vue-slider-rail .vue-slider-process:nth-child(2) .merge-tooltip {
  border-color: #fd8dad;
  background-color: #fd8dad;
}
.vue-slider-rail .vue-slider-process:nth-child(3) .merge-tooltip {
  border-color: #fec85a;
  background-color: #fec85a;
}
.vue-slider-rail .vue-slider-process:nth-child(4) .merge-tooltip {
  border-color: #a6e3dd;
  background-color: #a6e3dd;
}

.vue-slider-rail .vue-slider-dot-handle-disabled {
  display: none;
}

.custom-dot {
  width: 100%;
  height: 100%;
  border-radius: 0;
  background-color: pink;
  transition: all 0.3s;
}
.custom-dot:hover {
  transform: rotateZ(45deg);
}
.custom-dot.focus {
  border-radius: 50%;
}

.vue-slider-dot-handle {
  height: 40px;
  width: 26px;
  display: block;
  position: relative;
}

.vue-slider-dot-handle {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: none;
  background-color: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.vue-slider-dot-handle:before {
  content: '';
  height: 20px;
  width: 20px;
  border: 5px solid #d8d8da;
  display: block;
  position: absolute;
  top: 1px;
  left: -3px;
  z-index: 1;
  line-height: 26px;
  border-radius: 40px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;

  background-color: #d8d8da;
  text-align: center;
}

.vue-slider-dot-handle:after {
  content: '';
  height: 0px;
  width: 0px;
  display: block;
  position: absolute;
  top: -3px;
  left: -3px;
  border: 10px transparent solid;
  border-top-width: 0;
  border-bottom-color: #d8d8da;
}
.vue-slider-rail {
  border-radius: 0;
}
</style>
