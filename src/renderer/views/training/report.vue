<template>
  <div class>
    <el-card class="box-card">
      <div class="out-continer">
        <div class="inform-continer text-left">
          <div class="title">基本信息</div>
          <div class="line"></div>
          <div class="inform display_flex justify-content_flex-start">
            <div class="detail">
              <div class="piece">姓名：{{ patientInfo.name }}</div>
              <div class="piece">账号：{{ patientInfo.phone }}</div>
              <div class="piece">性别：{{ patientInfo.sex ? "男" : "女" }}</div>
              <div class="piece">年龄：{{ patientInfo.age }}岁</div>
            </div>
            <div class="detail">
              <div class="piece">身高：{{ patientInfo.height }}cm</div>
              <div class="piece">体重：{{ patientInfo.weight }}kg</div>
              <div class="piece">偏瘫侧：{{ hemiVal }}</div>
              <div class="piece">盆骨高度：{{ patientInfo.pelv }}cm</div>
            </div>
          </div>
        </div>
        <div class="inform-continer text-left" v-if="reportData.WTime">
          <div class="title">行走训练</div>
          <div class="line"></div>
          <div class="inform display_flex justify-content_flex-start">
            <div class="detail">
              <div class="piece">模式：{{ WalkModeVal }}</div>
              <div class="piece">减重：{{ reportData.WImponderability }}kg</div>
              <div class="piece">总时间：{{ reportData.WTime }}min</div>
              <div class="piece">总距离：{{ reportData.WDistance }}m</div>
            </div>
            <div class="detail">
              <div class="piece">总步数：{{ reportData.WSteps }}步</div>
              <div class="piece">平均步频：{{ reportData.WAvgFrequency }}个/min</div>
              <div class="piece">平均步数：{{ reportData.WAvgStep }}步</div>
            </div>
            <div class="detail">
              <div class="piece">平均步态周期：{{ reportData.WAvgGaitPeriod }}s</div>
              <div class="piece">阻力：{{ reportData.WForce }}N</div>
            </div>
          </div>
        </div>
        <div class="inform-continer text-left" v-if="reportData.STime">
          <div class="title">坐站训练</div>
          <div class="line"></div>
          <div class="inform display_flex justify-content_flex-start">
            <div class="detail">
              <div class="piece">模式：{{ SitAndStandModeVal }}</div>
              <div class="piece">减重：{{ reportData.SImponderability }}kg</div>
              <div class="piece">总时间：{{ reportData.STime }}min</div>
              <div class="piece">总个数：{{ reportData.SNumber }}个</div>
            </div>
            <div class="detail">
              <div class="piece">单个最短坐站时间：{{ reportData.SMinTime }}s</div>
              <div class="piece">单个最长坐站时间：{{ reportData.SMaxTime }}s</div>
              <div class="piece">平均坐站时间：{{ reportData.SAvgTime }}s</div>
            </div>
          </div>
        </div>
        <div class="inform-continer text-left" v-if="reportData.GTime">
          <div class="title">游戏训练</div>
          <div class="line"></div>
          <div class="inform display_flex justify-content_flex-start">
            <div class="detail">
              <div class="piece">类型：{{ GameModeVal }}</div>
              <div class="piece">时间：{{ reportData.GTime }}min</div>
            </div>
            <div class="detail">
              <div class="piece">游戏难度：{{ GDifficultyVal }}</div>
            </div>
            <div class="detail">
              <div class="piece">评分：{{ reportData.GScore }}</div>
            </div>
          </div>
        </div>
        <div class="inform-continer text-left" v-if="reportData.BTime">
          <div class="title">平衡训练</div>
          <div class="line"></div>
          <div class="inform display_flex justify-content_flex-start">
            <div class="detail">
              <div class="piece">模式：{{ BalanceModeVal }}</div>
              <div class="piece">减重：{{ reportData.BImponderability }}kg</div>
              <div class="piece">总时间：{{ reportData.BTime }}min</div>
            </div>
            <div class="detail">
              <div class="piece">最大前倾：{{ reportData.BMaxFrontLean }}mm</div>
              <div class="piece">最大左顷：{{ reportData.BMaxLeftLean }}mm</div>
              <div class="piece">轨迹面积：{{ reportData.BTrajectoryArea }}mm²</div>
            </div>
            <div class="detail">
              <div class="piece">最大后倾：{{ reportData.BMaxBackLean }}mm</div>
              <div class="piece">最大右顷：{{ reportData.BMaxRightLean }}mm</div>
              <div class="piece">轨迹长度：{{ reportData.BTrajectoryLength }}mm</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchReport } from '@/api/training.js'
