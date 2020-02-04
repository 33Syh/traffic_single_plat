<template>
  <div @click="outsideclick(name_list.inputInfo)" id="mapsearchlat_container" class="mapsearchlat_container">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1170px"
      class="dialog_con"
      height="840px"
      show-close
      :close-on-click-modal="false"
      :before-close="handleClose"
      center
    >
      <div class="dialog_title">
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <!-- <span style="font-weight:bold;font-size:14px"> 经纬度设置 &nbsp;</span> -->
              <el-form
                :model="name_list"
                :rules="textCrossName"
                ref="cross_name"
              >
                <el-form-item
                  class="inputInfoname"
                  label="经纬度设置"
                  prop="inputInfo"
                >
                  <el-input
                    maxlength="18"
                    v-model="name_list.inputInfo"
                    style="width:180px;float:left"
                    placeholder="请输入路口名称"
                  ></el-input>
                  <el-button
                    style="color:#fff; background-color:#FF6600;float:right;margin-right:22px;margin-top:3px;display:inline"
                    size="small"
                    type="primary"
                    :close-on-click-modal="false"
                    @click.stop="searchlat('cross_name')"
                    icon="el-icon-search"
                  ></el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-form :model="formdata" :rules="rules" ref="formdataref">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="lng">
                  <span> 经度&nbsp;: &nbsp;</span>
                  <el-input
                    v-model="formdata.lng"
                    placeholder="请设置经度"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="lat">
                  <span>纬度&nbsp;: &nbsp; </span>
                  <el-input
                    v-model="formdata.lat"
                    placeholder="请设置纬度"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-button
                style="color:#fff; background-color:#FF6600;margin: 0 -5px;"
                @click="confirm('formdataref',formdata.lat,formdata.lng,name_list.inputInfo)"
                size="small"
                type="primary"
                >保存</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="map_contain">
        <baidu-map
          class="map"
          style="width:1170px;height:750px;"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          @mousemove="mousemove"
          @moveend="syncCenterAndZoom"
          @zoomend="syncCenterAndZoom"
          @ready="handler"
          @click="showInfo"
        >
          <bm-marker
            :position="{ lng: formdata.lng, lat: formdata.lat }"
            :dragging="false"
            animation="BMAP_ANIMATION_BOUNCE"
          >
          </bm-marker>
          <my-overlay
            :position="{ lng: mouselng, lat: mouselat }"
            :text="'经纬度：' + mouselng + ' ; ' + mouselat"
            :active="active"
            @mouseover.native="active = true"
            @mouseleave.native="active = false"
          >
          </my-overlay>
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MyOverlay from '../../components/layout/Overlay'
import $ from 'jquery'
export default {
  props: ['message', 'cross_name', 'falat', 'falng'],
  data () {
    var validateName = (rule, value, callback) => {
      /* eslint-disable */
      var pattern = /^[\u4E00-\u9FA5A-Za-z0-9\_\.\-]+$/
      if (value === '') {
        callback(new Error('路口名称不能为空'))
      } else if (!pattern.test(value)) {
        return callback(new Error('请输入正确路口名称'))
      }
      callback()
    }
    var longitude = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('经度不能为空'))
      }
      if (typeof value !== 'number') {
        let old = value.split('')
        let newarr = []
        old.map(v => {
          if ((Number(v) >= 0 && Number(v) <= 9) || v === '.') {
            newarr.push(v)
          }
        })
        if (old.length !== newarr.length) {
          return callback(new Error('请输入正确格式的经纬度'))
        }
        callback()
      }
    }
    var latitude = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('纬度不能为空'))
      }
      if (typeof value !== 'number') {
        let old = value.split('')
        let newarr = []
        old.map(v => {
          if ((Number(v) >= 0 && Number(v) <= 9) || v === '.') {
            newarr.push(v)
          }
        })
        if (old.length !== newarr.length) {
          return callback(new Error('请输入正确格式的经纬度'))
        }
        callback()
      }
    }
    return {
      infoWindow: {
        show: true
      },
      active: false,
      closeOnClick: false,
      height: 30,
      mouselat: '',
      mouselng: '',
      mousecenter: { lng: 0, lat: 0 },
      lng: '',
      lat: '',
      name_list: {
        inputInfo: ''
      },
      dialogVisible: false,
      center: { lng: 113.85847553685502, lat: 34.04143161161871 },
      zoom: 12,
      formdata: {
        lat: '',
        lng: ''
      },
      setTimeout1: '',
      textCrossName: {
        inputInfo: [
          {
            validator: validateName,
            trigger: 'focus'
          }
        ]
      },
      rules: {
        lat: [
          {
            validator: latitude,
            trigger: 'blur'
          }
        ],
        lng: [
          {
            validator: longitude,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    MyOverlay
  },
  watch: {
    message (val) {
      if (this.$refs['cross_name']) {
        this.$refs['cross_name'].resetFields()
      }
      if (this.$refs['formdataref']) {
        this.$refs['formdataref'].resetFields()
      }
      this.dialogVisible = this.message
      this.remapnum++
      this.name_list.inputInfo = localStorage.getItem('cross_name')
      // this.$forceUpdate()
      this.setTimeout1 = setTimeout(() => {
        let map = this.map
        this.handler({ BMap, map })
        this.formdata.lat = this.falat
        this.formdata.lng = this.falng
        this.mouselng = this.falng
        this.mouselat = this.falat
      }, 100)
    },
    
    falat (val) {
      this.formdata.lat = val
      this.center.lat = val
    },
    falng (val) {
      this.formdata.lng = val
      this.center.lng = val
    },
    cross_name (val) {
      this.name_list.inputInfo = val
    },
    formdata:{
      handler(newVal, oldVal) {
        localStorage.setItem('map_lat', newVal.lat)
        localStorage.setItem('map_lng', newVal.lng)
      },
      deep:true
    }
  },
  computed: {},
  mounted () {
    this.dialogVisible = this.message
    this.name_list.inputInfo = this.cross_name
  },
  destroyed () {},
  methods: {
   async outsideclick(feater){
      let that = this
        if (this.$refs['cross_name']) {
          that.$refs['cross_name'].resetFields()
        }
      that.name_list.inputInfo = feater
    },
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    async searchlat (validateRef) {
      let tempData = 1
      this.$refs[validateRef].validate(valid => {
        if (!valid) {
          tempData = tempData + 1
        }
      })
      if (tempData !== 1) {
        return
      }
      let that = this
      let url =
        'http://api.map.baidu.com/geocoding/v3/?address=' +
        this.name_list.inputInfo +
        '&output=json&ak=q6S3S45K1cZ8KpTvX9704TLTZnKBEwhQ&callback=showLocation'
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',
        success: function (res) {
          if (res.status !== 0) {
            that.$message.error('未找到相关地点，请输入正确路口名称！')
            that.center.lng = 113.85847553685502
            that.center.lat = 34.04143161161871
            that.formdata.lng = ''
            that.formdata.lat = ''
            if (that.$refs['formdataref']) {
              that.$refs['formdataref'].resetFields()
            }
            return
          }
          if (that.$refs['formdataref']) {
            that.$refs['formdataref'].resetFields()
          }
          that.formdata.lat = res.result.location.lat
          that.formdata.lng = res.result.location.lng
          that.center.lat = res.result.location.lat
          that.center.lng = res.result.location.lng
        },
        error: function (res) {
          that.$message.error(res.msg)
        },
        catch:function(){
          if (that.$refs['formdataref']) {
            that.$refs['formdataref'].resetFields()
          }
        }
      })
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    },
    clear () {
      this.infoWindow.contents = ''
    },
    mousemove (e) {
      this.mouselat = e.point.lat
      this.mouselng = e.point.lng
      this.mousecenter.lat = e.point.lat
      this.mousecenter.lng = e.point.lng
      this.$forceUpdate()
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    handleClose () {
      this.dialogVisible = false
      this.$emit('sendsonfunc', this.falng, this.falat)
    },
    confirm (validateRef,lat_data,lng_data) {
      if (this.$refs['formdataref']) {
        this.$refs['formdataref'].resetFields()
      }
      this.formdata.lat = lat_data
      this.formdata.lng = lng_data
      let tempData = 1
      this.$refs[validateRef].validate(valid => {
        if (!valid||valid==="") {
          tempData = tempData + 1
        }
      })
      if (tempData !== 1) {
        return
      }
      if (
        this.falat === this.formdata.lat &&
        this.falng === this.formdata.lng
      ) {
        this.$emit('sendsonfunc', this.falng, this.falat)
        this.dialogVisible = false
        return
      }
      this.$confirm('当前经纬度已发生更改，是否保存？', '提示')
        .then(() => {
          this.$emit('sendsonfunc', this.formdata.lng, this.formdata.lat)
        })
        .catch(() => {
          this.$message.info('取消保存')
          this.$emit('sendsonfunc', this.falng, this.falat)
        })
    },
    showInfo (e) {
      this.$refs['formdataref'].resetFields()
      this.formdata.lng = e.point.lng
      this.formdata.lat = e.point.lat
    },
    async handler ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.formdata.lat = this.formdata.lat+''
      this.formdata.lng = this.formdata.lng+''
      this.center.lat = this.formdata.lat
      this.center.lng = this.formdata.lng
    }
  }
}
</script>
<style lang="stylus" scoped>
.dialog_title
  padding 15px
  width 1103px
  padding-bottom 0px
.el-row
  margin-bottom 20px
  &:last-child
    margin-bottom 0
</style>
<style lang="stylus">
.mapsearchlat_container
  .primary:hover
    background: #FF6600;
    border-color: #FF6600;
    color: #fff;
  .el-dialog--center .el-dialog__body
    padding 0
  .dialog_con
    .el-dialog
      margin-top 80px !important
  .el-dialog__header, .el-dialog__body
    padding 0
  .el-input
    width 194px
  .el-col-7
    width 31%
  .el-col-6
    width 24%
    height 55px
    margin-top -4px
  .el-button--primary
    background #FF6600
    color white
    border-color #FF6600
    margin 0 -5px
  .el-form-item__error
    left 60px
    padding-top 0px
  .inputInfoname
    .el-form-item__error
      left 90px
      padding-top 0px
</style>
