<template>
  <div class="container" style="width: 100%; min-width: 1300px;">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="../../assets/images/back.png" @click="goBack" class="cursor" />
        </div>
      </template>
    </HeaderDoctor>
    <el-card class="box-card main">
      <el-row :gutter="5" class="margin-bottom-20">
        <el-col :span="4" class="text-left">
          <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="getMyDateTime(dateValue)"
          ></el-date-picker>
        </el-col>

        <el-col :span="20" class="text-right">
          <div class="top">
            <div>
              <span class="red"></span>
              <span>不可预约</span>
              <span class="white"></span>
              <span>可预约</span>
              <span class="yellow"></span>
              <span>未完成</span>
              <span class="green"></span>
              <span>待完成(可修改)</span>
              <span class="purple"></span>
              <span>完成</span>
            </div>
            <div class="text-left">设备使用情况：可预约/总设备数</div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <div
            class="right-table-title"
            style="border-top: 1px solid #EEE; border-left: 1px solid #EEE; border-bottom: 1px solid #EEE;"
          >
            <el-row :span="24">
              <el-col :span="3" class="title cell">
                <div>时间</div>
              </el-col>
              <el-col :span="3" v-for="(item,index) in tableData" :key="index">
                <div class="title cell">
                  <div v-if="index == 0">周一</div>
                  <div v-if="index == 1">周二</div>
                  <div v-if="index == 2">周三</div>
                  <div v-if="index == 3">周四</div>
                  <div v-if="index == 4">周五</div>
                  <div v-if="index == 5">周六</div>
                  <div v-if="index == 6">周日</div>
                  <div>{{tableData[index].day}}</div>
                </div>
              </el-col>
            </el-row>

            <el-row :span="24">
              <el-col :span="3" class>
                <el-row :span="24" class="cell2">08:00-08:30</el-row>
                <el-row :span="24" class="cell2">08:30-09:00</el-row>
                <el-row :span="24" class="cell2">09:00-09:30</el-row>
                <el-row :span="24" class="cell2">09:30-10:00</el-row>
                <el-row :span="24" class="cell2">10:00-10:30</el-row>
                <el-row :span="24" class="cell2">10:30-11:00</el-row>
                <el-row :span="24" class="cell2">11:00-11:30</el-row>
                <el-row :span="24" class="cell2">11:30-12:00</el-row>
                <el-row :span="24" class="cell2">12:00-12:30</el-row>
                <el-row :span="24" class="cell2">12:30-13:00</el-row>
                <el-row :span="24" class="cell2">13:00-13:30</el-row>
                <el-row :span="24" class="cell2">13:30-14:00</el-row>
                <el-row :span="24" class="cell2">14:00-14:30</el-row>
                <el-row :span="24" class="cell2">14:30-15:00</el-row>
                <el-row :span="24" class="cell2">15:00-15:30</el-row>
                <el-row :span="24" class="cell2">15:30-16:00</el-row>
                <el-row :span="24" class="cell2">16:00-16:30</el-row>
                <el-row :span="24" class="cell2">16:30-17:00</el-row>
              </el-col>

              <el-col :span="3" v-for="(item1,index1) in tableData" :key="index1" :day="item1.day">
                <el-row
                  :span="24"
                  v-for="(item,index) in tableData[index1].list"
                  :key="index"
                  class="cell2"
                  :timeID="item.timeID"
                  :day="item1.day"
                >
                  <!-- 已完成 -->
                  <div
                    v-if="item.planid&&item.status==1"
                    class="purpleBackColor"
                    @contextmenu.prevent="openMenu($event,item)"
                  ></div>
                  <!-- 未完成 -->
                  <div
                    v-else-if="item.planid&&item.status==2"
                    class="yellowBackColor"
                    @contextmenu.prevent="openMenu($event,item)"
                  ></div>
                  <!-- 待完成（可修改） -->
                  <div
                    v-else-if="item.planid&&item.status==0&&item.modify == 0"
                    class="greenBackColor"
                    @contextmenu.prevent="openMenu($event,item)"
                  ></div>
                  <!-- 可预约 -->
                  <div
                    v-else-if="item.able>0"
                    @click.prevent="openNew($event,item)"
                  >{{item.able}}/{{total}}</div>
                  <!-- 不可预约 -->
                  <div v-else class="pinkBackColor" @contextmenu.prevent></div>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 右击 -->
    <div v-show="menuVisible" style="z-index: 999;">
      <ul id="menu" class="menu">
        <li class="menu_item hand" @click="detailClick" v-if="selectInfo.planid">
          <i class="el-icon-document-copy"></i>查看
        </li>
        <li
          class="menu_item hand"
          @click="editClick"
          v-if="selectInfo.status==0&&selectInfo.modify==0"
        >
          <i class="el-icon-edit"></i>编辑
        </li>
        <li
          class="menu_item hand"
          @click="deleteClick"
          v-if="selectInfo.status==0&&selectInfo.modify==0"
        >
          <i class="el-icon-delete"></i>删除
        </li>
        <li class="menu_item hand" @click="reportClick" v-if="selectInfo.status==1">
          <i class="el-icon-document-copy"></i>报告
        </li>
        <li class="menu_item hand" @click="adviceClick" v-if="selectInfo.planid">
          <i class="el-icon-circle-plus-outline"></i>医嘱
        </li>
      </ul>
    </div>

    <el-dialog :visible.sync="dialogTableVisible">
      <SummaryReport :selectInfo="selectInfo"></SummaryReport>
    </el-dialog>

    <el-dialog :visible.sync="dialogTrainingVisible">
      <TrainingPlanTemp :selectInfo="selectInfo"></TrainingPlanTemp>
    </el-dialog>

    <el-dialog :visible.sync="dialogAdviceVisible">
      <DoctorAdvice :selectInfo="selectInfo" @closeAdvice="dialogAdviceVisible=false"></DoctorAdvice>
    </el-dialog>
  </div>
