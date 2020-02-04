<template>
  <div class="control_info">
    <div class="steps">
      <div class="step active">
        <div class="line "><span>1.路口信息</span><div class="dot"><i></i></div></div>
      </div>
      <div class="step active">
        <div class="line"><span>2.设备信息</span><div class="dot"><i></i></div></div>
      </div>
      <div class="step active">
        <div class="line"><span>3.控制信息</span><div class="dot"><i></i></div></div>
      </div>
    </div>
    <el-row type="flex" class="row-bg">
      <el-col :span="14">
        <el-form label-width="80px" :model="formdata" class="controlInfo">
          <el-form-item label="控制模式:" style="height:32px">
            &nbsp;&nbsp;&nbsp;自主控制
          </el-form-item>
          <el-form-item label="控制类型:">
            <el-radio-group v-model="formdata.control_type" @change="changeSelect">
              <el-radio label="1" >
                <div class="round">
                  <i></i>
                  <span>策略控制</span>
                </div>
              </el-radio>
              <el-radio label="2" disabled>
                <div class="round">
                  <i></i>
                  <span>时间表控制</span>
                </div>
              </el-radio>
              <el-radio label="3">
                <div class="round">
                  <i></i>
                  <span>固定时间控制</span>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="控制方案:" style="height:32px">
            <el-select v-model="formdata.plan_id" placeholder="请选择方案">
              <el-option  v-for="(item,i) in selectList" :key="i" :label="item.plan_name != undefined ? item.plan_name : item.tactics_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <div style="margin: 30px auto; text-align:right" class="diagram">
          <div style="text-align: center;  width:370px; display: inline-block;">
            <div class="img-style">
              <div class="div_n">
                <div class="phase">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[2].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[1].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[0].phase_num}}</span>
                </div>
                <div class="camera">
                  <span>{{ cameraData.length === 0 ? '' : cameraData[3].camera_num === '未关联' ? '' : cameraData[3].camera_num}}</span>
                </div>
                <div class="camera_img">
                  <span class="camera_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="camera_person">
                  <span>{{ 7 > cameraData.length ? '' : cameraData[7].camera_num === '未关联' ? '' : cameraData[7].camera_num}}</span>
                </div>
                <div class="camera_person_img">
                  <span class="camera_person_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="phase_img">
                  <span class="phase_img_r"><img class="change_img" src="../../assets/images/svg/cross/right_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/right_1.svg" alt="" ></span>
                  <span class="phase_img_c" ><img class="change_img" src="../../assets/images/svg/cross/straight_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/straight_1.svg" alt="" ></span>
                  <span class="phase_img_l"> <img class="change_img" src="../../assets/images/svg/cross/left_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/left_1.svg" alt="" ></span>
                </div>
                <div class="foot_way">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[12].phase_num}}</span>
                  <span class="foot_way_img"><img class="change_img" src="../../assets/images/svg/cross/footway_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/footway_1.svg" alt="" ></span>
                </div>
              </div>
              <div class="div_w">
                <div class="phase">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[5].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[4].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[3].phase_num}}</span>
                </div>
                <div class="camera">
                  <span>{{ cameraData.length === 0 ? '' : cameraData[1].camera_num === '未关联' ? '' : cameraData[1].camera_num}}</span>
                </div>
                <div class="camera_img">
                  <span class="camera_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="camera_person">
                  <span>{{ 7 > cameraData.length ? '' : cameraData[5].camera_num === '未关联' ? '' : cameraData[7].camera_num}}</span>
                </div>
                <div class="camera_person_img">
                  <span class="camera_person_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="phase_img">
                  <span class="phase_img_r"><img class="change_img" src="../../assets/images/svg/cross/right_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/right_1.svg" alt="" ></span>
                  <span class="phase_img_c" ><img class="change_img" src="../../assets/images/svg/cross/straight_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/straight_1.svg" alt="" ></span>
                  <span class="phase_img_l"> <img class="change_img" src="../../assets/images/svg/cross/left_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/left_1.svg" alt="" ></span>
                </div>
                <div class="foot_way">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[13].phase_num}}</span>
                  <span class="foot_way_img"><img class="change_img" src="../../assets/images/svg/cross/footway_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/footway_1.svg" alt="" ></span>
                </div>
              </div>
              <div class="div_s">
                <div class="phase">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[8].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[7].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[6].phase_num}}</span>
                </div>
                <div class="camera">
                  <span>{{ cameraData.length === 0 ? '' : cameraData[2].camera_num === '未关联' ? '' : cameraData[2].camera_num}}</span>
                </div>
                <div class="camera_img">
                  <span class="camera_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="camera_person">
                  <span>{{ 7 > cameraData.length ? '' : cameraData[6].camera_num === '未关联' ? '' : cameraData[7].camera_num}}</span>
                </div>
                <div class="camera_person_img">
                  <span class="camera_person_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="phase_img">
                  <span class="phase_img_r"><img class="change_img" src="../../assets/images/svg/cross/right_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/right_1.svg" alt="" ></span>
                  <span class="phase_img_c" ><img class="change_img" src="../../assets/images/svg/cross/straight_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/straight_1.svg" alt="" ></span>
                  <span class="phase_img_l"> <img class="change_img" src="../../assets/images/svg/cross/left_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/left_1.svg" alt="" ></span>
                </div>
                <div class="foot_way">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[14].phase_num}}</span>
                  <span class="foot_way_img"><img class="change_img" src="../../assets/images/svg/cross/footway_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/footway_1.svg" alt="" ></span>
                </div>
              </div>
              <div class="div_e">
                <div class="phase">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[11].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[10].phase_num}}</span>
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[9].phase_num}}</span>
                </div>
                <div class="camera">
                  <span>{{ cameraData.length === 0 ? '' : cameraData[0].camera_num === '未关联' ? '' : cameraData[0].camera_num}}</span>
                </div>
                <div class="camera_img">
                  <span class="camera_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="camera_person">
                  <span>{{ 7 > cameraData.length ? '' : cameraData[4].camera_num === '未关联' ? '' : cameraData[7].camera_num}}</span>
                </div>
                <div class="camera_person_img">
                  <span class="camera_person_imgs"><img class="change_img" src="../../assets/images/svg/cross/camera_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/camera_1.svg" alt="" ></span>
                </div>
                <div class="phase_img">
                  <span class="phase_img_r"><img class="change_img" src="../../assets/images/svg/cross/right_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/right_1.svg" alt="" ></span>
                  <span class="phase_img_c" ><img class="change_img" src="../../assets/images/svg/cross/straight_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/straight_1.svg" alt="" ></span>
                  <span class="phase_img_l"> <img class="change_img" src="../../assets/images/svg/cross/left_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/left_1.svg" alt="" ></span>
                </div>
                <div class="foot_way">
                  <span>{{ phaseTraffic.length === 0 ? '' : phaseTraffic[15].phase_num}}</span>
                  <span class="foot_way_img"><img class="change_img" src="../../assets/images/svg/cross/footway_2.svg" alt="" ><img class="change_img" src="../../assets/images/svg/cross/footway_1.svg" alt="" ></span>
                </div>
              </div>
            </div>
            <p style="font-size:14px; margin: 335px 0 5px;">路口示意图</p>
            <p style="font-size:12px">（数字为默认相位）</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="el-fot">
      <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
      <el-button style="margin-top: 12px;color:#fff; background-color:#FF6600" @click="confirm">设置完成</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phaseTraffic: [],
      cameraData: [],
      formdata: {
        control_type: '3',
        plan_id: ''
      },
      formdatas: {
        control_type: '',
        plan_id: ''
      },
      selectList: [],
      timeList: [],
      policyList: [],
      fixedplan_list: [],
      isSave: false
    }
  },
  created () {
    this.getFixedPlan()
    this.init()
  },
  mounted () {
  },
  methods: {
    async init () {
      let res = await this.$http.get('phaselist/')
      let phaseArr = []
      let cameraArr = []
      let { camera_list: cameraList, phase_list: phaseList } = res.data
      this.phaseTraffic = phaseList
      this.cameraData = cameraList
      cameraList.map(v => {
        if (v.direct_type === 1) {
          v.direct_type = '东'
        } else if (v.direct_type === 2) {
          v.direct_type = '西'
        } else if (v.direct_type === 3) {
          v.direct_type = '南'
        } else if (v.direct_type === 4) {
          v.direct_type = '北'
        }
        if (v.camera_num === '') {
          v.camera_num = '未关联'
        }
        cameraArr.push(v.camera_num)
      })
      phaseList.map(function (v, index) {
        if (JSON.stringify(v.light_info) === '{}') {
          v.light_info.light_num = '未关联'
        }
        phaseArr.push(v.light_info.light_num)
      })

      let phaseArrDom = this.getPhaseList().phaseArr
      let cameraArrDom = this.getPhaseList().cameraArr
      for (let i = 0; i < phaseArr.length; i++) {
        if (phaseArr[i] === '未关联') {
          phaseArrDom[i].lastChild.classList.remove('active')
        } else {
          phaseArrDom[i].lastChild.classList.add('active')
        }
      }
      for (let i = 0; i < cameraArr.length; i++) {
        if (cameraArr[i] === '未关联') {
          cameraArrDom[i].lastChild.classList.remove('active')
        } else {
          cameraArrDom[i].lastChild.classList.add('active')
        }
      }
    },
    async getPolicyPlan () {
      let res = await this.$http.get('tacticsplanlist/')
      this.selectList = res.data.tacticsplan_list
      if (this.selectList.length > 1) {
        this.formdata.plan_id = ''
      } else {
        this.formdata.plan_id = res.data.tacticsplan_list[0].id
      }
    },
    async getTimePlan () {
      this.selectList = ''
    },
    async getFixedPlan () {
      let res = await this.$http.get('fixedplanlist/')
      if (res.data.fixedplan_list.length > 0) {
        this.selectList = res.data.fixedplan_list
        this.formdata.plan_id = ''
      }
      if (this.selectList.length === 1) {
        this.formdata.plan_id = this.selectList[0].id
      }
    },
    prev () {
      this.$router.push({name: 'deviceinfo'})
    },
    async confirm () {
      if (this.formdata.plan_id === '' ||
        this.formdata.control_type === '') return this.$message.warning('请把内容填写完整')
      let res = await this.$http.post('bindcontrol/', this.formdata)
      this.isSave = true
      if (res.code === 200) {
        this.$router.push({ name: 'consoles' })
      }
    },
    getPhaseList () {
      let phaseList = document.querySelectorAll('.phase_img')
      let footWayList = document.querySelectorAll('.foot_way_img')
      let cameraList = document.querySelectorAll('.camera_imgs')
      let cameraPersonList = document.querySelectorAll('.camera_person_imgs')
      let phaseArr = []
      let cameraArr = []
      let obj = {}
      Object.values(phaseList).map(v => {
        Object.values(v.children).reverse().map(v => {
          phaseArr.push(v)
        })
      })
      Object.values(footWayList).map(v => {
        phaseArr.push(v)
      })
      cameraArr.push(cameraList[3], cameraList[1], cameraList[2], cameraList[0])
      cameraArr.push(cameraPersonList[3], cameraPersonList[1], cameraPersonList[2], cameraPersonList[0])

      obj.phaseArr = phaseArr
      obj.cameraArr = cameraArr
      return obj
    },
    changeSelect (val) {
      this.selectList = ''
      if (val === '1') {
        this.getPolicyPlan()
      } else if (val === '2') {
        this.getTimePlan()
      } else if (val === '3') {
        this.getFixedPlan()
      }
    }
  },
  // 页面数据是否保存
  beforeRouteLeave (to, from, next) {
    if (this.formdata.plan_id === this.formdatas.plan_id &&
        this.formdata.control_type === this.formdatas.control_type) return next()
    if (this.isSave) {
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
@import '../../assets/css/phaseImg.styl'

.round i
  background: url('../../assets/images/svg/radio-default.svg') no-repeat
.controlInfo .is-checked .round i
  background url('../../assets/images/svg/radio-active.svg') no-repeat
.el-select, .infoInputs
  width 366px
.controlInfo
  padding-top 20px
  .round
    position relative
    top -12px
    left 15px
    margin-left 10px
</style>
