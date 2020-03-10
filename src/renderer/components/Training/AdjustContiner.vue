// 调节组件
<template>
  <div class="adjust-container" :class="disable?'':config.fontColor">
    <div
      class="top hand"
      :class="(type==8||type==9||type==10||type==11)?'small':''"
      @click="selectClick()"
    >
      <img :src="disable==true?config.imgsrcGray:config.imgsrc" />
      <div>{{config.title}}</div>
    </div>

    <!-- 下面的加减按钮 -->
    <div class="bottom" v-if="type!=6&&type!=7">
      <Adjust
        v-for="(item,index) in config.adjusts"
        :key="index"
        :disable="disable"
        :adjust="config.adjusts[index]"
        :fontColor="config.fontColor"
      ></Adjust>
      <div class="switch-continar" v-if="type==2">
        <div>
          <span>方向限定</span>
          <el-switch :disabled="disable" v-model="config.switch" active-color="#8da1f2">></el-switch>
        </div>
        <div class="direction" :class="{'disable':config.switch}">
          <button
            :style="{color:(config.tabActive == 0) ? '#8da1f2':'black'}"
            @click="config.tabActive = 0"
            :disabled="disable"
          >全向</button>
          <button
            :style="{color:(config.tabActive == 1) ? '#8da1f2':'black'}"
            @click="config.tabActive = 1"
            :disabled="disable"
          >直行+后退</button>
          <button
            :style="{color:(config.tabActive == 2) ? '#8da1f2':'black'}"
            @click="config.tabActive = 2"
            :disabled="disable"
          >直行</button>
        </div>
      </div>
    </div>
    <div v-else-if="type==6">
      <el-radio-group v-model="config.radio" :disabled="disable">
        <el-radio :label="1">易</el-radio>
        <el-radio :label="2">中</el-radio>
        <el-radio :label="3">难</el-radio>
      </el-radio-group>
    </div>
    <div v-else-if="type==7">
      <el-radio-group v-model="config.radio" :disabled="disable">
        <el-radio :label="1">易</el-radio>
        <el-radio :label="2">中</el-radio>
        <el-radio :label="3">难</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import Adjust from '@/components/training/Adjust.vue'
