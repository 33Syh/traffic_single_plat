<template>
  <div class="cross-info crossinfo_contain ">
    <div class="steps">
      <div class="step active">
        <div class="line "><span>1.路口信息</span><div class="dot"><i></i></div></div>
      </div>
      <div class="step ">
        <div class="line"><span>2.设备信息</span><div class="dot"><i></i></div></div>
      </div>
      <div class="step ">
        <div class="line"><span>3.控制信息</span><div class="dot"><i></i></div></div>
      </div>
    </div>
     <Mapsearchlat :message="parentMsg" :cross_name ="formdata.cross_name" :falng="falng" :falat="falat"  @sendsonfunc="returnMapDate" ></Mapsearchlat>
    <el-row type="flex" class="row-bg">
      <el-col :span="13">
        <div style="margin: 20px;"></div>
        <el-form label-width="100px" :model="formdata" :rules="rules" ref="formdata" class="crossInfo">
          <el-form-item label="路口名称:" prop="cross_name">
            <el-input class="infoInputs" @input="saveName()" v-model="formdata.cross_name" maxlength="20" placeholder="请输入路口名称"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="设备类型:" prop="equipment_type">
            <el-select v-model="formdata.equipment_type" placeholder="请选择设备类型" @change='deleteMessage'>
              <el-option label="XHJ-CW-GA-FW1901" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="temp" prop="latitude">
            <span slot="label">
              经<span style="margin: 0 6px;">纬</span>度:
            </span>
            <span v-if="formdata.longitude===''||formdata.latitude===''" class="infoInputs mr20" >
              <el-button type="primary"  style="color:#fff;" @click="modLatLong()">识别坐标</el-button>
            </span>
            <span  v-if="formdata.longitude && formdata.latitude" class="infoInputs mr20">
              <el-button  style="color:#fff; background-color:#FF6600" @click="modLatLong()">修改坐标</el-button>
            </span>
             <span>
               <img style="vertical-align: middle;" src="@/assets/images/roadconfiglat.png" alt="" srcset="">
             </span>
             <span  v-if="formdata.longitude && formdata.latitude" class="mr20"> {{formdata.longitude}}, &nbsp;{{formdata.latitude}}</span>
          </el-form-item>
          <!-- <el-form-item label="temp"  prop="latitude">
            <span slot="label">
              经<span style="margin: 0 6px;">纬</span>度:
            </span>
            <el-input class="infoInput" v-model="formdata.longitude" maxlength="10" @input='deleteMessage' placeholder="请输入经度" ></el-input>
            <span style="margin: 0 5px"></span>
            <el-input class="infoInput" v-model="formdata.latitude" maxlength="10" @input='deleteMessage' placeholder="请输入纬度"></el-input>
          </el-form-item> -->
          <el-form-item label="最大周期时长:" prop="max_cycle">
            <el-input class="infoInputs max_cycle" v-model="formdata.max_cycle" placeholder="请输入最大周期时长"  autocomplete="off" @input='deleteMessage'></el-input>
            <span style="margin: 0 5px"></span>秒
          </el-form-item>
          <el-form-item label="路口类型:" prop="cross_type">
            <el-radio-group v-model="formdata.cross_type" @change='deleteMessage'>
              <el-radio label="1">
                <div class="cross-type">
                  <img src="@/assets/images/svg/cross_+.svg" alt>
                </div>
                <div class="round">
                  <i></i>
                  <span>十字形</span>
                </div>
              </el-radio>
              <el-radio label="2">
                <div class="cross-type">
                  <img src="@/assets/images/svg/cross_Y.svg" alt>
                </div>
                <div class="round">
                  <i></i>
                  <span>Y字形</span>
                </div>
              </el-radio>
              <el-radio label="3">
                <div class="cross-type">
                  <div style="padding: 5px 0px"></div>
                  <img src="@/assets/images/svg/cross_T.svg" alt>
                </div>
                <div class="round">
                  <i></i>
                  <span>T字形</span>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="tipMessage tip-color">{{tipMessage}}</div>
        </el-form>

      </el-col>
      <el-col :span="11">
        <div style="margin: 30px auto; text-align:right">
          <div style="text-align:center;  width:370px; display: inline-block">
            <img src="@/assets/images/svg/cross/crossingBg.svg" alt>
            <p style="font-size:14px; margin: 15px 0 5px;">路口示意图</p>
            <p style="font-size:12px">(数字为默认相位)</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="el-fot">
      <el-button style="margin-top: 12px; color:#fff; background-color:#FF6600" @click="next('formdata')">下一步</el-button>
    </div>
  </div>