import { fetchPatientInfo } from '@/api/detail.js'
export default {
  name: 'summaryReport',
  components: {},
  data() {
    return {
      leftImg: '',
      patientid: '',
      reportid: '',
      reportData: [],
      patientInfo: []
    }
  },
  props: {
    selectInfo: {
      type: Object,
      default: () => { }
    }
  },
  created() {
    this.patientid = this.$store.state.user.patientInfo.id
    this.reportid = this.selectInfo.planid
    this.initPatientInfo()
    this.initReport()
  },
  methods: {
    initPatientInfo() {
      var params = {
        patientid: this.patientid
      }
      fetchPatientInfo(params).then(res => {
        this.patientInfo = res.data
      })
    },
    // 获取报告
    initReport() {
      var params = {
        reportid: this.reportid
      }
      fetchReport(params).then(res => {
        this.reportData = res.data
      })
    }
  },
  computed: {
    hemiVal: function () {
      var hemiVal
      if (this.patientInfo.hemi === 0) hemiVal = '未知'
      else if (this.patientInfo.hemi === 1) hemiVal = '左'
      else if (this.patientInfo.hemi === 2) hemiVal = '右'
      else if (this.patientInfo.hemi === 3) hemiVal = '双侧'
      return hemiVal
    },
    WalkModeVal: function () {
      var val
      if (this.reportData.WalkMode === 0) val = '跟随'
      else if (this.reportData.WalkMode === 1) val = '阻力'
      else if (this.reportData.WalkMode === 2) val = '主动'
      return val
    },
    SitAndStandModeVal: function () {
      var val
      if (this.reportData.SitAndStandMode === 0) val = '跟随'
      else if (this.reportData.SitAndStandMode === 1) val = '阻力'
      else if (this.reportData.SitAndStandMode === 2) val = '主动'
      return val
    },
    BalanceModeVal: function () {
      var val
      if (this.reportData.BalanceMode === 0) val = '--'
      else if (this.reportData.BalanceMode === 5) val = '左脚'
      else if (this.reportData.BalanceMode === 6) val = '右脚'
      else if (this.reportData.BalanceMode === 7) val = '双脚'
      else if (this.reportData.BalanceMode === 8) val = 'FRT'
      return val
    },
    GameModeVal: function () {
      var val
      if (this.reportData.GameMode === 0) val = '--'
      if (this.reportData.GameMode === 3) val = '七巧板'
      else if (this.reportData.GameMode === 4) val = '太空'
      return val
    },
    GDifficultyVal: function () {
      var val
      if (this.reportData.GDifficulty === 1) val = '简单'
      if (this.reportData.GDifficulty === 2) val = '普通'
      else if (this.reportData.GDifficulty === 3) val = '困难'
      return val
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

.mycontainer {
  width: 880px;
  min-height: 100%;
  margin: 0 auto;
  background: #fcfcfe;
  padding: 0 20px;
}

.container {
  height: 100%;
  .box-card {
    height: calc(100% - 160px);
    overflow: scroll;
    padding: 40px 40px 0 40px;
  }
}
.out-continer {
  .inform-continer {
    height: 270px;
    .title {
      background-color: #ededed;
      border: 1px solid #908888;
      display: inline-block;
      font-size: 16px;
      height: 24px;
      line-height: 24px;
      padding: 0 10px;
    }
    .line {
      height: 1;
      border-top: 1px solid #554b4b;
    }
    .inform {
      padding: 30px;
      .detail {
        width: 33.3%;
        .piece {
          font-size: 14px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