</template>

<script>
import HeaderDoctor from '@/components/page/HeaderDoctor/HeaderDoctor.vue'
import SummaryReport from '@/views/training/report.vue'
import TrainingPlanTemp from '@/views/training/TrainingPlanTemp.vue'
import {
  fetchPlanList,
  fetchPlanInfo,
  fetchPlanListPerWeek,
  deletePlanInfo,
  locktimeidpost
} from '@/api/training.js'
import DoctorAdvice from '@/views/training/advice.vue'

export default {
  name: 'Appointment',
  components: {
    HeaderDoctor,
    SummaryReport,
    TrainingPlanTemp,
    DoctorAdvice
  },

  data() {
    return {
      vm: '',
      leftImg: '',
      planid: this.$route.query.planid,
      patientid: this.$store.state.user.patientInfo.id,
      dateValue: new Date(),
      total: 0,
      tableData: [],
      lastTimeId: '',
      lastDate: '',
      menuVisible: false,
      menuVisible1: false,
      productTypes: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 右击选择的信息
      selectInfo: {},
      dialogTableVisible: false,
      dialogTrainingVisible: false,
      dialogAdviceVisible: false,
      planlistperweek: {}
    }
  },
  created() {
    this.leftImg = require('../../assets/images/logo.png')
    this.title = '的时间预约计划表'
    this.titleName = this.$store.state.user.patientInfo.name
    this.$store.dispatch('clearPlanInfoTemp')
    this.initLastPlan()

  },
  methods: {

    initLastPlan() {
      const _this = this
      var params = {
        planid: this.planid,
        patientid: this.patientid
      }
      fetchPlanInfo(params).then(res => {
        if (_this.$store.state.user.planInfo) {
          var lastday = _this.$store.state.user.planInfo.plandate
        }
        if (lastday) {
          _this.patientplanlistperweek(lastday)
        } else {
          _this.patientplanlistperweek(this.common.getNowFormatDate())
        }
      })
    },
    patientplanlistperweek(day) {
      var params = {
        plandate: day,
        patientid: this.patientid
      }
      fetchPlanListPerWeek(params).then(res => {
        this.planlistperweek = res.data
        this.initList(day)
      })
    },
    // 根据日期和timeid获取planid
    getPlan(day, timeid) {
      for (var item of this.planlistperweek.items) {
        if (item.plandate === day && item.timeid === timeid) {
          var plan = {}
          plan['planid'] = item.planid
          plan['status'] = item.status
          plan['modify'] = item.modify
          break
        }
      }
      return plan
    },
    initList(day) {
      this.tableData = []
      var params = {
        plandate: day,
        modelid: 1
      }
      fetchPlanList(params).then(res => {
        this.total = res.data.total
        var items = res.data.items
        for (const item in items) {
          var newObj = {}
          newObj.day = item
          var list = []
          var objs = items[item]
          for (const item1 in objs) {
            var re = {}
            re.timeID = item1
            re.able = this.total - objs[item1]
            re.day = item
            var plan = this.getPlan(re.day, re.timeID)
            if (plan) {
              re.planid = plan.planid
              re.status = plan.status
              re.modify = plan.modify
            }
            list.push(re)
          }
          newObj.list = list
          this.tableData.push(newObj)
        }
        console.log(this.tableData)
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    // 选择日期
    getMyDateTime(day) {
      this.patientplanlistperweek(day)
    },

    // 计算时间差（相差分钟）
    timeDifference(selectday) {
      var endTime
      selectday = selectday.replace(/-/g, '/')
      if (this.selectInfo.timeid === '0') {
        endTime = selectday + ' 08:00'
      } else if (this.selectInfo.timeid === '1') {
        endTime = selectday + ' 08:30'
      } else if (this.selectInfo.timeid === '2') {
        endTime = selectday + ' 09:00'
      } else if (this.selectInfo.timeid === '3') {
        endTime = selectday + ' 09:30'
      } else if (this.selectInfo.timeid === '4') {
        endTime = selectday + ' 10:00'
      } else if (this.selectInfo.timeid === '5') {
        endTime = selectday + ' 10:30'
      } else if (this.selectInfo.timeid === '6') {
        endTime = selectday + ' 11:00'
      } else if (this.selectInfo.timeid === '7') {
        endTime = selectday + ' 11:30'
      } else if (this.selectInfo.timeid === '8') {
        endTime = selectday + ' 12:00'
      } else if (this.selectInfo.timeid === '9') {
        endTime = selectday + ' 12:30'
      } else if (this.selectInfo.timeid === '10') {
        endTime = selectday + ' 13:00'
      } else if (this.selectInfo.timeid === '11') {
        endTime = selectday + ' 13:30'
      } else if (this.selectInfo.timeid === '12') {
        endTime = selectday + ' 14:00'
      } else if (this.selectInfo.timeid === '13') {
        endTime = selectday + ' 14:30'
      } else if (this.selectInfo.timeid === '14') {
        endTime = selectday + ' 15:00'
      } else if (this.selectInfo.timeid === '15') {
        endTime = selectday + ' 15:30'
      } else if (this.selectInfo.timeid === '16') {
        endTime = selectday + ' 16:00'
      } else if (this.selectInfo.timeid === '17') {
        endTime = selectday + ' 16:30'
      }

      var date1 = new Date()
      var date2 = new Date(endTime)
      var s1 = date1.getTime()
      var s2 = date2.getTime()
      var total = (s2 - s1) / 1000

      // 计算现在时间和所选时间差值
      var day = parseInt(total / (24 * 60 * 60)) // 计算整数天数
      var afterDay = total - day * 24 * 60 * 60 // 取得算出天数后剩余的秒数
      var hour = parseInt(afterDay / (60 * 60)) // 计算整数小时数
      var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60 // 取得算出小时数后剩余的秒数
      var min = parseInt(afterHour / 60) // 计算整数分
      console.log(day)
      if (day > 0) {
        // 选的日期在后面，正确
        return true
      }
      if (day < 0) {
        return false
      } else {
        if (min < 0) {
          // 选的日期太早
          return false
        } else if (min >= 0) {
          // 选的日期在后面，正确
          return true
        }
      }
    },

    // 右键点击
    openMenu(MouseEvent, item) {
      const day = MouseEvent.target.parentNode.getAttribute('day')
      this.$set(this.selectInfo, 'day', day)
      this.$set(this.selectInfo, 'timeid', item.timeID)
      this.$set(this.selectInfo, 'planid', item.planid)
      this.$set(this.selectInfo, 'status', item.status)
      this.$set(this.selectInfo, 'modify', item.modify)
      console.log(this.selectInfo)

      // 鼠标右击触发事件
      this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector('#menu')
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.display = 'block'
      if (window.screen.height - MouseEvent.pageY <= 170) {
        menu.style.top = MouseEvent.pageY - 100 + 'px'
      } else {
        menu.style.top = MouseEvent.pageY + 10 + 'px'
      }
      if (document.body.clientWidth - MouseEvent.clientX <= 100) {
        menu.style.left = MouseEvent.pageX - 80 + 'px'
      } else {
        menu.style.left = MouseEvent.pageX + 10 + 'px'
      }
    },
    // 左键新建
    openNew(MouseEvent, item) {
      const day = MouseEvent.target.parentNode.getAttribute('day')
      this.$set(this.selectInfo, 'day', day)
      this.$set(this.selectInfo, 'timeid', item.timeID)
      this.$set(this.selectInfo, 'planid', item.planid)
      this.$set(this.selectInfo, 'status', item.status)
      this.$set(this.selectInfo, 'modify', item.modify)
      this.newClick()
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    // 查看
    detailClick() {
      this.dialogTrainingVisible = true
    },
    // 编辑
    editClick() {
      var _this = this
      var info = {}
      info['timeid'] = this.selectInfo.timeid
      info['plandate'] = this.selectInfo.day
      _this.$store.dispatch('savePlanInfo', info)
      this.$router.push({
        path: '/trainingSlider',
        name: 'trainingSlider',
        query: { planid: this.selectInfo.planid }
      })
    },
    // 删除
    deleteClick() {
      this.$confirm('您确定要删除该计划？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-button purple'
      }).then(() => {
        this.deleteClickCallback()
      })
    },
    deleteClickCallback() {
      var _this = this
      var params = {
        planid: this.selectInfo.planid
      }
      deletePlanInfo(params).then(res => {
        if (res.message === 'success') {
          this.$alert('删除成功', '', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              _this.patientplanlistperweek(this.selectInfo.day)
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
    // 报告
    reportClick() {
      this.dialogTableVisible = true
    },
    adviceClick() {
      this.dialogAdviceVisible = true
    },
    // 新建
    newClick() {
      var _this = this
      if (this.timeDifference(this.selectInfo.day)) {
        this.$confirm('您是否确认预约该时间？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'el-button purple'
        })
          .then(() => {
            _this.newClickCallback()
          })
          .catch(() => { })
      } else {
        this.$alert('请选择正确的日期', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      }
    },
    // 锁定时间
    newClickCallback() {
      var _this = this
      var params = {
        timeid: this.selectInfo.timeid,
        plandate: this.selectInfo.day,
        modelid: 1
      }
      locktimeidpost(params).then(res => {
        if (res.message === 'success') {
          this.newClickIntervalCallback()
        } else {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
      })
    },

    newClickIntervalCallback() {
      var _this = this
      var info = {}
      info['timeid'] = _this.selectInfo.timeid
      info['plandate'] = _this.selectInfo.day
      _this.$store.dispatch('savePlanInfo', info)
      this.$router.push({
        path: '/training/slider'
      })

    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.menu {
  width: 80px;
  position: absolute;
  border: 1px solid #999999;
  background-color: #f4f4f4;
  .menu_item {
    height: 25px;
    line-height: 25px;
    i {
      margin-right: 10px;
      margin-left: 5px;
    }
  }
}
.menu1 {
  height: 25px;
  width: 80px;
  position: absolute;
  border: 1px solid #999999;
  background-color: #f4f4f4;
  .menu_item {
    height: 25px;
    line-height: 25px;
    i {
      margin-right: 10px;
    }
  }
}

li:hover {
  background-color: #1790ff;
  color: white;
}
li {
  font-size: 15px;
}

.header {
  .header-right {
    img {
      width: 50px;
      margin-left: 20px;
    }
  }
}

.main {
  margin: 0 auto 20px auto;
  .top {
    background: #ededed;
    display: inline-block;
    padding: 10px 20px;
    span {
      display: inline-block;
    }
    .red {
      width: 30px;
      height: 30px;
      background: $pinkFontColor;
      vertical-align: middle;
      margin-right: 10px;
    }
    .white {
      width: 30px;
      height: 30px;
      background: white;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    .green {
      width: 30px;
      height: 30px;
      background: #a6e3dd;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    .blue {
      width: 30px;
      height: 30px;
      background: #20b6f9;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    .yellow {
      width: 30px;
      height: 30px;
      background: #fec85a;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    .purple {
      width: 30px;
      height: 30px;
      background: #8da1f2;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    div:nth-child(2) {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
  .greenBackColor {
    width: 100%;
    height: 100%;
    background: #a6e3dd;
  }
  .blueBackColor {
    width: 100%;
    height: 100%;
    background: #20b6f9;
  }
  .yellowBackColor {
    width: 100%;
    height: 100%;
    background: #fec85a;
  }
  .purpleBackColor {
    width: 100%;
    height: 100%;
    background: #8da1f2;
  }
  .pinkBackColor {
    width: 100%;
    height: 100%;
    cursor: default;
    background: $pinkFontColor;
  }
  .cell {
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    cursor: pointer;
  }

  .right-table-title {
    .cell {
      height: 52px;
      line-height: 52px;
      background: #ededed;
    }
    .cell2 {
      height: 40px;
      line-height: 40px;
      background: #fff;
      font-size: 14px;
      text-align: center;
      border-top: 1px solid #eee;
      border-right: 1px solid #eee;
      cursor: pointer;
    }
    .title {
      div {
        height: 20px;
        line-height: 30px;
      }
    }
  }
}
</style>

<style lang="scss">
.el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 0;
  height: 40px;
  p {
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
  }
}
.el-button-group button:nth-child(1) {
  display: none;
}
</style>