export default {
  name: 'AdjustContiner',
  components: {
    Adjust
  },
  props: {
    type: {
      type: Number,
      default: 0
    },
    disable: {
      type: Boolean,
      default: true
    },
    stepData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    lastPlanData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  data() {
    return {
      config: {}
    }
  },

  created() {
    this.initData()
  },
  mounted() {
    // console.log('lastPlanData:' + this.lastPlanData)
  },
  methods: {
    selectClick() {
      if (!this.disable) return
      this.$emit('selectRightClick', this.type)
    },

    initData() {
      if (this.type === 1) {
        this.config = {
          title: '跟随模式',
          imgsrc: require('../../assets/images/followmode_1.png'),
          imgsrcGray: require('../../assets/images/followmode_2.png'),
          width: '120px',
          fontColor: 'purpleFontColor',
          adjusts: [
            {
              name: '减重',
              step: this.stepData.WFollowing_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WFollowing_Imponderability / this.stepData.WFollowing_Imponderability) : 0,
              unit: 'KG'
            },
            {
              name: '定距',
              step: this.stepData.WFollowing_FixedDistance,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WFollowing_FixedDistance / this.stepData.WFollowing_FixedDistance) : 0,
              unit: 'M'
            },
            {
              name: '速度',
              step: this.stepData.WFollowing_Speed,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WFollowing_Speed / this.stepData.WFollowing_Speed) : 0,
              unit: 'M/min'
            }
          ]
        }
      } else if (this.type === 2) {
        this.config = {
          title: '主动模式',
          imgsrc: require('../../assets/images/activemode_1.png'),
          imgsrcGray: require('../../assets/images/activemode_2.png'),
          width: '120px',
          fontColor: 'purpleFontColor',
          switchswitch: true, // 方向限定
          tabActive: this.lastPlanData.details ? (this.lastPlanData.details.WInitiative_Direction) : 0, // 方向
          adjusts: [
            {
              name: '减重',
              step: this.stepData.WInitiative_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WInitiative_Imponderability / this.stepData.WInitiative_Imponderability) : 0,
              unit: 'KG'
            },
            {
              name: '阻力',
              step: this.stepData.WInitiative_Force,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WInitiative_Force / this.stepData.WInitiative_Force) : 0,
              unit: 'N'
            },
            {
              name: '定距',
              step: this.stepData.WInitiative_FixedDistance,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WInitiative_FixedDistance / this.stepData.WInitiative_FixedDistance) : 0,
              unit: 'M'
            }
          ]
        }
      } else if (this.type === 3) {
        this.config = {
          title: '阻力模式',
          imgsrc: require('../../assets/images/resistancemode_1.png'),
          imgsrcGray: require('../../assets/images/resistancemode_2.png'),
          width: '120px',
          fontColor: 'purpleFontColor',
          adjusts: [
            {
              name: '减重',
              step: this.stepData.WResistance_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WResistance_Imponderability / this.stepData.WResistance_Imponderability) : 0,
              unit: 'KG'
            },
            {
              name: '阻力',
              step: this.stepData.WResistance_Force,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WResistance_Force / this.stepData.WResistance_Force) : 0,
              unit: 'N'
            },
            {
              name: '定距',
              step: this.stepData.WResistance_FixedDistance,
              total: this.lastPlanData.details ? (this.lastPlanData.details.WResistance_FixedDistance / this.stepData.WResistance_FixedDistance) : 0,
              unit: 'M'
            }
          ]
        }
      } else if (this.type === 4) {
        this.config = {
          title: '跟随模式',
          imgsrc: require('../../assets/images/followmode_0.png'),
          imgsrcGray: require('../../assets/images/followmode_2.png'),
          width: '120px',
          fontColor: 'pinkFontColor',
          adjusts: [
            {
              name: '速度',
              step: this.stepData.SFollowing_Speed,
              total: this.lastPlanData.details ? (this.lastPlanData.details.SFollowing_Speed / this.stepData.SFollowing_Speed) : 0,
              unit: 'M/min'
            },
            {
              name: '计数',
              step: this.stepData.SFollowing_Count,
              total: this.lastPlanData.details ? (this.lastPlanData.details.SFollowing_Count / this.stepData.SFollowing_Count) : 0,
              unit: '次'
            }
          ]
        }
      } else if (this.type === 5) {
        this.config = {
          title: '主动模式',
          imgsrc: require('../../assets/images/activemode_0.png'),
          imgsrcGray: require('../../assets/images/activemode_2.png'),
          width: '120px',
          fontColor: 'pinkFontColor',
          adjusts: [
            {
              name: '减重',
              step: this.stepData.SInitiative_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.SInitiative_Imponderability / this.stepData.SInitiative_Imponderability) : 0,
              unit: 'KG'
            },
            {
              name: '计数',
              step: this.stepData.SInitiative_Count,
              total: this.lastPlanData.details ? (this.lastPlanData.details.SInitiative_Count / this.stepData.SInitiative_Count) : 0,
              unit: '次'
            }
          ]
        }
      } else if (this.type === 6) {
        this.config = {
          title: '七巧板',
          imgsrc: require('../../assets/images/Tangram_1.png'),
          imgsrcGray: require('../../assets/images/Tangram_2.png'),
          fontColor: 'pinkFontColor',
          radio: this.lastPlanData.details ? this.lastPlanData.details.GWall_Intensity : 1
        }
      } else if (this.type === 7) {
        this.config = {
          title: '太空飞行',
          imgsrc: require('../../assets/images/Spaceflight_1.png'),
          imgsrcGray: require('../../assets/images/Spaceflight_2.png'),
          fontColor: 'greenFontColor',
          radio: this.lastPlanData.details ? this.lastPlanData.details.GPlane_Intensity : 1
        }
      } else if (this.type === 8) {
        this.config = {
          title: '左脚减重',
          imgsrc: require('../../assets/images/leftfoot_01.png'),
          imgsrcGray: require('../../assets/images/leftfoot_02.png'),
          width: '120px',
          fontColor: 'greenFontColor',
          adjusts: [
            {
              name: '减重',
              step: this.stepData.BLeft_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.BLeft_Imponderability / this.stepData.BLeft_Imponderability) : 0,
              unit: 'KG'
            }
          ]
        }
      } else if (this.type === 9) {
        this.config = {
          title: '右脚减重',
          imgsrc: require('../../assets/images/rightfoot_01.png'),
          imgsrcGray: require('../../assets/images/rightfoot_02.png'),
          width: '120px',
          fontColor: 'greenFontColor',
          adjusts: [
            {
              name: '减重',
              step: this.stepData.BRight_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.BRight_Imponderability / this.stepData.BRight_Imponderability) : 0,
              unit: 'KG'
            }
          ]
        }
      } else if (this.type === 10) {
        this.config = {
          title: '双脚减重',
          imgsrc: require('../../assets/images/bothfoot_01.png'),
          imgsrcGray: require('../../assets/images/bothfoot_02.png'),
          width: '120px',
          fontColor: 'greenFontColor',
          adjusts: [
            {
              name: '减重',
              step: this.stepData.BBoth_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.BBoth_Imponderability / this.stepData.BBoth_Imponderability) : 0,
              unit: 'KG'
            }
          ]
        }
      } else if (this.type === 11) {
        this.config = {
          title: 'FRT减重',
          imgsrc: require('../../assets/images/frtmode_01.png'),
          imgsrcGray: require('../../assets/images/frtmode_02.png'),
          width: '120px',
          fontColor: 'greenFontColor',
          adjusts: [
            {
              name: '减重',
              step: this.stepData.BFRT_Imponderability,
              total: this.lastPlanData.details ? (this.lastPlanData.details.BFRT_Imponderability / this.stepData.BFRT_Imponderability) : 0,
              unit: 'KG'
            }
          ]
        }
      }
    }
  },
  computed: {
    switch() {
      return this.config.switch
    }
  },
  watch: {
    switch(newValue, oldValue) {
      if (newValue) {
        this.config.tabActive = 0
      }
    }
  }
}
</script>

<style scoped lang="scss">
.adjust-container.large {
  //width: 178px;
  padding: 20px 20px;
  .top {
    padding: 0 0 30px 0;
    font-size: 20px;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .bottom {
    position: relative;
  }

  .switch-continar {
    position: absolute;
    bottom: -35px;
    left: 0;
    color: black;
    font-size: 12px;
    .direction {
      margin-top: 10px;
      span {
        cursor: pointer;
        margin: 0 10px;
      }
    }
  }
}

//小控件样式
.adjust-container.small {
  //width: 130px;
  padding: 10px;
  .top {
    padding: 0 0 30px 0;
    font-size: 20px;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>

<style  lang="scss">
.adjust-container {
  button,
  button:focus {
    border: none;
    background: white;
    outline: none;
  }
  .el-radio__label {
    position: absolute;
    left: 0;
    top: -20px;
    padding-left: 0;
  }
  .el-radio-group {
    margin-top: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .disable {
    pointer-events: none;
  }
}
</style>
          
          
         