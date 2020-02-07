<template>
  <div class="system_config">
    <div class="system_header">
      <em class="table-title">
        系统配置
        <span class="right f_normal">更新时间：{{ update_at }}</span>
      </em>
    </div>
    <div class="system_contain">
      <el-card shadow="always" class="config_card">
        <span
          @click="pageIndex = 1"
          :class="['mar_30', pageIndex == 1 ? 'origin_active' : '']">
          网络地址配置
        </span>
        <span
          @click="pageIndex = 2"
          :class="['mar_30', pageIndex == 2 ? 'origin_active' : '']">
          系统升级
        </span>
        <el-divider></el-divider>
        <div v-if="pageIndex === 1">
          <h3>信号机地址配置</h3>
          <el-form
            label-width="90px"
            :model="telesemeData"
            :rules="rules"
            ref="telesemeData">
            <el-form-item label="信号机IP:" prop="telese_ip">
              <el-input
                class="infoInputs"
                v-model="telesemeData.telese_ip"
                placeholder="请输入信号机IP"></el-input>
            </el-form-item>
          </el-form>
          <div class="el-fot">
            <el-button
              style="width: 100px;color:#fff; background-color:#FF6600"
              @click="telesemeHold('telesemeData')">保存</el-button>
          </div>
          <el-divider></el-divider>
          <h3>路口网络地址配置</h3>
          <el-form
            label-width="90px"
            :model="siteDate"
            :rules="rules"
            ref="siteDate">
            <el-form-item label="路口IP:" prop="road_ip">
              <el-input
                class="infoInputs"
                v-model="siteDate.road_ip"
                placeholder="请输入路口IP"></el-input>
            </el-form-item>
            <el-form-item label="子网掩码:" prop="netmask">
              <el-input
                class="infoInputs"
                v-model="siteDate.netmask"
                placeholder="请输入子网掩码"></el-input>
            </el-form-item>
            <el-form-item label="网关:" prop="gateway">
              <el-input
                class="infoInputs"
                v-model="siteDate.gateway"
                placeholder="请输入网关"></el-input>
            </el-form-item>
          </el-form>
          <div class="el-fot">
            <el-button
              style="width: 100px;color:#fff; background-color:#FF6600"
              @click="siteHold('siteDate')">保存</el-button>
          </div>
          <el-divider></el-divider>
          <h3>服务端网络地址配置</h3>
          <el-form
            label-width="90px"
            :model="serverDate"
            :rules="rules"
            ref="serverDate">
            <el-form-item label="服务IP:" prop="server_ip">
              <el-input
                class="infoInputs"
                v-model="serverDate.server_ip"
                placeholder="请输入服务IP"></el-input>
            </el-form-item>
            <el-form-item label="服务端端口:" prop="server_port">
              <el-input
                class="infoInputs"
                v-model="serverDate.server_port"
                placeholder="请输入服务端端口"></el-input>
            </el-form-item>
          </el-form>
          <div class="el-fot">
            <el-button
              style="width: 100px;color:#fff; background-color:#36ABFF"
              @click="test('serverDate')">测试</el-button>
            <el-button
              style="width: 100px;color:#fff; background-color:#FF6600"
              @click="serverHold('serverDate')">保存</el-button>
          </div>
          <el-divider></el-divider>
          <div class="config_card restart_box ">
            <h3 style="margin-bottom: 50px">重启系统</h3>
            <el-button class="restart_btn" style="" @click="restart">重启</el-button>
          </div>
        </div>
      <div class="dia_pro">
          <el-dialog
          :visible.sync="centerDialogVisible"
          :close-on-click-modal="false"
          width="30%"
          class=""
          center>
         <div style="text-align:center;color:white;margin-bottom:20px;font-weight:500;font-size:20px">
             {{ customText }}
         </div>
          <el-progress
            v-show="step<5"
            :percentage="downPercen"
            :color="customColor"
            :stroke-width="14"
            :status="numStatus"
            ></el-progress>
          <el-progress
            v-show="step>=5"
            :percentage="updataPercen"
            :color="customColor"
            :status="numStatus"
            :stroke-width="14"
            ></el-progress>
          <!-- downPercen:<input type="number" v-model.number="downPercen" />
          updataPercen:<input type="number" v-model.number="updataPercen" /> -->
          <!-- status:<input type="number" v-model.number="percenStatus" /> -->
          <!-- step :<input type="number" v-model.number="step" />
          <button @click="repeatCall()">点击</button> -->
          <!-- this.$router.push({name:'组件名')}; -->
        </el-dialog>
      </div>

        <div style="margin:40px 60px" v-if="pageIndex === 2">
          <el-row :gutter="20">
            <el-col
              :span="10"
              style="max-width:420px;border-right:1px solid #FF6602">
              <div class="onlien_updata">
                <div class="title">
                  <img
                    src="@/assets/images/svg/system_config/updata_icon.png"
                    alt=""
                    srcset="" />
                  <h2>在线更新</h2>
                </div>
                <div class="contain">
                  <img
                    src="@/assets/images/svg/system_config/current.svg"
                    alt=""
                    srcset="" />
                  <div class="detail">
                    <p><i>DeviceName：</i>{{ local.device_name }}</p>
                    <p><i>当前版本：</i>{{ local.version }}</p>
                    <p><i>版本日期：</i>{{ local.ver_time }}</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="best_version">
                <div class="title">
                  <img
                    src="@/assets/images/svg/system_config/download.png"
                    alt=""
                    srcset="" />
                  <h2>最新版本</h2>
                </div>
                <div v-if="isUpToData" class="contain">
                  <div class="detail">
                    <p><i>DeviceName：</i>{{ newList.device_name }}</p>
                    <p :class="isUpToDataImg ? 'new_icon' : ''">
                      <i>最新版本：</i>{{ newList.version }}
                    </p>
                    <p><i>文件大小：</i>{{ newList.file_size }}</p>
                    <p><i>发布日期：</i>{{ newList.ver_time }}</p>
                  </div>
                  <el-button class="btn_sty" @click="downUpdata()" size="small">下载并更新</el-button>
                </div>
                <div v-else class="contain">
                  <div class="newimg">
                    <img
                      src="@/assets/images/svg/system_config/newed.png"
                      alt=""
                      srcset="" />
                    <p>当前系统已更新至最新稳定版</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { customizingPort, customizingPortIp } from '@/plugins/customizingConfig.js'
