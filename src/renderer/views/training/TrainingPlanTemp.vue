<template>
  <div class="mycontainer">
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
import { fetchPlanInfo } from '@/api/training.js'
export default {
  name: 'trainingPlanTemp',
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: '',
      planInfo: ''
    }
  },
  props: {
    selectInfo: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    window.vue = this
    this.patientid = this.$store.state.user.patientInfo.id
    this.planid = this.selectInfo.planid

    var params = {
      planid: this.planid,
      patientid: this.patientid
    }
    fetchPlanInfo(params).then(res => {
      this.planInfo = res.data.details
    })
  },
  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.inform-container {
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
