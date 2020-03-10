<template>
  <el-row>
    <el-col :span="24" class="header">
      <div class="header-left f-left display_flex justify-content_flex-center align-items_center">
        <img :src="leftImg" />
      </div>

      <div class="header-middle f-left">{{title}}</div>

      <div class="header-right f-right" style="height: 100px;">
        <slot name="right"></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
    leftImg: {
      type: String,
      default: '../../assets/images/logo.png'
    },
    title: { String, default: '' }
  },

  data() {
    return {}
  },

  created() {
    // // console.log(this.$store.state.userInfo)
  },
  beforeDestroy() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../../styles/index.scss';
.header {
  height: 100px;
  line-height: 100px;
  .header-left {
    height: 100%;
    img {
      width: 150px;
    }
  }
  .header-middle {
    font-size: 25px;
    padding-left: 20px;
  }
  .header-right {
    height: 100%;
  }
}

::v-deep .header-right-div {
  height: 100%;
}
</style>