</template>
<script>
import Mapsearchlat from '../../components/layout/Mapsearchlat'
export default {
  components: {
    Mapsearchlat
  },
  data () {
    var crossName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('路口名称不能为空'))
      } else {
        callback()
      }
    }
    var equipmentType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('设备类型不能为空'))
      } else {
        callback()
      }
    }
    var roadIp = (rule, value, callback) => {
      // 正则匹配ip
      let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|22[0-3])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
      if (value === '') {
        callback(new Error('路口IP不能为空'))
      }
      if (!pattern.test(value.toString())) {
        callback(new Error('请输入正确的格式'))
      }
    }
    var serverIp = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('服务IP不能为空'))
      }
      // 正则匹配ip
      let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|22[0-3])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
      if (!pattern.test(value.toString())) {
        callback(new Error('请输入正确的格式'))
      }
    }
    var netMask = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('子网掩码不能为空'))
      }
    }
    var gateWay = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('网关不能为空'))
      }
    }
    var serverPort = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('服务端端口不能为空'))
      }
      // 正则匹配端口
      let pattern = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
      if (!pattern.test(value.toString())) {
        callback(new Error('请设置0-65535的有效端口号!'))
      }
    }
    var maxCycle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('最大周期时长不能为空'))
      } else {
        let pattern = /^[0-9]*$/
        if ((value - 0) > 8160 || (value - 0) < 12 || !pattern.test(value)) {
          callback(new Error('请设置12秒-8160秒的有效周期时长'))
        }
        callback()
      }
    }
    var crossType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('路口类型不能为空'))
      } else {
        callback()
      }
    }
    return {
      parentMsg: false,
      formdata: {
        cross_name: '',
        equipment_type: '',
        // road_ip: '',
        // server_ip: '',
        // netmask: '',
        // gateway: '',
        // server_port: '',
        longitude: '',
        latitude: '',
        max_cycle: '',
        cross_type: ''
      },
      falat: '',
      falng: '',
      rules: {
        cross_name: [
          { validator: crossName, trigger: 'blur' }
        ],
        equipment_type: [
          { validator: equipmentType, trigger: 'blur' }
        ],
        road_ip: [
          { validator: roadIp, trigger: 'blur' }
        ],
        server_ip: [
          { validator: serverIp, trigger: 'blur' }
        ],
        netmask: [
          { validator: netMask, trigger: 'blur' }
        ],
        gateway: [
          { validator: gateWay, trigger: 'blur' }
        ],
        server_port: [
          { validator: serverPort, trigger: 'blur' }
        ],
        max_cycle: [
          { type: 'number', validator: maxCycle, trigger: 'blur' }
        ],
        cross_type: [
          { validator: crossType, trigger: 'blur' }
        ]
      },
      isSave: false,
      tipMessage: ''
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },

  created () {
    this.$http.get('crossroadinfo/').then(res => {
      let data = res.data
      data.road_base_info.equipment_type === 1 ? data.road_base_info.equipment_type = 1 : data.road_base_info.equipment_type = 1
      this.formdata = data.road_base_info
      this.formdata.equipment_type = data.road_base_info.equipment_type + ''
      this.formdata.cross_type = this.formdata.cross_type + ''
      localStorage.setItem('cross_name', this.formdata.cross_name)
      localStorage.setItem('map_lat', this.formdata.lat)
      localStorage.setItem('map_lng', this.formdata.lng)
    })
  },
  mounted () {},
  methods: {
    saveName () {
      localStorage.setItem('cross_name', this.formdata.cross_name)
    },
    returnMapDate (lng, lat, name) {
      this.formdata.longitude = lng
      this.formdata.latitude = lat
      this.parentMsg = false
    },
    modLatLong () {
      // 把默认值传过去
      if (this.formdata.cross_name === '') return
      this.parentMsg = true
      this.falng = this.formdata.longitude
      this.falat = this.formdata.latitude
    },
    async next (formName) {
      if (this.formdata.longitude === '' || this.formdata.latitude === '') {
        this.$message.warning('请点击识别坐标按钮设置路口经纬度')
      }
      let isTrue = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      if (isTrue) return
      // 带ip参数的判断
      // if (this.formdata.cross_name &&
      //     this.formdata.equipment_type &&
      //     this.formdata.road_ip &&
      //     this.formdata.server_ip &&
      //     this.formdata.netmask &&
      //     this.formdata.gateway &&
      //     this.formdata.server_port &&
      //     this.formdata.latitude &&
      //     this.formdata.cross_type
      // ) {
      if (this.formdata.cross_name &&
          this.formdata.equipment_type &&
          this.formdata.latitude &&
          this.formdata.cross_type
      ) {
        this.isSave = true
        let res = await this.$http.put('editcrossroad/', this.formdata)
        if (res.code === 200) {
          this.$router.push({name: 'deviceinfo'})
        }
      }
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    }
  },
  // 页面数据是否保存
  beforeRouteLeave (to, from, next) {
    if (!this.parentMsg) {
      next()
      return
    }
    if (this.formdata.latitude === localStorage.getItem('map_lat') && this.formdata.longitude === localStorage.getItem('map_lng')) {
      next()
    } else {
      const answer = window.confirm('当前页面数据未保存，确定要离开？')
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.el-select, .infoInputs
  width 366px
.crossInfo
  .el-form-item
    margin-bottom: 30px
  .el-radio
    margin-right: 13px
.cross-type
  width 108px
  height 108px
  border 1px solid #ccc
  img
    width: 100%
.round i
  background url('../../assets/images/svg/radio-default.svg') no-repeat
.crossInfo .is-checked .round i
  background url('../../assets/images/svg/radio-active.svg') no-repeat
.crossInfo .is-checked .cross-type
  border 1px solid #FF6600
.max_cycle
  width 175px !important
.crossinfo_contain
  .el-form-item__error {
      color: #F56C6C;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 30px;
  }
</style>
