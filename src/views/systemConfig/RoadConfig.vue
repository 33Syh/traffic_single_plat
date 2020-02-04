<template>
  <div class="roadconfig_contain">
    <div >
     <em class="table-title">
      路口配置
      <span class="fr f_normal">更新时间：{{update_at}}</span>
    </em>
    <Mapsearchlat :message="parentMsg" :cross_name ="formdata.cross_name" :falng="falng" :falat="falat"  @sendsonfunc="returnMapDate" ></Mapsearchlat>
    </div>
    <el-card style="height:90vh" class="box-card">
    <el-row type="flex" class="row-bg">
      <el-col :span="20">
        <div class="mr20"></div>
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
            <!-- <span class="infoInputs mr20" >
              <el-button type="primary"  style="color:#fff;" @click="modLatLong()">识别坐标</el-button>
            </span> -->
            <span class="infoInputs mr20">
              <el-button  style="color:#fff; background-color:#FF6600" @click="modLatLong()">修改坐标</el-button>
            </span>
             <span>
               <img style="vertical-align: middle;" src="@/assets/images/roadconfiglat.png" alt="" srcset="">
             </span>
             <span class="mr20">{{formdata.longitude}}, &nbsp;{{formdata.latitude}}</span>
          </el-form-item>
          <el-form-item label="最大周期时长:" prop="max_cycle">
            <el-input class="infoInputs max_cycle" v-model="formdata.max_cycle" maxlength="4" placeholder="请输入最大周期时长"  autocomplete="off" @input='deleteMessage'></el-input>
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
        <el-button style="margin-left: 212px; color:#fff; background-color:#FF6600" @click="complete('formdata')">保存</el-button>
      </el-col>
    </el-row>
    </el-card>
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
    var latitude = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('经纬度不能为空'))
      } else {
        callback()
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
      update_at: '',
      formdata: {
        cross_name: '',
        equipment_type: '',
        longitude: '',
        latitude: '',
        max_cycle: '120',
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
        latitude: [
          { validator: latitude, trigger: 'blur' }
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
    this.$cookies.get('cross_id')
  },
  mounted () {},
  methods: {
    returnMapDate (lng, lat, name) {
      this.formdata.longitude = lng
      this.formdata.latitude = lat
      this.parentMsg = false
    },
    saveName () {
      localStorage.setItem('cross_name', this.formdata.cross_name)
    },
    modLatLong () {
      // 把默认值传过去
      if (this.formdata.cross_name === '') return
      this.parentMsg = true
      this.falng = this.formdata.longitude
      this.falat = this.formdata.latitude
    },
    async complete (formName) {
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
      if (this.formdata.cross_name &&
          this.formdata.equipment_type &&
          this.formdata.latitude &&
          this.formdata.cross_type
      ) {
        this.isSave = true
        let res = await this.$http.put('editcrossroad/', this.formdata)
        if (res.code === 200) {
          // this.$confirm('路口IP配置成功,重启信号机方可生效', '提示', {
          //   confirmButtonText: '立即重启',
          //   cancelButtonText: '稍后重启',
          //   center: true
          // }).then(() => {
          //   this.$message({
          //     type: 'success',
          //     message: '正在重启!'
          //   })
          // }).catch(() => {
          // })
          this.$message.success('保存完成')
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
@import '../../assets/css/config.styl'
.el-select, .infoInputs {
  width: 366px;
  margin-left: 20px;
}
.crossInfo {
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-radio {
    margin-right: 13px;
  }
}
.mr20{
  margin-right:20px
  }
.cross-type {
  width: 108px;
  height: 108px;
  border: 1px solid #ccc;
  img {
    width: 100%;
  }
}
.crossInfo .is-checked .round i {
  background: url('../../assets/images/svg/radio-active.svg') no-repeat;
}
.round i
  background url('../../assets/images/svg/radio-default.svg') no-repeat
.crossInfo .is-checked .cross-type {
  // color #FF6600
  border: 1px solid #FF6600;
}
</style>

<style lang="stylus">
.fr {
  float: right;
}
.f_normal {
  font-size: 14px;
  font-weight: 400;
}
.max_cycle
  width 175px !important
.roadconfig_contain
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
