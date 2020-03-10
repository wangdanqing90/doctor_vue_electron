<template>
  <div class="app-container">
    <HeaderDoctor :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <el-button class="purple" @click="gotoAddPatient()">添加患者</el-button>
          <img src="../../assets/images/back.png" @click="showLogout" style="cursor: pointer;" />
        </div>
      </template>
    </HeaderDoctor>

    <el-card class="box-card">
      <el-row>
        <el-col :span="24">
          <div class="search">
            <el-input
              placeholder="请输入搜索内容"
              v-model="search"
              class="input-with-select"
              @keyup.enter.native="searchClick"
            >
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-row class="tableContainer">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          stripe
          max-height="650"
          @sort-change="changeTableSort"
          :header-cell-style="{
              'font-size': '16px',
              'line-height': '40px',
              'color': '#EEE'
            }"
          :row-style="{height:'20px'}"
        >
          <el-table-column label="序号" type="index" width="100" align="center">
            <template slot-scope="scope">
              <span
                :class="scope.row.status? 'purpleFontColor':'pinkFontColor'"
              >{{(page - 1) * limit + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
            <template slot-scope="scope">
              <span :class="scope.row.status? 'purpleFontColor':'pinkFontColor'">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.sex == 1"
                :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'"
              >男</span>
              <span v-else :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" align="center" :sortable="'custom'">
            <template slot-scope="scope">
              <span :class="scope.row.status? 'purpleFontColor':'pinkFontColor'">{{scope.row.age}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="regdate" label="添加日期" align="center">
            <template slot-scope="scope">
              <span
                :class="scope.row.status? 'purpleFontColor':'pinkFontColor'"
              >{{scope.row.regdate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="患者计划" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status !== 0" class="purpleFontColor" align="center">
                <el-button size="small" @click="gotoPatientDetail(scope.$index, scope.row)">查看</el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="患者信息" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0" class="pinkFontColor">
                <el-button size="small" @click="gotoApproval(scope.$index, scope.row)">审核</el-button>
              </span>
              <span v-else class="purpleFontColor" align="center">
                <el-button size="small" @click="headModifyClick(scope.$index, scope.row)">查看</el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="消息" align="center">
            <template slot-scope="scope">
              <span class="meaasgeSpan cursor" @click="gotoPatientMsg(scope.$index, scope.row)">
                <img
                  v-if="scope.row.message"
                  src="../../assets/images/xinxi.png"
                  class="meaasgeImg"
                />
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-row>
        <el-col :span="24" style="text-align:end;">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title :visible.sync="logoutDialogVisible" width="30%" :center="true">
      <div style="text-align: center;">
        <span class="purple">确认退出?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutDialogVisible = false">取消</el-button>
        <el-button class="purple" @click="logout">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { fetchPatientlist } from '@/api/dash'
import HeaderDoctor from '@/components/Page/HeaderDoctor/HeaderDoctor.vue'

export default {
  components: {
    Pagination,
    HeaderDoctor
  },
  data() {
    return {
      list: null,
      listLoading: false,
      dialogDetailView: false,
      leftImg: '',
      title: '康复训练工作台',
      logoutDialogVisible: false,
      search: '',
      page: 1,
      limit: 10,
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 10,
        search: null,
        type: 0, // 0、默认，1、性别，2、年龄，3、姓名，4、注册时间
        desc: 0 // 0、默认（正序），1、倒序
      },
      total: 0
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.search = this.search
      fetchPatientlist(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },

    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },

    showLogout() {
      this.logoutDialogVisible = true
    },

    searchClick() {
      this.page = 1
      this.getList()
    },

    gotoApproval(index, row) {
      this.$store.dispatch('clearPlanInfo')
      this.$store.dispatch('savePatientInfo', row)
      this.$router.push({
        path: '/detail/index',
        query: { type: 'examine', patientid: row.id }
      })
    },

    gotoPatientDetail(index, row) {
      this.$store.dispatch('clearPlanInfo')
      this.$store.dispatch('savePatientInfo', row)
      this.$router.push({
        path: '/training/appointment'
      })
    },

    gotoPatientMsg(index, row) {
      this.$router.push({
        path: '/training/list'
      })
    },

    gotoAddPatient() {
      this.$router.push({
        path: '/detail/index',
        query: { type: 'patient' }
      })
    },

    // 选择指定列进行排序
    changeTableSort(column) {
      var sortingType = column.order // 排序类型
      if (column.prop === 'name') this.listQuery.type = 3
      else if (column.prop === 'sex') this.listQuery.type = 1
      else if (column.prop === 'age') this.listQuery.type = 2
      else if (column.prop === 'regdate') this.listQuery.type = 4

      if (sortingType === 'descending') {
        this.listQuery.desc = 1
      } else {
        this.listQuery.desc = 0
      }

      this.listQuery.page = 1
      this.getList()
    },
    // 修改患者
    headModifyClick(index, row) {
      this.$store.dispatch('clearPlanInfo')
      this.$store.dispatch('savePatientInfo', row)
      this.$router.push({
        path: '/detail/index',
        query: { type: 'patientModify' }
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

.el-card {
  margin-bottom: 30px;
}

.tableContainer {
  margin-top: 20px;
  .stateImg {
    vertical-align: middle;
    width: 16px;
  }
  .meaasgeSpan {
    position: relative;
    i {
      display: block;
      background: #f00;
      border-radius: 50%;
      width: 0.4em;
      height: 0.4em;
      top: -2px;
      right: -0.2em;
      position: absolute;
    }
    .meaasgeImg {
      vertical-align: middle;
      width: 25px;
    }
  }
  .purpleFontColor {
    color: $purpleFontColor;
  }
  .pinkFontColor {
    color: $pinkFontColor;
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
  padding-bottom: 30px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

