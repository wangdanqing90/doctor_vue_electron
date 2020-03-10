<template>
<div class="app-container">
   <div class="" style="margin: 0 auto;">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <!--<el-button class="purple" @click="addTraining()">添加训练</el-button>
          <el-button class="purple" @click="editPatientProfile()">修改患者</el-button>-->
          <!--<el-button class="purple" @click="generateReportClick()">生成汇总报告</el-button>-->
          <img src="../../assets/images/back.png" @click="backClick" style="cursor: pointer;"/>
        </div>
      </template>
    </HeaderDoctor>
    <el-card class="box-card">
      <el-row class="tableContainer">
        <el-col :span="24">
          <el-table :data="tableData" v-loading="listLoading" stripe max-height="700" style="width: 100%;" align="center">
            <!--
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="number" label="序号" width="80" align="center" v-if="false">
              <template slot-scope="scope">
                <span
                 :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >{{(page - 1) * limit + scope.$index + 1}}</span>
              </template>
            </el-table-column>-->

            <el-table-column prop="date" label="日期" sortable align="center" width="300">
              <template slot-scope="scope">
                  <span :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}">
                    {{scope.row.plandate}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="训练内容" align="center">
              <template slot-scope="scope">
                <img v-if="scope.row.content.indexOf('1')!= -1" src="../../assets/images/walkingtraining_a.png" class="statusImg" />
                <img v-if="scope.row.content.indexOf('2')!= -1" src="../../assets/images/stationtraining_a.png" class="statusImg" />               
                <img v-if="scope.row.content.indexOf('3')!= -1" src="../../assets/images/gametraining_a.png" class="statusImg" />
                <img v-if="scope.row.content.indexOf('4')!= -1" src="../../assets/images/balancedetermination_a.png" class="statusImg" />               
               </template>
            </el-table-column>
            <el-table-column prop="state" label="完成状态" sortable align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status==0" class="greenFontColor">待完成</span>
                <span v-else-if="scope.row.status==1" class="purpleFontColor">完成</span>
                <span v-else-if="scope.row.status==2" class="pinkFontColor">未完成</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="report" label="当次报告" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.status==1"
                    @click="viewReport(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="monthReport" label="月份报告" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.status==1"
                    @click="monthReportClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="inform" label="操作" width="180" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    class="hand margin-right-10"
                    @click="deleteClick(scope.$index, scope.row)"
                  >删除</span>
                </span>
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.status==0"
                    class="hand"
                    @click="modifyClick(scope.$index, scope.row)"
                  >修改</span>
                  <span v-else class="margin-left-15">--</span>
                </span>
              </template>
            </el-table-column>-->

            <el-table-column prop="apply" label="申请" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.askfor==1"
                    @click="applicationClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>
            <!--
            <el-table-column prop="advice" label="医嘱(备注)" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.advice==1"
                    @click="adviceClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else class="hand" @click="adviceClick(scope.$index, scope.row)">填写</span>
                </span>
              </template>
            </el-table-column>
            -->
          </el-table>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" style="text-align:end;">
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="initTrainingList" />
        </el-col>
      </el-row>
<!--
      <el-row class="text-right padding-bottom-50">
        <el-button class="purple" @click="generateReportClick()">生成汇总报告</el-button>
      </el-row>
      -->
    </el-card>
  </div>
</div>
</template> 

<script>
import Pagination from '@/components/Pagination'
import HeaderDoctor from '@/components/page/HeaderDoctor/HeaderDoctor.vue'
import { fetchTrainingPlanList, deleteTrainingPlan } from '@/api/training.js'

export default {
  name: 'trainingList',
  components: {
    Pagination,
    HeaderDoctor
  },

  data() {
    return {
      patientid: undefined,
      leftImg: '',
      title: '的消息列表',
      titleName: '',
      leaveDialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      pageSize: 10,
      total: 100,
      tableData: [],
      listLoading: false
    }
  },
  created() {
    this.leftImg = require('../../assets/images/logo.png')
    this.titleName = this.$store.state.user.patientInfo.name
    this.patientid = this.$store.state.user.patientInfo.id
    this.initTrainingList()
  },
  methods: {
    initTrainingList() {
      this.listLoading = true
      var params = {
        patientid: this.patientid,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      fetchTrainingPlanList(params).then(res => {
        this.tableData = res.data.items
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    backClick() {
      this.$router.push({
        path: '/'
      })
    },
    confirmClick() {},
    // 翻页
    handleCurrentChange(val) {
      // // console.log(`当前页: ${val}`)
      // this.page = val
      // this.initTrainingList()
    },
    // 当次报告
    viewReport(index, row) {
      this.$router.push({
        path: '/training/report',
        query: { planid: row.planid }
      })
    },
    // 月份报告
    monthReportClick(index, row) {
      // console.log(index, row)
    },
    // 医嘱
    adviceClick(index, row) {
      this.$router.push({
        path: '/training/advice',
        query: { planid: row.planid }
      })
    },
    // 申请
    applicationClick(index, row) {
      this.$router.push({
        path: '/training/application',
        query: { 'planid': row.planid }
      })
    },
    // 修改
    modifyClick(index, row) {
      this.$router.push({
        path: '/training/appointment',
        query: { 'planid': row.planid }
      })
    },
    // 删除
    deleteClick(index, row) {
      this.$confirm('您确定要删除该计划？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        confirmButtonClass: 'el-button purple'
      })
        .then(() => {
          this.deleteClickCallback(row.planid)
        })
    },
    deleteClickCallback(planid) {
      var params = {
        planid: planid
      }
      deleteTrainingPlan(params).then(res => {
        if (res.message === 'success') {
          this.$alert('删除成功', '', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              this.page = 1
              this.initTrainingList()
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
    // 生成汇总报告
    generateReportClick() {
      this.$router.push({
        path: '/summaryReport',
        name: 'summaryReport'
      })
    },
    editPatientProfile() {
      this.$router.push({
        path: '/detail/index',
        query: { type: 'patientModify', patientid: this.patientid }
      })
    },
    addTraining() {
      this.$router.push({
        path: '/training/appointment'
      })
    }
  }
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

.search {
  margin-top: 15px;
  width: 200px;
}

.tableContainer {
  .statusImg {
    vertical-align: middle;
    width: 20px;
    margin: 0 2px;
  }
  .meaasgeImg {
    vertical-align: middle;
    width: 25px;
  }

  .purpleFontColor .el-button--text {
    color: $purpleFontColor;
  }

  .pinkFontColor .el-button--text {
    color: $pinkFontColor;
  }
}

.paginationContainer {
  margin-top: 30px;
  padding-bottom: 10px;
}
</style>

<style lang="scss">
</style>

