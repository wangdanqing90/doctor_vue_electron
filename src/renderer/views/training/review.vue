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

    <el-row>
      <el-card class="box-card">
        <el-col :span="24" class="inform-container">
          <!-- 行走模式 -->
          <div
            v-if="planInfo.Walk_Time>0"
            class="inform display_flex justify-content_flex-start align-items_center purpleFontColor"
          >
            <div
              class="left display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <img src="../../assets/images/walkingtraining.png" />
              <div>行走训练</div>
            </div>
            <div
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>时间</div>
              <div class="font">{{planInfo.Walk_Time}}min</div>
            </div>
            <!-- 跟随模式 -->
            <div
              v-if="planInfo.Walk_Mode == 0"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">跟随</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 0"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.WFollowing_Imponderability}}kg</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 0"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>定距</div>
              <div class="font">{{planInfo.WFollowing_FixedDistance}}M</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 0"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>速度</div>
              <div class="font">{{planInfo.WFollowing_Speed}}M/min</div>
            </div>

            <!-- 主动模式 -->
            <div
              v-if="planInfo.Walk_Mode == 2"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">主动</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 2"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.WInitiative_Imponderability}}kg</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 2"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>阻力</div>
              <div class="font">{{planInfo.WInitiative_Force}}M</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 2"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>定距</div>
              <div class="font">{{planInfo.WInitiative_FixedDistance}}MM/s</div>
            </div>

            <!-- 阻力模式 -->
            <div
              v-if="planInfo.Walk_Mode == 1"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">阻力</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 1"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.WResistance_Imponderability}}kg</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 1"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>阻力</div>
              <div class="font">{{planInfo.WResistance_Force}}M</div>
            </div>
            <div
              v-if="planInfo.Walk_Mode == 1"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>定距</div>
              <div class="font">{{planInfo.WResistance_FixedDistance}}MM/s</div>
            </div>
          </div>

          <!-- 坐站训练 -->
          <div
            v-if="planInfo.SitAndStand_Time>0"
            class="inform display_flex justify-content_flex-start align-items_center pinkFontColor"
          >
            <div
              class="left display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <img src="../../assets/images/stationtraining.png" />
              <div>坐站训练</div>
            </div>
            <div
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>时间</div>
              <div class="font">{{planInfo.SitAndStand_Time}}min</div>
            </div>
            <!-- 跟随模式 -->
            <div
              v-if="planInfo.SitAndStand_Mode == 0"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">跟随</div>
            </div>
            <div
              v-if="planInfo.SitAndStand_Mode == 0"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>速度</div>
              <div class="font">{{planInfo.SFollowing_Speed}}M/min</div>
            </div>
            <div
              v-if="planInfo.SitAndStand_Mode == 0"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>计数</div>
              <div class="font">{{planInfo.SFollowing_Count}}次</div>
            </div>

            <!-- 主动模式 -->
            <div
              v-if="planInfo.SitAndStand_Mode == 2"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">主动</div>
            </div>
            <div
              v-if="planInfo.SitAndStand_Mode == 2"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.SInitiative_Imponderability}}kg</div>
            </div>
            <div
              v-if="planInfo.SitAndStand_Mode == 2"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>计数</div>
              <div class="font">{{planInfo.SInitiative_Count}}次</div>
            </div>
          </div>

          <!-- 游戏训练 -->
          <div
            v-if="planInfo.Gaming_Time>0"
            class="inform display_flex justify-content_flex-start align-items_center yellowFontColor"
          >
            <div
              class="left display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <img src="../../assets/images/gametraining.png" />
              <div>游戏训练</div>
            </div>
            <div
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>时间</div>
              <div class="font">{{planInfo.Gaming_Time}}min</div>
            </div>
            <!-- 七巧板 -->
            <div
              v-if="planInfo.Gaming_Mode == 3"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">七巧板</div>
            </div>
            <div
              v-if="planInfo.Gaming_Mode == 3"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>难易度</div>
              <div class="font" v-if="planInfo.GWall_Intensity == 1">易</div>
              <div class="font" v-else-if="planInfo.GWall_Intensity == 2">中</div>
              <div class="font" v-else-if="planInfo.GWall_Intensity == 3">难</div>
            </div>
            <!-- 太空模式 -->
            <div
              v-if="planInfo.Gaming_Mode == 4"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">太空模式</div>
            </div>
            <div
              v-if="planInfo.Gaming_Mode == 4"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>难易度</div>
              <div class="font" v-if="planInfo.GPlane_Intensity == 1">易</div>
              <div class="font" v-else-if="planInfo.GPlane_Intensity == 2">中</div>
              <div class="font" v-else-if="planInfo.GPlane_Intensity == 3">难</div>
            </div>
          </div>

          <!-- 平衡测定 -->
          <div
            v-if="planInfo.Balance_Time>0"
            class="inform display_flex justify-content_flex-start align-items_center greenFontColor"
          >
            <div
              class="left display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <img src="../../assets/images/balancedetermination.png" />
              <div>平衡测定</div>
            </div>
            <div
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>时间</div>
              <div class="font">{{planInfo.Balance_Time}}min</div>
            </div>
            <!-- 左脚减重 -->
            <div
              v-if="planInfo.Balance_Mode == 5"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">左脚减重</div>
            </div>
            <div
              v-if="planInfo.Balance_Mode == 5"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.BLeft_Imponderability}}KG</div>
            </div>
            <!-- 右脚减重 -->
            <div
              v-if="planInfo.Balance_Mode == 6"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">右脚减重</div>
            </div>
            <div
              v-if="planInfo.Balance_Mode == 6"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.BRight_Imponderability}}KG</div>
            </div>
            <!-- 双脚减重 -->
            <div
              v-if="planInfo.Balance_Mode == 7"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">双脚减重</div>
            </div>
            <div
              v-if="planInfo.Balance_Mode == 7"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.BBoth_Imponderability}}KG</div>
            </div>
            <!-- FRT减重 -->
            <div
              v-if="planInfo.Balance_Mode == 8"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>模式</div>
              <div class="font">FRT减重</div>
            </div>
            <div
              v-if="planInfo.Balance_Mode == 8"
              class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center item"
            >
              <div>减重</div>
              <div class="font">{{planInfo.BFRT_Imponderability}}KG</div>
            </div>
          </div>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import HeaderDoctor from '@/components/page/HeaderDoctor/HeaderDoctor.vue'
