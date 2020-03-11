<template>
  <div class="monitor">
    <div class="main-layout">
      <div class="monitor_title">
        <h5>视频监控</h5>
        {{cameraLists}}-----
      </div>
      <el-row :gutter="24">
        <el-col :span="18" v-if="!isShow">
          <el-card shadow="always" class="monitor_layout">

            <el-row v-if="cameraLists.length > 0" :gutter="20" >
              <div v-for="(item, i) in cameraLists" :key="i">
                <el-col :span="8" v-if="item.id">
                  <el-card shadow="always" class="video_layout" >
                    <div class="camera_direct">
                      <span class="tag_line">{{item.direct_type}}</span>
                      <span v-show="!(isShow && videoId === item.id)" @click="changeVideo(i,item)"></span>
                      <span v-show="isShow && videoId === item.id" @click="changeVideo(i,item)"></span>
                    </div>
                    <div class="video_box">
                      <video-player
                        class="video-js vjs-big-play-centered vjs-fluid"
                        controls
                        ref="videoPlayer"
                        preload="auto"
                        v-if="videoIndex === i"
                        :playsinline="true"
                        :options="playerOptions[i]"
                      ></video-player>
                      <span class="video_mask" @click="play(i, item)">
                        <i></i>
                      </span>
                    </div>
                    <div class="video_info">
                      <div class="video_data_info" v-if="(item.direct_type.indexOf('进口') > -1 && item.socketData )">
                        <p>
                          <span class="lable_name">车辆类型统计</span>:
                          大型: {{item.socketData.sum_info.car_type_sum ? item.socketData.sum_info.car_type_sum.big : ''}}辆
                          小型: {{item.socketData.sum_info.car_type_sum ? item.socketData.sum_info.car_type_sum.small : ''}}辆
                        </p>
                        <p>
                          <span class="lable_name">总车道流量</span>:
                          {{item.socketData.sum_info.flow_avg_sum >= 0 ? item.socketData.sum_info.flow_avg_sum : ''}} 辆/分
                        </p>
                        <p>
                          <span class="lable_name">平均车速</span>:
                          {{!item.socketData.sum_info.speed_avg_sum ? '' : item.socketData.sum_info.speed_avg_sum}} km/h
                        </p>
                      </div>
                      <div class="video_data_info" v-if="item.direct_type.indexOf('行人') > -1 && item.socketData ">
                        <p>
                          <span class="lable_name">区域总人数 </span>:
                          {{!item.socketData ? '' : item.socketData.direct_list[0].walk_calculate.person_exist}}人
                        </p>
                        <P>
                          <span class="lable_name">路口人流量 </span>:
                          {{!item.socketData ? '' : item.socketData.direct_list[0].walk_calculate.person_volume}}人/分
                        </P>

                      </div>
                      <div class="video_data_info" v-if="!item.socketData">
                        <span class="warning_info">
                          该方向未配置检测区
                        </span>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </div>
            </el-row>
            <p class="noData" v-if="cameraLists.length < 1">暂无监控信息</p>
          </el-card>
        </el-col>
        <el-col :span="18" v-if="isShow" class="active">
          <el-col :span="24" v-for="(item, i) in videoInfoList" :key="i">
            <el-card shadow="always" class="video_layout" >
              <div class="camera_direct" style="margin: 10px 0; font-size: 16px;">
                <span class="tag_line">{{item.direct_type}}</span>
                <span v-show="!(isShow && videoId === item.id)" @click="changeVideo(i,item)"></span>
                <span v-show="isShow && videoId === item.id" @click="changeVideo(i,item)"></span>
              </div>
              <div class="video_boxs">
                <video-player
                  class="video-js vjs-big-play-centered vjs-fluid"
                  controls
                  preload="auto"
                  :playsinline="true"
                  :options="playerOptions[i]"
                ></video-player>
              </div>
            </el-card>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always" class="monitor_layout video_details">
            <h3 v-show="!isShow">视频详情</h3>
            <h4 class="tag_line" style="margin-bottom: 10px" v-show="!isShow">设备配置</h4>
            <el-table
              :data="cameraData"
              style="width: 100%;"
              class="device-info"
              v-show="!isShow">
              <el-table-column
                label="摄像头方向"
                align="center">
                <template slot-scope="scope">
                  <span >{{ scope.row.direct_type }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="摄像头编号"
                align="center">
                <template slot-scope="scope">
                  <span  :style="scope.row.camera_num === '未关联' ? 'color: red' : ''" >{{ scope.row.camera_num }}</span>
                </template>
              </el-table-column>
            </el-table>
            <h4 class="tag_line">路口信息</h4>
            <div v-if="roadInfo.cross_name">
              <p>
                <span class="lable_name">路口名称</span>:
                <span>{{roadInfo.cross_name}}</span>
              </p>
              <p style="margin: 15px 0">
                <span class="lable_name">经纬度&nbsp;</span>:
                <span>{{roadInfo.longitude}}</span>,
                <span>{{roadInfo.latitude}}</span>
              </p>
              <p>
                <span class="lable_name">路口类型</span>:
                <span>{{roadInfo.cross_type}}</span>
              </p>
            </div>
            <div v-if="!roadInfo.cross_name">
              <p class="warning_infos">暂无数据</p>
            </div>
            <h4 class="tag_line">设备详情</h4>
            <div v-if="camerInfo.camera_num">
              <p>
                <span class="lable_name">设备编号</span>:
                <span>{{camerInfo.camera_num}}</span>
              </p>
              <p>
                <span class="lable_name">设备状态</span>:
                <span v-if="camerInfo.direct_type">正常</span>
              </p>
              <p>
                <span class="lable_name">识别方向</span>:
                <span>{{camerInfo.direct_type}}</span>
              </p>
              <p>
                <span class="lable_name">设备型号</span>:
                <span>{{camerInfo.model}}</span>
              </p>
              <p>
                <span class="lable_name">道路类型</span>:
                <span>{{camerInfo.type === 1 ? '车道识别' : camerInfo.type === 2 ? '人行道识别' : ''}}</span>
              </p>
              <p>
                <span class="lable_name">设备高度</span>:
                <span>{{camerInfo.height}}m</span>
              </p>
            </div>
            <div v-if="!camerInfo.camera_num">
              <p class="warning_infos">暂无数据</p>
            </div>
          </el-card>
          <el-card shadow="always" v-show="isShow" class="monitor_layout video_details" style="margin-top: 20px">
            <h4 class="tag_line">道路信息</h4>
            <div v-if="videoInfoList[0].socketData && videoInfoList[0].direct_type.indexOf('进口') > -1">
              <p>
                <span style="color: #666666">摄像头识别方向</span>:
                <span>{{videoInfoList[0].socketData.direct_type}}</span>
              </p>
              <p>
                <span style="color: #666666">车道总流量</span>:
                {{videoInfoList[0].socketData.sum_info.flow_avg_sum >= 0 ? videoInfoList[0].socketData.sum_info.flow_avg_sum : ''}} 辆/分
              </p>
              <p>
                <span style="color: #666666">平均车速</span> &nbsp;&nbsp;&nbsp;:
                {{!videoInfoList[0].socketData.sum_info.speed_avg_sum ? '' : videoInfoList[0].socketData.sum_info.speed_avg_sum}} km/h
              </p>
              <p>
                <span style="color: #666666">车辆类型</span>:
                大型:{{videoInfoList[0].socketData.sum_info.car_type_sum ? videoInfoList[0].socketData.sum_info.car_type_sum.big : ''}}辆
                小型:{{videoInfoList[0].socketData.sum_info.car_type_sum ? videoInfoList[0].socketData.sum_info.car_type_sum.small : ''}}辆
              </p>
            </div>
            <div v-if="videoInfoList[0].socketData && videoInfoList[0].direct_type.indexOf('行人') > -1">
              <p>
                <span style="color: #666666">区域总人数</span>:
                {{!videoInfoList[0].socketData.direct_list ? '' : videoInfoList[0].socketData.direct_list[0].walk_calculate.person_exist}}人
              </p>
              <p>
                <span style="color: #666666">路口人流量</span>:
                {{!videoInfoList[0].socketData.direct_list[0] ? '' : videoInfoList[0].socketData.direct_list[0].walk_calculate.person_volume}}人/分
              </p>
            </div>
            <div v-if="!videoInfoList[0].socketData">
              <span class="warning_infos">
                该方向未配置检测区
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playerOptions: [],
      playerOptionsflag: {
        height: '100',
        sources: [
          {
            type: 'rtmp/mp4',
            src: 'rtmp://192.168.245.37:1935/mylive/test1'
          }
        ],
        // aspectRatio: '16:9',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        techOrder: ['flash'],
        autoplay: true,
        fluid: true, // 按比例缩放以适应其容器
        // poster: '/static/assets/images/halt.png',
        controls: false,
        flash: {
          // hls: { withCredentials: false },
          swf: 'static/video-js.swf' // 引入静态文件swf
        },
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      personList: [],
      crossList: [],
      sumInfo: [],
      cameraLists: [],
      videoInfoList: [
        {
          camera_num: '',
          direct_type: '',
          id: 1,
          model: '',
          type: 1
        }
      ],
      cameraData: [],
      roadInfo: {
        cross_name: '',
        longitude: '',
        latitude: '',
        cross_type: ''
      },
      camerInfo: {},
      isShow: false,
      videoIndex: 0,
      videoId: 0
    }
  },
  sockets: {
    connect () {
    },

    // 路口数据
    camera_response (res) {
      try {
        let data = JSON.parse(res.data)
        this.crossList = []
        if (data.length < 1 || !data) return
        data.map(v => {
          this.directSwitch(v)
          if (v.sum_info) {
            v.sum_info.flow_avg_sum = v.sum_info.flow_avg_sum.toFixed(0)
            v.sum_info.queeze_length_avg = v.sum_info.queeze_length_avg.toFixed(0)
            v.sum_info.speed_avg_sum = v.sum_info.speed_avg_sum.toFixed(2)
            v.sum_info.car_type_sum.big = v.sum_info.car_type_sum.big.toFixed(0)
            v.sum_info.car_type_sum.small = v.sum_info.car_type_sum.small.toFixed(0)
          }
          this.crossList.push(v)
        })
        this.cameraLists.forEach(v => {
          this.crossList.forEach(val => {
            if (val.direct_type === v.direct_type) {
              v.socketData = val
              this.$forceUpdate()
            }
          })
          // if (this.crossList.indexOf(v.direct_type) === -1) {
          //   v.socketData = {}
          // }
        })
        this.videoInfoList.forEach(v => {
          this.crossList.forEach(val => {
            if (val.direct_type === v.direct_type) {
              v.socketData = val
              this.$forceUpdate()
            }
          })
        })
      } catch (error) {}
    },
    // 人行数据
    walk_camera_response (res) {
      try {
        let data = JSON.parse(res.data)
        this.personList = []
        if (!data || data.length < 1) return
        data.map(v => {
          if (v.direct_list.length < 1) return
          v.direct_list.map(v => {
            v.walk_calculate.person_exist = v.walk_calculate.person_exist.toFixed(0)
            v.walk_calculate.person_volume = v.walk_calculate.person_volume.toFixed(0)
          })
          this.directSwitch(v)
          this.personList.push(v)
        })
        this.cameraLists.forEach(v => {
          this.personList.forEach(val => {
            if (val.direct_type === v.direct_type) {
              v.socketData = val
              this.$forceUpdate()
            }
          })
        })
        this.videoInfoList.forEach(v => {
          this.crossList.forEach(val => {
            if (val.direct_type === v.direct_type) {
              v.socketData = val
              this.$forceUpdate()
            }
          })
        })
      } catch (error) {}
    }
  },
  created () {
    this.init()
  },
  mounted () {
    // this.init()
  },
  methods: {
    async init () {
      await this.getRoadInfo()
      await this.getCameraList()
      await this.play(0, this.cameraLists[0])
    },
    async getCameraList () {
      let res = await this.$http.get('phaselist/')
      let { camera_list: cameraList } = res.data
      this.cameraData = cameraList
      let arr = []
      cameraList.map(v => {
        this.directSwitch(v)
        if (v.camera_num === '') {
          v.camera_num = '未关联'
        }
        if (v.id) {
          arr.push(v)
          arr.socketData = {}
        }
      })
      this.cameraLists = arr
      this.cloneVideo()
      if (arr.length < 1) return
      this.getCamerInfo(arr[0].id)
    },
    async getCamerInfo (id) {
      let res = await this.$http.get('camerainfo/', {params: {'camera_id': id}})
      this.camerInfo = res.data
      this.directSwitch(this.camerInfo)
    },
    async getRoadInfo () {
      let res = await this.$http.get('crossroadinfo/')
      let roadInfo = res.data
      this.roadInfo.cross_name = roadInfo.cross_name
      this.roadInfo.equipment_type = roadInfo.equipment_type + ''
      this.roadInfo.longitude = roadInfo.longitude
      this.roadInfo.latitude = roadInfo.latitude
      this.roadInfo.cross_type = roadInfo.cross_type + ''
      if (roadInfo.cross_type === 1) {
        this.roadInfo.cross_type = '十字形'
      } else if (roadInfo.cross_type === 2) {
        this.roadInfo.cross_type = 'Y字形'
      } else if (roadInfo.cross_type === 3) {
        this.roadInfo.cross_type = 'T字形'
      }
    },
    // 切换视频大小
    async changeVideo (index, item) {
      this.isShow = !this.isShow
      this.videoId = item.id
      if (this.isShow) {
        this.getCamerInfo(item.id)
        this.videoInfoList[0] = this.cameraLists[index]
        this.playerOptions[0] = this.playerOptions[index]
        this.playerOptions[0].autoplay = true
      } else {
        await this.getCameraList()
        for (let i = 0; i < this.cameraLists.length; i++) {
          if (item.id === this.cameraLists[i].id) {
            this.play(i, this.cameraLists[i])
            this.playerOptions[i].autoplay = true
          }
        }
      }
    },
    // 生成多个playerOptions
    cloneVideo () {
      for (let i = 0; i < this.cameraLists.length; i++) {
        // let temp = JSON.stringify(this.playerOptionsflag)
        this.playerOptions[i] = JSON.parse(JSON.stringify(this.playerOptionsflag))
        this.playerOptions[i].sources[0].src = this.cameraLists[i].src
      }
    },
    // 播放 暂停
    play (index, item) {
      this.videoIndex = index
      if (item) {
        this.getCamerInfo(item.id)
      }
      let dom = document.querySelectorAll('.video_mask')
      for (let i = 0; i < this.cameraLists.length; i++) {
        // this.$refs.videoPlayer[i].player.pause() // 暂停
        dom[i].style.display = 'block'
        dom[i].parentElement.style.height = dom[index].parentElement.clientWidth / 16 * 9 + 'px'
        dom[i].firstChild.style.display = 'block'
      }
      if (this.playerOptions.length < 1) return
      this.playerOptions[index].sources[0].src = this.cameraLists[index].src
      dom[index].style.display = 'none'
      dom[index].firstChild.style.display = 'none'
      this.playerOptions[index].autoplay = true
      // this.$refs.videoPlayer[index].player.play() // 播放
    },
    directSwitch (value) {
      if (value.direct_type === 1) {
        value.direct_type = '东进口'
      } else if (value.direct_type === 2) {
        value.direct_type = '西进口'
      } else if (value.direct_type === 3) {
        value.direct_type = '南进口'
      } else if (value.direct_type === 4) {
        value.direct_type = '北进口'
      } else if (value.direct_type === 5) {
        value.direct_type = '东行人'
      } else if (value.direct_type === 6) {
        value.direct_type = '西行人'
      } else if (value.direct_type === 7) {
        value.direct_type = '南行人'
      } else if (value.direct_type === 8) {
        value.direct_type = '北行人'
      }
    }

  },
  beforeDestroy () {
  }
}
</script>

