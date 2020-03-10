<template>
  <el-row>
    <el-col :span="24" class="header">
      <div
        class="header-left f-left display_flex justify-content_flex-center align-items_center"
        style="cursor: pointer;"
        @click="jumpDoctorInform"
      >
        <el-avatar :size="70" v-if="geticonurl" :src="geticonurl"></el-avatar>
        <el-avatar :size="70" v-else :src="require('../../../assets/images/doctor.png')"></el-avatar>

        <div
          class="display_flex flex-direction_column justify-content_flex-center align-items_center margin-left-10"
        >
          <div class="name">{{ name }}</div>
          <div class="job">医生</div>
        </div>
      </div>
      <div class="header-middle-name f-left">{{titleName}}</div>
      <div class="header-middle f-left">{{title}}</div>
      <div class="header-right f-right" style="height: 100px;">
        <slot name="right"></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    msg: String,
    leftImg: {
      type: String,
      default: '../../assets/images/logo.png'
    },
    title: { String, default: '' },
    titleName: { String, default: '' }
  },

  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'roles', 'iconurl']),
    geticonurl() {
      if (this.iconurl) {
        return 'http://www.irego.cn/static/upload/' + this.iconurl
      } else {
        return ''
      }
    }
  },
  created() {
    window.vue = this
  },
  beforeDestroy() { },
  beforeMount() { },
  mounted() { },
  destroyed() { },
  methods: {
    jumpDoctorInform() {
      this.$router.push({
        path: '/detail/index',
        // name: 'detailInform',
        query: { type: 'doctor' }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../../styles/index.scss';
.header {
  height: 100px;
  line-height: 100px;
  .header-left {
    height: 100%;
    text-align: left;
    margin-right: 30px;
    .avatar {
      width: 80px;
      height: 80px;
    }
    .name {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
    }
    .job {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #b0b3b9;
    }
  }
  .header-middle-name {
    font-size: 25px;

    color: $yellowFontColor;
  }
  .header-middle {
    font-size: 25px;

    color: $purpleFontColor;
  }
  .header-right {
    height: 100%;
  }
}
</style>