import { createPlanInfo, editPlanInfo, locktimeidput } from '@/api/training.js'
export default {
  name: 'trainingReview',
  components: {
    HeaderDoctor
  },


  data() {
    return {
      leftImg: '',
      planInfo: '',
      isLoaded: true,
      timer: '',
    }
  },
  created() {
    window.vue = this
    this.leftImg = require('../../assets/images/logo.png')
    this.planInfo = Object.assign({}, this.$store.state.user.planInfo, this.$store.state.user.planInfoTemp);
    this.planid = this.$route.query.planid
    var time = this.common.timeType(this.planInfo.timeid)
    this.title =
      '的本次训练计划（' + this.planInfo.plandate + '\xa0\xa0\xa0' + time + ')'

    this.titleName = this.$store.state.user.patientInfo.name
    this.newClickInterval();
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    okClick() {
      this.$confirm('您是否确认信息？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-button purple'
      })
        .then(() => {
          this.okNextClick()
        })
        .catch(() => { })
    },
    okNextClick() {
      if (this.common.isNullOrBlank(this.planid)) {
        // 新建计划
        const patientid = this.$store.state.user.patientInfo.id
        const obj = { patientid: patientid, modelid: 1 }
        const params = { ...this.planInfo, ...obj }
        createPlanInfo(params).then(res => {
          if (res.message === 'success') {
            this.$alert('添加计划成功', '', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                this.okNextClickCallback()
              }
            })
          } else {
            this.$alert(res.message, '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
        })
      } else {
        // 修改计划
        const patientid = this.$store.state.user.patientInfo.id
        const obj = { patientid: patientid, type: 0, planid: this.planid }
        const params = { ...this.planInfo, ...obj }
        editPlanInfo(params).then(res => {
          if (res.message === 'success') {
            this.$alert('修改计划成功', '', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                this.okNextClickCallback()
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
    },
    okNextClickCallback() {
      this.$store.dispatch('clearPlanInfoTemp')
      this.$router.push({
        path: '/'
      })
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
  .inform {
    height: 100px;
    border-bottom: 1px solid #e7e7e7;

    .item {
      width: 15%;
    }

    .left {
      height: 100%;
      font-size: 16px;
      img {
        width: 28px;
      }
    }
    .middle {
      height: 100%;
      div:nth-child(1) {
        color: #2c3e50;
      }
      div:nth-child(2) {
        font-size: 16px;
      }
    }
    .right {
      height: 100%;
      div:nth-child(1) {
        color: #2c3e50;
      }
      .font {
        font-size: 16px;
      }
    }
  }
}
</style>