<style scoped lang="stylus">
@import '../assets/css/monitor.styl'
.monitor
  p
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
  .video_info
    height 60px
    padding 7px 0
    .video_data_info
      p
        margin-right 0
    .warning_info
      display block
      line-height 60px
      text-align center
  .big_warning_info
    display block
    line-height 30px
    text-align center
    margin-bottom 20px
  .noData
    height 200px
    line-height 200px
    font-size 24px
    margin 0 auto
    text-align center
  .warning_infos
    color #909399
    display block
    text-align center
    margin-bottom 20px
</style>

<style lang="stylus">
.monitor
  .el-col-8
    padding 0 7px !important
    margin-bottom 20px
  .el-card__body
    padding 20px 10px
    padding-bottom 0
    .video_layout
      .el-card__body
        padding 0
  .active
    .el-card__body
      padding 0px 10px 20px
      .video_layout
        .el-card__body
          padding 0
  .video_details
    .el-card__body
      padding 0px 20px
      padding-bottom 0
    .el-table td, .el-table th
      padding 8px 0
      color #333333
    .el-table th
      font-weight 400
  .vjs-big-play-centered .vjs-big-play-button
    border-radius 50%
    border 0
  .video-js .vjs-big-play-button
    width 1.5em
    margin-left -0.75em
</style>
