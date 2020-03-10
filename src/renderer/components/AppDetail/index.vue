<template>
  <div class="app-container">
    <el-dialog :title="temp.name" :visible.sync="dialogDetailVisible" v-loading="listLoading" :showClose="false">
      <template>
        <el-carousel v-if="temp.bannerImg.length>=1" :interval="5000" type="card" height="250px" >
          <el-carousel-item v-for="(item,index) in temp.bannerImg" :key="index">
            <img :src="item.image" class="bannerImg" />
          </el-carousel-item>
        </el-carousel>
        <el-form ref="dataForm" :data="AppDetailData" label-position="left" label-width="90px" style="max-width: 550px; margin-left:50px;">
          <el-form-item label="简介:">
            <span>{{ temp.content }}</span>
          </el-form-item>
          <el-form-item v-if="temp.cloud_url" label="文件名:" prop="filename">
            <el-input v-model="temp.filename" :readonly="true" style="width:350px;max-width:100%;"/>
            <el-button type="primary" icon-class="documentation" @click="handleCopy(temp.filename, $event)"><i class="el-icon-document"></i> 复制</el-button>
          </el-form-item>
          <el-form-item v-if="temp.cloud_url" label="网盘地址:" prop="cloud_url">
            <el-input v-model="temp.cloud_url" :readonly="true" style="width:350px;max-width:100%;"/>
            <el-button type="primary" icon-class="documentation" @click="handleCopy(temp.cloud_url, $event)"><i class="el-icon-document"></i> 复制</el-button>
          </el-form-item>
          <el-form-item v-if="temp.cloud_url" label="网盘密码:" prop="cloud_password">
            <el-input v-model="temp.cloud_password" :readonly="true" style="width:350px;max-width:100%;"/>
            <el-button type="primary" icon-class="documentation" @click="handleCopy(temp.cloud_password, $event)"><i class="el-icon-document"></i> 复制</el-button>
          </el-form-item>
         <!--<el-form-item v-if="!temp.cloud_url" label="上架中" >
          </el-form-item>-->        
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button v-if="!this.executableFile && temp.cloud_url" type="success" @click="download(temp.cloud_url)"><i class="el-icon-download"></i> 下载</el-button>
        <el-button v-if="this.executableFile" type="success" @click="handleExecApp(temp.id, temp.filename)"><i class="el-icon-caret-right"></i> 启动</el-button>
        <el-button @click="dialogClose()" type="danger"><i class="el-icon-close"></i> 关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAppDetail } from '@/api/DemoApp'
import { execJob } from '@/utils/exec'
import clip from '@/utils/clipboard'

export default {
  name: 'AppDetail',
  props: {
    dialogDetailVisible: {
      type: Boolean
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentAppValid: false,
      executableFile: false,
      list: null,
      listLoading: true,
      AppDetailData: [],
      temp: {
        id: '',
        name: '',
        content: '',
        filename: '',
        cloud_url: '',
        cloud_password: '',
        bannerImg: []
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    dialogClose() {
      this.$emit('childDialogVisible', false)
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '已复制到剪切板',
        type: 'success',
        duration: 1500
      })
    },
    handleFetchAppDetail(appId, valid = false) {
      this.listLoading = true
      this.resetTemp()
      getAppDetail(appId).then(response => {
        this.AppDetailData = response.data.data
        this.temp.id = this.AppDetailData.id
        this.temp.name = this.AppDetailData.name
        this.temp.content = this.AppDetailData.content
        this.temp.filename = this.AppDetailData.filename
        this.temp.cloud_url = this.AppDetailData.cloud_url
        this.temp.cloud_password = this.AppDetailData.cloud_password
        this.temp.bannerImg = response.data.carousel
        this.dialogDetailVisible = true

        const fs = require('fs')
        const FolderPath = './app/' + this.temp.filename
        // console.log(FolderPath)
        fs.existsSync(FolderPath, function(exists) {
          if (!exists) {
            fs.mkdirSync(FolderPath, function(err) {
              if (err) {
                // console.log('创建文件夹出错！')
              } else {
                // console.log(FolderPath + '文件夹-创建成功！')
                // mkdir(pos+1, dirArray,_callback)
              }
            })
          } else {
            // console.log(FolderPath + '文件夹-已存在！')
            // mkdir(pos+1,dirArray,_callback)
          }
        })

        const executablePath = './app/' + this.temp.filename + '/' + this.temp.filename + '.exe'
        this.executableFile = fs.existsSync(executablePath, function(exists) {
          return exists
        })
        this.listLoading = false
      })
    },
    handleExecApp(appId, filename) {
      execJob(appId, filename)
    },
    resetTemp() {
      this.temp = {
        id: '',
        name: '',
        content: '',
        cloud_url: '',
        cloud_password: '',
        filename: '',
        bannerImg: []
      }
    },
    download(cloud_url) {
      window.open(cloud_url, '_blank', 'nodeIntegration=no')
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.bannerImg{
    width: 100%;
    height: inherit;
}
</style>