import $ from 'jquery'
export default {
  data () {
    var telesemeIp = (rule, value, callback) => {
      // 正则匹配ip
      let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|22[0-3])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
      if (!value) {
        callback(new Error('信号机IP不能为空'))
      } else {
        if (!pattern.test(value.toString())) {
          callback(new Error('请输入正确的格式'))
        }
        callback()
      }
    }
    var roadIp = (rule, value, callback) => {
      // 正则匹配ip
      let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|22[0-3])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
      if (!value) {
        callback(new Error('路口IP不能为空'))
      } else {
        if (!pattern.test(value.toString())) {
          callback(new Error('请输入正确的格式'))
        }
        callback()
      }
    }
    var serverIp = (rule, value, callback) => {
      if (!value) {
        callback(new Error('服务IP不能为空'))
      } else {
        // 正则匹配ip
        let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|22[0-3])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
        if (!pattern.test(value.toString())) {
          callback(new Error('请输入正确的格式'))
        }
        callback()
      }
    }
    var netMask = (rule, value, callback) => {
      if (!value) {
        callback(new Error('子网掩码不能为空'))
      } else {
        let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|25[0-5])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
        if (!pattern.test(value.toString())) {
          callback(new Error('请输入正确的格式'))
        }
        callback()
      }
    }
    var gateWay = (rule, value, callback) => {
      if (!value) {
        callback(new Error('网关不能为空'))
      } else {
        let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|25[0-5])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
        if (!pattern.test(value.toString())) {
          callback(new Error('请输入正确的格式'))
        }
        callback()
      }
    }
    var serverPort = (rule, value, callback) => {
      if (!value) {
        callback(new Error('服务端端口不能为空'))
      } else {
        // 正则匹配端口
        let pattern = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        if (!pattern.test(value.toString())) {
          callback(new Error('请设置0-65535的有效端口号!'))
        }
        callback()
      }
    }
    return {
      upgradeAddress: '',
      percenStatus: 0,
      step: 0,
      downPercen: 0,
      updataPercen: 0,
      numStatus: null,
      timePoll: '',
      centerDialogVisible: false,
      isUpToData: false,
      isUpToDataImg: false,
      customColor: '#409eff',
      customText: '下载中',
      local: {},
      newList: {},
      pageIndex: 1,
      isUp: true,
      update_at: '',
      datas: {
        road_ip: '',
        netmask: '',
        gateway: '',
        server_ip: '',
        server_port: '',
        telese_ip: ''
      },
      siteDate: {
        road_ip: '',
        netmask: '',
        gateway: ''
      },
      serverDate: {
        server_ip: '',
        server_port: ''
      },
      telesemeData: {
        telese_ip: ''
      },
      rules: {
        telese_ip: [{ validator: telesemeIp, trigger: 'blur' }],
        road_ip: [{ validator: roadIp, trigger: 'blur' }],
        server_ip: [{ validator: serverIp, trigger: 'blur' }],
        netmask: [{ validator: netMask, trigger: 'blur' }],
        gateway: [{ validator: gateWay, trigger: 'blur' }],
        server_port: [{ validator: serverPort, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.initNetwork()
    localStorage.setItem('updataDia', false)
    // 处理升级地址
    if (process.env.NODE_ENV === 'production') {
      this.upgradeAddress = 'http://0.0.0.0/' + `${customizingPort.upgrade}` + '/api'
      // this.upgradeAddress = 'http://0.0.0.0/api'
      console.log('线上环境')
    } else if (process.env.NODE_ENV === 'development') {
      this.upgradeAddress = `${customizingPortIp.development}` + ':' + `${customizingPort.upgrade}` + '/api'
      console.log('开发环境' + this.upgradeAddress)
    }
  },
  watch: {
    centerDialogVisible: function (newVal) {
      localStorage.setItem('updataDia', newVal)
      if (newVal === false) {
        this.customColor = '#FF1A2E'
        clearTimeout(this.timePoll)
      }
    },
    pageIndex: function (newVal) {
      if (newVal === 1) this.initNetwork()
      if (newVal === 2) this.initVersion()
    },
    downPercen: function (newVal) {
      if (newVal === 100 && this.customText === '下载完成') {
        this.numStatus = 'success'
      } else if (newVal < 100) {
        this.numStatus = null
      } else if (this.customText === '下载失败') {
        this.numStatus = 'exception'
      }
    },
    updataPercen: function (newVal) {
      if (newVal === 100 && this.customText === '更新完成') {
        this.numStatus = 'success'
      } else if (newVal < 100) {
        this.numStatus = null
      } else if (this.customText === '更新失败') {
        this.numStatus = 'exception'
      }
    }
  },
  destroyed () {
    if (this.timePoll) {
      clearTimeout(this.timePoll)
    }
  },

  mounted () { },
  methods: {
    async initNetwork () {
      let res = await this.$http.get('/crossroadinfo/')
      if (res.code !== 200) return
      this.datas = res.data.road_base_info
      this.update_at = this.datas.update_at
      this.siteDate.road_ip = this.datas.road_ip
      this.siteDate.netmask = this.datas.netmask
      this.siteDate.gateway = this.datas.gateway
      this.serverDate.server_ip = this.datas.server_ip
      this.serverDate.server_port = this.datas.server_port
      this.telesemeData.telese_ip = this.datas.telese_ip
    },
    async initVersion () {
      let res = await this.$http.get('/system/version/')
      if (res.code !== 200) return
      this.local = res.data.local
      this.newList = res.data.new
      this.local.version === this.newList.version
        ? (this.isUpToData = false)
        : (this.isUpToData = true)
      if (this.local.version === this.newList.version) {
        this.isUpToDataImg = false
      } else {
        let timeDiffer = new Date().getTime() - new Date(this.newList.ver_time).getTime()
        // 计算出相差天数
        if (Math.floor(timeDiffer / (24 * 3600 * 1000)) >= 7) {
          this.isUpToDataImg = false
        } else {
          this.isUpToDataImg = true
        }
      }
    },
    async downUpdata () {
      this.$confirm('系统更新后无法恢复，是否继续？', '系统升级', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.centerDialogVisible = true
        this.downPercen = parseInt(this.downPercen)
        let res = ''
        await $.ajax({
          url: this.upgradeAddress + `/system/update/firmware/`,
          type: 'GET',
          success: (data) => {
            res = data
            if (res.code === 200) {
              this.repeatCall()
            } else {
              if (res.code !== 200) {
                this.$message = res.msg
              }
            }
          }})
      })
    },
    // 进度
    async repeatCall () {
      if (this.updataPercen === 100) {
        clearTimeout(this.timePoll)
      }
      let res = ''
      await $.ajax({
        url: this.upgradeAddress + `/system/update/step/`,
        type: 'GET',
        success: (data) => {
          res = data
        }})
      // 当接口没有返回值或者返回错误处理
      if (!res || !res.data || res.code !== 200) {
        this.centerDialogVisible = false
        return
      }
      if (res.code !== 200) {
        this.$message.error(res.msg)
      }
      console.log(res.data)
      this.step = res.data.step
      this.percenStatus = res.data.status
      if (res.data.status === 1) {
        // 进度条颜色
        this.downPercen = 100
        this.customColor = '#FF1A2E'
        // 失败的文字
        res.data.status <= 3
          ? (this.customText = '下载失败')
          : (this.customText = '更新失败')
        return
      }
      let resData = res.data
      if (resData.step === 0) {
        if (this.downPercen <= 39) {
          this.customColor = '#027AFF'
          this.downPercen++
        }
      }
      if (resData.step < 4) {
        this.customColor = '#027AFF'
        this.customText = '下载中'
        this.downPercen = resData.down_per
      }
      if (resData.step === 4) {
        this.customColor = '#52C41A'
        this.downPercen = 100
        this.customText = '下载完成'
      }
      if (resData.step === 5 || resData.step === 4) {
        if (this.updataPercen <= 68) {
          this.updataPercen++
        }
      }
      if (resData.step === 6) {
        this.customColor = '#027AFF'
        if (this.updataPercen <= 97) this.updataPercen++
      }
      if (resData.step < 7 && resData.step > 4) {
        this.customColor = '#027AFF'
        this.customText = '更新中'
      }
      // if (resData.step === 7) {
      //   this.customColor = '#52C41A'
      //   this.customText = '更新完成'
      //   this.updataPercen = 100
      // }
      if (resData.step === 8) {
        this.customColor = '#52C41A'
        this.customText = '固件更新失败，回滚成功'
        this.updataPercen = 100
      }
      if (resData.step === 9) {
        this.customColor = '#FF1A2E'
        this.customText = '回滚失败'
        this.updataPercen = 100
      }

      // if (resData.step >= 7) {
      //   // 当前页刷新
      //   this.pageIndex = 1
      //   // 跳到登陆页
      //   // this.$router.push({
      //   //   name: 'login'
      //   // })
      // }
      if (resData.step === 7) {
        this.$message.success(res.msg)
        this.centerDialogVisible = false
        this.initVersion()
      }
      if (resData.step >= 7 && resData.step <= 9) {
        this.centerDialogVisible = false
      }
      this.timePoll = setTimeout(() => {
        this.repeatCall()
      }, 2000)
    },
    telesemeHold (telesemeData) {
      let isTrue = true
      this.$refs[telesemeData].validate((valid) => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      if (isTrue) return
      if (this.telesemeData.telese_ip === this.datas.telese_ip) {
        return this.$message.warning('内容没有修改')
      }
      // this.$confirm('配置文件修改后将重启系统,确认修改?', {
      this.$confirm('信号机IP更改后将绑定新的信号机,确认修改?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      })
        .then(() => {
          this.$http.put('edittelese/', this.telesemeData).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.initNetwork()
            }
          })
        })
        .catch(() => { })
    },
    siteHold (siteDate) {
      let isTrue = true
      this.$refs[siteDate].validate((valid) => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      if (isTrue) return
      if (
        this.siteDate.road_ip === this.datas.road_ip &&
        this.siteDate.netmask === this.datas.netmask &&
        this.siteDate.gateway === this.datas.gateway
      ) {
        return this.$message.warning('内容没有修改')
      }

      this.$confirm('配置文件修改后将重启系统,确认修改?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      })
        .then(() => {
          this.$http.post('setroadconfig/', this.siteDate).then((res) => {
            if (res.code === 200) {
              this.$message.success('正在重启')
              this.initNetwork()
            }
          })
        })
        .catch(() => { })
    },
    async serverHold (serverDate) {
      let isTrue = true
      this.$refs[serverDate].validate((valid) => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      if (isTrue) return
      this.$confirm('若服务端参数修改错误将造成数据丢失,确认修改?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      })
        .then(() => {
          this.$http.put('setserverconfig/', this.serverDate).then((res) => {
            if (res.code === 200) {
              this.$message.success('服务端参数修改成功')
              this.initNetwork()
            }
          })
        })
        .catch(() => { })
    },
    async test (serverDate) {
      let isTrue = true
      this.$refs[serverDate].validate((valid) => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      if (isTrue) return
      let res = await this.$http.post('testlink/', this.serverDate)
      if (res.code === 200) {
        this.$message.success('测试通过')
      }
    },
    restart () {
      this.$confirm('重启系统需要一定的时间,确定重启?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      })
        .then(() => {
          this.$http.get('restart/').then((res) => {
            if (res.code === 200) {
              this.$message.success('正在重启')
            }
          })
        })
        .catch(() => { })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/config.styl'
*
  font-family SourceHanSansCN-Medium, SourceHanSansCN
h3
  margin-bottom 20px
.f_normal
  font-size 14px
  font-weight 400
  margin-right 30px
.config_card
  margin-bottom 20px
  min-height 636px
.restart_box
  position relative
  min-height 50px
  .restart_btn
    width 100px
    color #fff
    background-color #FF6600
    position absolute
    top 50px
    left 50%
    transform translate(-50%, -50%)
.mar_30, .origin_active
  margin 0 15px 0 15px
  cursor pointer
.origin_active
  font-weight 600
.mar_30:before
  content ''
  display inline-block
  width 1px
  height 14px
  background #999999
  line-height 14px
  vertical-align middle
  margin -2px 10px 0 0
.origin_active:before
  background #FF6600
  width 2px
.onlien_updata, .best_version
  .title
    margin-bottom 40px
    h2
      width 72px
      height 18px
      font-size 18px
      font-weight 400
      color rgba(51, 51, 51, 1)
      line-height 27px
      display inline-block
      vertical-align super
      margin-left 5px
  .contain
    img
      margin-bottom 22px
    .newimg
      margin-left 50px
      p
        width 208px
        height 16px
        font-size 16px
        font-weight 500
        color rgba(153, 153, 153, 1)
        line-height 24px
        margin-left -50px
    .detail
      p
        margin-bottom 22px
        height 16px
        font-size 16px
        font-weight 500
        color rgba(66, 66, 66, 1)
        line-height 24px
        i
          font-weight 600
          font-style normal
      .new_icon:after
        content ''
        width 38px
        height 21px
        display inline-block
        margin 0 0 0 2px
        background url('../../assets/images/svg/system_config/updata.png') no-repeat
        background-size 100% 100%
        position relative
    .btn_sty
      font-size 16px
      font-weight 400
      color rgba(255, 255, 255, 1)
      line-height 24px
      background #ff6600
      margin 44px 0 0 18px
.best_version
  margin-left 80px
</style>
<style lang="stylus">
.system_config
  .el-progress-bar
    padding-right: 60px;
  .el-card__body
    min-height 150px
    padding 20px 0
  .el-form, h3
    margin 0 30px
  .el-progress__text
    color: white;
    margin-left: 0px
  .dia_pro
    .el-dialog__header
      display:none
    .el-dialog--center .el-dialog__footer
      display: none
    .el-dialog--center .el-dialog__body
      text-align: initial;
      padding: 0;
    .el-dialog
      position: relative;
      margin: 0 auto 50px;
      border-radius: 0px;
      -webkit-box-shadow:0 0px 0px;
      box-shadow:0 0px 0px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 50%;
      background: #808080;
      // background: red;
</style>
