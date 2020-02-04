<template>
  <div class="car_edit">
    <em>道路区域配置</em>
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="tag-group">
              <el-button
                v-for="(item, i) in cameraList"
                :key="i"
                :class="t_active && cameraIndex === i ? 'b_org' : ''"
                @click="camdetail(item.id, item, i)"
                effect="plain"
                >{{ item.f_direct }}
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="24">
          <!-- 设备信息 -->
          <div class="device">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="little_tit">设备信息</span>
              </div>
              <div class="info_device">
                <span>路口名称：{{ cross_name }}</span>
                <span>摄像头状态：
                  {{ detail.status === 1 ?'正常':(detail.status===3?'故障':detail.status===4?'未连接':'故障、正常以外的状态') }}
                  <i
                  :class=" detail.status === 1 ? 'el-icon-success green' : 'el-icon-error dang'"
                ></i></span>
                <span style="padding-left:0">方向：{{ detail.f_direct }}</span>
                <span>摄像头编号：{{ detail.camera_num }}</span>
                <span>设备型号：{{ detail.model }}</span>
                <span>道路类别：{{ detail.type_s }}</span>
              </div>
            </el-card>
          </div>
          <div class="car_config">
            <el-card class="box-card">
              <div  class="clearfix">
                <span class="little_tit">{{
                  detail.type_s == '车道识别' ? '车道线配置' : '人行道配置'
                }}</span>
                <!-- mjh禁用 -->
                <!-- <el-button
                  type="primary"
                  v-if="detail.type_s == '车道识别' ? true : false"
                  :disabled="btn_sta.generate"
                  @click="addhandlaneline(1)"
                  >识别车道线</el-button
                > -->
                <el-button
                  type="primary"
                  v-if="btn_sta.draw_btn"
                  :disabled="btn_sta.generate"
                  @click="addhandlaneline(2)"
                  >绘制车道线</el-button
                >
                <el-button
                  type="primary"
                  v-if="detail.type_s == '车道识别' ? false : true"
                  @click="people_line()"
                  >{{ peopleLineName }}</el-button
                >
              </div>
            </el-card>
          </div>
          <div class="box2" style=" background-color: #fff; ">
              <div
                id="car_video"
                class="car_video"
                :style="{
                  'pointer-events': btn_sta.can_div,
                  cursor: btn_sta.canvas
                }"
              >
                <div class="realvideo">
                  <videoPlayer
                    class="vjs-custom-skin videoPlayer vjs-big-play-centered"
                    controls
                    @play="onPlayerPlay($event)"
                    preload="auto"
                    :style="{
                      'pointer-events': btn_sta.can_div,
                      cursor: btn_sta.canvas
                    }"
                    :options="playerOptions"
                  ></videoPlayer>
                </div>
                <canvas
                  v-show="isReady"
                  id="canvas"
                  width="960"
                  height="540"
                  class="line"
                  :style="{
                    cursor: btn_sta.canvas,
                    'pointer-events': btn_sta.can_div
                  }"
                ></canvas>
                <!-- 车道名称 -->
                <!-- 如果车道为空不显示，不为空显示 -->
                <!-- mjh更改 -->
                <div v-if="is_null.car">
                  <div
                    class="car_dao"
                    v-for="(car, index) in car_data"
                    :key="`lane_${index}`"
                  >
                    <div
                      v-if="is_null.car_name"
                      class="b_imgr"
                      style="z-index:999"
                      :style="{
                        marginLeft: car.X / 2 + 'px',
                        marginTop: car.Y / 2 + 'px'
                      }"
                    >
                      {{ car.name }}
                    </div>
                  </div>
                </div>
                <!-- 检测线名称 -->
                <!-- 如果examline为空不显示，不为不显示 -->
                <!-- mjh更改 -->
                <div v-if="is_null.test">
                  <div
                    class="car_dao"
                    v-for="(exam, index) in exam_list"
                    :key="index"
                  >
                    <div
                      v-if="is_null.test_name"
                      class="b_imgr"
                      style="z-index:999"
                      :style="{
                        marginLeft:
                          parseInt((exam.dots[0][1] + exam.dots[1][1]) / 2) /
                            2 +
                          'px',
                        marginTop:
                          parseInt((exam.dots[0][0] + exam.dots[1][0]) / 2) /
                            2 -
                          40 +
                          'px'
                      }"
                    >
                      {{ exam.name }}
                    </div>
                  </div>
                </div>
                <!-- 车道线 -->
                <!-- mjh更改 -->
                <div v-if="is_null.car_line">
                  <div
                    class="tip_msg"
                    style="left:20px;z-index:999"
                    v-for="(item, index) in lane_list"
                    :key="`car_line_${item.id}`"
                  >
                    <!-- 车道线名称 -->
                    <div
                      v-if="is_null.car_line_name"
                      class="b_img"
                      style="z-index:999"
                      :style="{
                        marginLeft: item.dots_list[0][1] / 2 - 58 + 'px',
                        marginTop: item.dots_list[0][0] / 2 - 34 + 'px'
                      }"
                    >
                      {{ item.name }}
                    </div>
                    <!-- 车道线红叉 -->
                    <div
                      v-if="is_null.car_line_del"
                      class="errx"
                      @click="del_ico(index, item)"
                      :style="{
                        marginLeft: item.dots_list[0][1] / 2 - 9 + 'px',
                        marginTop: item.dots_list[0][0] / 2 - 9 + 'px',
                        display: btn_sta.x_red
                      }"
                    ></div>
                  </div>
                </div>
              </div>
          </div>
          <el-card>
            <!-- 车道线列表 -->
            <div class="line_card" v-if="is_null.car_line">
              <el-table
                :data="lane_list"
                :default-sort="{ prop: 'create_at', order: 'ascending' }"
                :header-cell-class-name="font_style"
                :cell-class-name="font_style"
                style="width: 100%"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  show-overflow-tooltip
                  width="180"
                  :index="indexMethod(1)"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="direct"
                  label="类型"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="create_at"
                  label="创建时间"
                ></el-table-column>
                <!-- mjh更改 -->
                <el-table-column prop="address" label="操作" width="180px">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="dellaneline(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
          <!-- 车道 -->
          <div class="car_lineconfig" :style="{ display: car_sta }">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="little_tit">车道配置</span>
                <el-button
                  type="primary"
                  :disabled="btn_sta.gen_drive"
                  @click="btn_add()"
                  >生成车道</el-button
                >
              </div>
              <div class="line_card">
                <el-table
                  :data="car_data"
                  :header-cell-class-name="font_style"
                  :cell-class-name="font_style"
                  style="width: 100%"
                  v-if="is_null.car"
                >
                  <el-table-column
                    type="index"
                    label="序号"
                    width="180"
                    show-overflow-tooltip
                    :index="indexMethod(1)"
                  ></el-table-column>
                  <el-table-column
                    prop="name"
                    label="名称"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="arr_line"
                    label="车道线"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="orien"
                    label="类型"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="direct"
                    label="方向"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="width_m"
                    label="宽度"
                    show-overflow-tooltip
                  ></el-table-column>
                  <!-- <el-table-column prop="sort" label="类型"></el-table-column> -->
                  <el-table-column
                    prop="create_at"
                    label="创建时间"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="update_at"
                    label="更新时间"
                    show-overflow-tooltip
                  ></el-table-column>
                  <!-- mjh更改 -->
                  <el-table-column prop="address" label="操作" width="180px">
                    <template slot-scope="scope">
                      <el-button type="text" @click="addexamline(scope.row)"
                        ><span :style="{ color: scope.row.fontOrg }"
                          >重置检测线</span
                        >
                      </el-button>
                      <el-button
                        type="text"
                        @click="scheme_edit(scope.$index, scope.row)"
                      >
                        编辑
                      </el-button>
                      <el-dialog
                        class="add_stage"
                        align="left"
                        title="编辑车道"
                        width="500px"
                        :close-on-click-modal="false"
                        :visible.sync="editFormVisible"
                      >
                        <!-- 编辑的内容 -->
                        <el-row class="add_plan">
                          <el-row :gutter="20">
                            <el-col :span="4">
                              <div class="grid-content bg-purple scheme_light">
                                名称
                              </div>
                            </el-col>
                            <el-col :span="20">
                              <div class="grid-content bg-purple">
                                <el-input
                                  v-model="edit_data.name"
                                  maxlength="30"
                                  autocomplete="off"
                                ></el-input>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="20">
                            <el-col :span="4">
                              <div class="grid-content bg-purple scheme_light">
                                类型
                              </div>
                            </el-col>
                            <el-col :span="20">
                              <div class="grid-content bg-purple">
                                <el-select
                                  v-model="edit_data.faceside"
                                  placeholder="请选择"
                                >
                                  <el-option
                                    v-for="item in type_options"
                                    :key="`type_${item.value}`"
                                    :label="item.label"
                                    :value="item.value"
                                  ></el-option>
                                </el-select>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="20">
                            <el-col :span="4">
                              <div class="grid-content bg-purple scheme_light">
                                方向选择
                              </div>
                            </el-col>
                            <el-col :span="20">
                              <div class="grid-content bg-purple">
                                <el-select
                                  v-model="edit_data.direct"
                                  placeholder="请选择"
                                >
                                  <el-option
                                    v-for="item in options"
                                    :key="`phase_${item.value}`"
                                    :label="item.value"
                                    :value="item.value"
                                  ></el-option>
                                </el-select>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="20">
                            <el-col :span="4">
                              <div class="grid-content bg-purple scheme_light">
                                宽度
                              </div>
                            </el-col>
                            <el-col :span="20">
                              <div class="grid-content bg-purple">
                                <el-input
                                  style="width:90%"
                                  v-model="edit_data.width"
                                  maxlength="5"
                                  autocomplete="off"
                                ></el-input
                                >&nbsp;&nbsp;m
                              </div>
                            </el-col>
                          </el-row>
                        </el-row>
                        <!-- 编辑的内容结束 -->
                        <div slot="footer" class="dialog-footer add_btn">
                          <el-button @click="editFormVisible = false"
                            >取 消</el-button
                          >
                          <el-button class="definite_btn" @click="editfixedplan"
                            >确 定</el-button
                          >
                        </div>
                      </el-dialog>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
          <!-- 人行道 -->
          <div
            class="walk_list"
            :style="{ display: walk_list.length > 0 ? '' : 'none' }"
          >
            <div class="line_card">
              <el-table
                :data="walk_list"
                :header-cell-class-name="font_style"
                :cell-class-name="font_style"
                style="width: 100%"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="180"
                  :index="indexMethod(1)"
                ></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column
                  prop="create_at"
                  label="操作时间"
                ></el-table-column>
                <el-table-column
                  prop="update_at"
                  label="更新时间"
                ></el-table-column>
                <!-- mjh更改 -->
                <el-table-column prop="address" label="操作" width="180px">
                  <template slot-scope="scope">
                    <el-button type="text" @click="addexamwalkline(scope.row)"
                      ><span style=" color: #FF6600 ">重置检测线</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      // 摄像头的路口名称
      cross_name: '',
      // 车道区域是否显示
      car_sta: '',
      // 判断是否为当前摄像头 (mjh添加)
      cameraIndex: 0,
      // 按钮颜色
      t_active: false,
      // 视频的
      playerOptions: {
        width: '960',
        // height: '540',
        sources: [
          {
            type: 'rtmp/mp4',
            src: 'rtmp://192.168.245.37:1935/mylive/test1'
          }
        ],
        aspectRatio: '16:9',
        techOrder: ['flash'],
        autoplay: true,
        flash: {
          // hls: { withCredentials: false },
          swf: 'static/video-js.swf' // 引入静态文件swf
        },
        controls: false
      },
      // 坐标
      x: 0,
      y: 0,
      x_draw: 5,
      // 按钮组
      cameraList: [],
      // 禁用
      btn_sta: {
        // 绘制车道线按钮是否显示
        draw_btn: '',
        // 车道线区域是否显示
        line: 'none',
        // 车道是否显示
        car: 'none',
        // 生成车道按钮是否禁用
        generate: true,
        canvas: 'default',
        gen_drive: true,
        can_div: '',
        x_red: ''
      },
      span_bimg: false,
      tip_msg: false,
      storage_data: {},
      // 为空显示与否
      is_null: {
        // 车道线
        car_line: false,
        // 车道线删除
        car_line_del: false,
        // 车道线名称
        car_line_name: false,
        // 车道
        car: false,
        // 车道名称
        car_name: false,
        // 检测线
        test: false,
        // 检测线名称
        test_name: false,
        // 检测线删除
        test_del: false,
        // 人行道
        people_walk: ''
      },
      // 详细信息
      detail: {},
      // 暂存坐标
      send_data: {},
      // 车道线列表
      lane_list: [],
      // 车道列表
      car_data: [],
      // 检测线列表
      exam_list: [],
      // fontOrg: '#409EFF', // #FF6600
      activeName: 'first',
      // 暂存要画的检测线的所有接口需要的内容
      car_area: {},
      //  暂存要绘检测线发的两个点
      last_arr: [],
      // 编辑
      editFormVisible: false,
      // 编辑数据
      edit_data: {},
      type_options: [
        {
          value: 1,
          label: '正向'
        },
        {
          value: 2,
          label: '背向'
        }
      ],
      options: [],
      selected_item: '',
      // 人行道的
      peopleLineName: '人行道配置',
      area_data: {},
      people_dots: [],
      render_data: [],
      // 人行道列表
      walk_list: [],
      walk_area: '',
      isReady: false
    }
  },
  watch: {
    // 车道线
    lane_list: function (newVal, old) {
      if (newVal.length <= 0) {
        this.is_null.car_line = false
        this.is_null.car = false
        this.is_null.test = false
        this.is_null.test_name = false
        this.is_null.test_del = false
      } else {
        this.is_null.car_line = true
        this.is_null.car_line_del = true
        this.is_null.car_line_name = true
      }
    },
    // 车道
    car_data (newVal, old) {
      if (newVal.length <= 0) {
        this.is_null.car = false
        this.is_null.car_name = false
        this.is_null.test = false
        this.is_null.test_name = false
        this.is_null.test_del = false
        if (this.lane_list.length >= 2) {
          this.btn_sta.gen_drive = false
        } else {
          this.btn_sta.gen_drive = true
        }
      } else {
        this.is_null.car = true
        this.is_null.car_name = true
      }
    },
    // 检测线
    exam_list (newVal, old) {
      if (newVal.length <= 0) {
        this.is_null.test = false
        this.is_null.test_name = false
        this.is_null.test_del = false
      } else {
        this.is_null.test = true
        this.is_null.test_name = true
        this.is_null.test_del = true
      }
    },
    walk_list (newVal, old) {
      if (newVal.length <= 0) {
        this.is_null.people_walk = false
      }
    }
  },
  mounted () {
    // 摄像头初始化
    this.init()
    // canvas初始化
    this.can_init()
  },
  created () {},
  methods: {
    // mjh 视频播放后加载数据
    onPlayerPlay (e) {
      if (e.isReady_ === true) {
        this.isReady = e.isReady_
        if (this.cameraList[this.cameraIndex].direct_type < 5) {
          this.data_inital(this.cameraList[this.cameraIndex].id)
        } else {
          this.ctx.clearRect(0, 0, this.c.width, this.c.height)
          this.sidewalklist()
        }
        // this.camdetail(this.cameraList[this.cameraIndex].id, this.cameraList[this.cameraIndex], 0)
      }
    },
    // 快捷删除
    del_ico (id, row) {
      this.dellaneline(id, row)
    },
    // 序号
    indexMethod (index) {
      return index
    },
    // 字体样式
    font_style ({ row, rowIndex }) {
      return 'sta_fontcenter'
    },
    // canvas初始化
    can_init () {
      this.c = document.getElementById('canvas')
      this.ctx = this.c.getContext('2d')
    },
    // 摄像头初始化
    init () {
      this.$http({
        methods: 'get',
        url: 'phaselist/'
      }).then(res => {
        if (res.code === 200) {
          const { camera_list: cameraList } = res.data
          // 更新摄像头列表
          this.cameraList = cameraList
          // 如果摄像头有的话
          if (this.cameraList.length > 0) {
            for (var i = 0; i < this.cameraList.length; i++) {
              if (this.cameraList[i].id === '') {
                this.cameraList.splice(i, 1)
                i = i - 1
              }
            }
            // 处理名称方法
            this.handel_name(this.cameraList)
          } else {
            // 如果摄像头没有的话，怎么办
          }
        } else {
          // 如果响应失败
          this.$message({
            message: '网络错误',
            type: 'warning'
          })
        }
      })
    },
    // 点击按钮显示下面信息
    async camdetail (id, row, index) {
      this.x_draw = 5
      this.car_data = []
      this.lane_list = []
      if (this.cameraIndex !== index) {
        this.isReady = false
        // mjh添加一个index参数  判断是否为当前选中项
        this.cameraIndex = index
      }
      // this.lane_list = []
      this.clear_canvas()
      this.t_active = true
      let crossRes = await this.$http.get('crossroadinfo/')
      if (crossRes.code === 200) { this.cross_name = crossRes.data.road_base_info.cross_name }
      let res = await this.$http({
        methods: 'get',
        url: `camerainfo/${id}/`
      })
      if (res.code === 200) {
        this.btn_sta.generate = false
        this.send_data.camera_id = id
        this.detail = res.data
        for (let i = 0; i < this.cameraList.length; i++) {
          if (this.cameraList[i].id === id) {
            this.detail = this.cameraList[i]
          }
        }
        this.playerOptions.sources[0].src = row.src
        // ---如果是车道
        if (row.direct_type < 5) {
          // 人行的隐藏
          this.area_data = {}
          this.people_dots = []
          this.render_data = []
          this.walk_list = []
          this.clear_canvas()
          // 车道的显示
          // 车道线初始化
          this.car_sta = ''
          this.data_inital(id)
          if (this.isReady) {
            this.data_inital(id)
          }
          this.btn_sta.draw_btn = true
          // ------
        } else {
          // ---如果是人行道
          // 车道的隐藏
          this.btn_sta.draw_btn = false
          this.car_sta = 'none'
          this.car_data = []
          this.lane_list = []
          this.exam_list = []
          if (this.isReady) {
            this.ctx.clearRect(0, 0, this.c.width, this.c.height)
            this.sidewalklist()
          }
          // 人行的显示
          // 这里是后续需要加的状态①以及请求
          // ------
        }
      } else {
        this.$message({
          message: '网络错误',
          type: 'warning'
        })
      }
    },
    // 处理摄像头的方向以及相关车道
    handel_name (list) {
      for (let i = 0; i < list.length; i++) {
        list[i].direct = list.direct_type
        if (list[i].type === 1) {
          list[i].type_s = '车道识别'
        } else {
          list[i].type_s = '人行道识别'
        }
        if (list[i].direct_type === 1) {
          list[i].f_direct = '东进口'
          // list[i].label = '东进口'
        } else if (list[i].direct_type === 2) {
          list[i].f_direct = '西进口'
          // list[i].label = '西进口'
        } else if (list[i].direct_type === 3) {
          list[i].f_direct = '南进口'
          // list[i].label = '南进口'
        } else if (list[i].direct_type === 4) {
          list[i].f_direct = '北进口'
          // list[i].label = '北进口'
        } else if (list[i].direct_type === 5) {
          list[i].f_direct = '东行人'
          // list[i].label = '东行人'
        } else if (list[i].direct_type === 6) {
          list[i].f_direct = '西行人'
          // list[i].label = '西行人'
        } else if (list[i].direct_type === 7) {
          list[i].f_direct = '南行人'
          // list[i].label = '南行人'
        } else if (list[i].direct_type === 8) {
          list[i].f_direct = '北行人'
          // list[i].label = '北行人'
        }
      }
      if (this.cameraList.length > 0) {
        this.camdetail(this.cameraList[0].id, this.cameraList[0], 0)
      }
    },
    // 车道线列表初始列表
    data_inital (id) {
      this.$http({
        methods: 'get',
        url: `lanelinelist/${this.send_data.camera_id}/`

      }).then(res => {
        if (res.code === 200) {
          this.lane_list = res.data.laneline_list
          // 有车道线
          if (this.lane_list.length > 0) {
            // 当上面有数据，但是车道线对不上，可以用
            for (var i = 0; i < this.lane_list.length; i++) {
              this.lane_list[i].direct = '车道线'
            }
            // 画出车道线
            this.draw_circle()
            // 当车道线大于0时，请求车道列表
            this.addlane(id)
          }
        } else {
          this.$message({
            message: '网络错误',
            type: 'warning'
          })
        }
      })
    },
    // 获取车道列表,并将数值传给画车道的区域
    addlane (id) {
      this.$http({
        methods: 'get',
        url: `lanelist/${id}/`

      }).then(res => {
        if (res.code === 200) {
          this.car_data = res.data.lane_list
          if (this.car_data.length > 0) {
            this.updateScreen()
          }
        } else {
          this.$message({
            message: '网络错误',
            type: 'warning'
          })
        }
      })
    },
    // 遍历现有的车道线
    draw_circle () {
      // 车道线
      for (var i = 0; i < this.lane_list.length; i++) {
        this.car_line(this.lane_list[i].dots_list)
      }
    },
    // 处理车道以及检测线
    updateScreen () {
      this.clear_canvas()
      this.exam_list = []
      for (let i = 0; i < this.car_data.length; i++) {
        this.car_data[i].dots_list = []
        // 拼凑组成的车道线
        this.car_data[i].arr_line =
          this.car_data[i].lanes_info[0].name +
          '--' +
          this.car_data[i].lanes_info[1].name
        // this.car_data[i].sort = '车道'
        this.car_data[i].width_m = this.car_data[i].width + 'm'
        if (this.car_data[i].faceside === 0) {
          this.car_data[i].orien = '---'
        } else if (this.car_data[i].faceside === 1) {
          this.car_data[i].orien = '正向'
        } else if (this.car_data[i].faceside === 2) {
          this.car_data[i].orien = '背向'
        } else {
          this.car_data[i].orien = '错误'
        }
        // 根据车道的组成通过名称找出车道线的两个名字，当两条都找出来的时候，挂到每一个车道的dots_list上，最后将dots_list传给区域画线
        // 这样做避免了整个数组的翻转，实用价值不大。原因是=>强迫症
        // 用的for循环看上去，后续用简单的方法进行优化
        for (let j = 0; j < this.lane_list.length; j++) {
          if (
            this.lane_list[j]['name'] === this.car_data[i].lanes_info[0].name
          ) {
            for (let k = 0; k < this.lane_list[j].dots_list.length - 1; k++) {
              this.car_data[i].dots_list.push(this.lane_list[j].dots_list[k])
            }
            for (let j = 0; j < this.lane_list.length; j++) {
              if (
                this.lane_list[j]['name'] ===
                this.car_data[i].lanes_info[1].name
              ) {
                for (
                  let k = this.lane_list[j].dots_list.length - 1;
                  k > 0;
                  k--
                ) {
                  this.car_data[i].dots_list.push(
                    this.lane_list[j].dots_list[k]
                  )
                }
              }
            }
          }
        }
        // 画车道区域
        this.car_line(this.car_data[i].dots_list, 1)
        // 给车道提示框定位的值：
        // 给每个车道取出dots_list的，收尾两个值的一半的横坐标，第1/4的坐标的纵坐标
        // 横坐标
        let len = this.car_data[i].dots_list.length
        // let temX = Math.abs((this.car_data[i].dots_list[0][1] - 0) - (this.car_data[i].dots_list[this.car_data[i].dots_list.length - 1][1] - 0))
        this.car_data[i].X =
          (this.car_data[i].dots_list[parseInt((len * 3) / 4)][1] +
            this.car_data[i].dots_list[parseInt(len / 4)][1]) /
          2
        // 纵坐标
        let temY = this.car_data[i].dots_list[parseInt(len / 4)][0]
        this.car_data[i].Y = temY
        // 如果存在检测线
        if (this.car_data[i].examline_info) {
          this.exam_list.push(this.car_data[i].examline_info)
        }
      }
      // 将所有的车道查询完毕后，操作检测线，如果检测线存在
      if (this.exam_list.length > 0) {
        for (var i = 0; i < this.exam_list.length; i++) {
          this.car_line(this.exam_list[i].dots, 2)
        }
      } else {
        // 如果没有检测线时
        this.is_null.test = false
      }
      if (this.exam_list.length > 0) {
        for (let i = 0; i < this.car_data.length; i++) {
          // 生成检测线的点：如果存在字体变色，画上两个点
          this.car_line(this.car_data[i].examline_info.dots[0], 3, 1)
          this.car_line(this.car_data[i].examline_info.dots[1], 3, 1)
          this.$set(this.car_data[i], 'fontOrg', '#FF6600')
        }
      }
    },
    // // 点击生成车道线
    // add_line () {
    //   this.btn_sta.canvas = 'default'
    //   this.btn_sta.can_div = ''
    // },
    // 手动绘制车道线data=1:点车道线，线车道线，人行道
    addhandlaneline (data) {
      this.x_draw = 1
      var that = this
      var cv = document.getElementById('canvas')
      var ctx = cv.getContext('2d')
      cv.onclick = null
      var arr = []
      cv.onmousedown = (ev) => {
        if (that.x_draw !== 1) return
        // mjh 增加一个画笔启动事件, 解决画线有两条线的问题
        ctx.beginPath()
        ctx.moveTo(ev.offsetX, ev.offsetY)
        cv.onmousemove = (ev) => {
          ctx.lineTo(ev.offsetX, ev.offsetY)
          arr.push([ev.offsetY * 2, ev.offsetX * 2])
          if (data === 2) {
            ctx.strokeStyle = '#2A05E7'
          } else {
            ctx.strokeStyle = 'transparent'
          }
          ctx.stroke()
          if (ev.offsetX < 10 || ev.offsetY < 10 || ev.offsetX > 930 || ev.offsetY > 510) {
            if (arr.length > 1 && data === 2) {
            // 划线请求
              that.drawline(arr)
            }
            cv.onmousemove = null
            cv.onmouseup = null
            arr = []
          }
        }
        cv.onmouseup = () => {
          if (arr.length <= 1 && data === 1) {
            if (that.x_draw === 1) {
              that.updateXY()
            }
          } else if (arr.length > 1 && data === 2) {
            // 划线请求
            that.drawline(arr)
          }
          cv.onmousemove = null
          cv.onmouseup = null
          arr = []
        }
        // let carVideo = document.getElementById('car_video')
        // 点击以后加一个状态,
      }
    },
    // 画线函数：前三个是车道相关的，从第四个起，是人行的
    // 第一个参数：需要操作的点集
    // 第二个参数：区别各种画线的参数：1区域填色，2：检测线，3：人行道边，其他：车道线
    // 第三个参数：是否是检测线的高亮：有的话就是检测线的高亮，没有就是普通画线
    // 第四个参数：
    car_line (dataArr, line, dots) {
      if (dots) {
        // 高亮画圆点
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'rgba(255,255,255,1)'
        this.ctx.beginPath()
        this.ctx.arc(dataArr[1] / 2, dataArr[0] / 2, 4, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.stroke()
      } else {
        // 画各种线
        this.ctx.beginPath()
        this.ctx.moveTo(dataArr[0][1] / 2, dataArr[0][0] / 2)
        for (var i = 0; i < dataArr.length; i++) {
          this.ctx.lineTo(dataArr[i][1] / 2, dataArr[i][0] / 2)
        }
        if (line === 2) {
          // 2检测线
          this.ctx.setLineDash([100, 1])
          this.ctx.lineWidth = 2
          this.ctx.strokeStyle = '#E82247'
        } else if (line === 1) {
          // 1填色
          this.ctx.closePath()
          // 进行绘图处理
          this.ctx.strokeStyle = 'rgba(86,248,224,0.3)'
          this.ctx.fillStyle = 'rgba(86,248,224,0.3)'
          // 填充路径
          this.ctx.fill()
        } else if (line === 3) {
          this.ctx.setLineDash([10, 25])
          this.ctx.lineWidth = 2
          this.ctx.strokeStyle = '#2A05E7'
        } else {
          // 车道线
          this.ctx.lineWidth = 2
          this.ctx.strokeStyle = '#2A05E7'
        }
        this.ctx.stroke()
        // 显示车道线小图标信息
        // this.little()
        this.span_bimg = true
      }
    },
    // 清除画布
    clear_canvas () {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height)
      if (this.lane_list.length > 0) {
        this.draw_circle()
      }
    },
    // 鼠标经过区域获取实时坐标
    realXY: function (event) {
      this.x = event.offsetX
      this.y = event.offsetY
      var obj = {}
      obj.x = this.x
      obj.y = this.y
      for (var i = 0; i < this.lane_list.length; i++) {
        for (var j = 0; j < this.lane_list[i].dots_list.length; j++) {
          if (
            obj.y === this.lane_list[i].dots_list[j].y ||
            obj.x === this.lane_list[i].dots_list[j].x
          ) {
            this.lane_list[i].r_x = obj.x
            this.lane_list[i].r_y = obj.y
          }
        }
      }
    },
    // 获取坐标
    // x_draw=1:车道线的点击
    // x_draw=3:人行道的点击
    // x_draw=2:车道检测线
    // x_draw=4:人行道检测线
    // x_draw=5:页面点击（删除功能）
    updateXY: function () {
      this.x = event.offsetX * 2
      this.y = event.offsetY * 2
      if (this.x_draw === 1) {
        this.drawline()
      } else if (this.x_draw === 3) {
        this.peoplexy(this.x, this.y)
      } else if (this.x_draw === 2) {
        this.examxy(this.x, this.y)
      } else if (this.x_draw === 4) {
        this.resetwalk(this.x, this.y)
      }
    },
    // 给车道线一个名字，有数据列表，以线的形式发，没有数据列就是点击生成
    drawline (arr) {
      // 当没有点击生成车道线按钮，点击视频时
      if (this.btn_sta.generate === true) {
        // 禁止点击
      } else {
        // 造一个名字
        let tempName = '车道线1'
        if (this.lane_list.length === 0) {
          tempName = '车道线1'
        } else {
          // 创建一个现有的name数组
          let nameArr = []
          for (let i = 0; i < this.lane_list.length; i++) {
            // 取出最后一个数字
            var temp = this.lane_list[i].name.substr(
              this.lane_list[i].name.length - 1,
              1
            )
            temp = parseInt(temp)
            nameArr.push(temp)
          }
          for (let j = 0; j < this.lane_list.length + 1; j++) {
            if (j > 0) {
              // 如果不在里面，就显示缺的
              if (nameArr.indexOf(j) === -1) {
                tempName = '车道线' + j
                break
              }
              // 如果在里面+1
              tempName = '车道线' + (j + 1)
            }
          }
        }
        // 如果等于的话就继续后加。
        this.send_data.name = tempName
      }
      if (this.lane_list.length === 6) {
        this.$message({
          message: '最多可配置6条车道线',
          type: 'error'
        })
        this.clear_canvas()
        this.data_inital(this.send_data.camera_id)
        return
      }
      // 如果是两个点,进入点的请求，如果是线进入线的请求
      if (arr) {
        this.line_request(arr)
      } else {
        this.dot_request()
      }
    },
    // 以点的方式发请求
    dot_request () {
      // 如果点的点存在则进去，如果不存
      this.send_data.x_axis = this.x
      this.send_data.y_axis = this.y
      // 发请求
      // 如果有数据需要提示一下，没数据直接生成
      if (this.car_data.length > 0) {
        // 提示框
        this.$confirm(
          '车道已生成，再次绘制车道线将清除原车道，是否继续？',
          '提示',
          {
            closeOnClickModal: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.apper()
            this.exam_list = []
          })
          .catch(() => {})
      } else {
        this.apper()
        this.exam_list = []
      }
      this.x = ''
      this.y = ''
    },
    // 两点生成车道线接口
    apper () {
      this.$http({
        method: 'post',
        url: 'addlaneline/',
        data: this.send_data
      }).then(res => {
        if (res.code === 200) {
          this.data_inital(this.send_data.camera_id)
          this.clear_canvas()
        }
      })
    },
    // 线生成的车道线
    line_request (arr) {
      if (this.car_data.length > 0) {
        // 提示框
        this.$confirm(
          '车道已生成，再次绘制车道线将清除原车道，是否继续？',
          '提示',
          {
            closeOnClickModal: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.sendLaneLine(arr)
            this.exam_list = []
            this.clear_canvas()
          })
          .catch(() => {
            this.clear_canvas()
            this.data_inital(this.send_data.camera_id)
          })
      } else {
        this.sendLaneLine(arr)
        this.exam_list = []
      }
    },
    // 手绘车道线的请求
    sendLaneLine (arr) {
      this.send_data.dots = JSON.stringify(arr)
      // 发请求，清除
      this.$http({
        method: 'post',
        url: 'addhandlaneline/',
        data: this.send_data
      }).then(res => {
        this.clear_canvas()
        this.data_inital(this.send_data.camera_id)
      })
    },
    // 删除车道线
    dellaneline (index, row) {
      // 如果有数据提示
      if (this.car_data.length > 0) {
        // 提示框
        this.$confirm(
          '删除车道线后对应车道也将删除，是否继续？',
          '删除车道线',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 删除列表
            this.delete_carline(index, row)
          })
          .catch(() => {})
      } else {
        this.$confirm('是否删除该车道线？', '删除车道线', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 删除列表
            this.delete_carline(index, row)
            this.clear_canvas()
          })
          .catch(() => {})
      }
      this.x_draw = 5
    },
    // 删除线并发给后端
    delete_carline (index, row) {
      this.$http({
        method: 'delete',
        url: `dellaneline/${row.id}/`
      }).then(res => {
        this.btn_sta.gen_drive = false
        // 删除列表
        if (res.code === 200) {
          // 遍历删除
          for (let i = 0; i < this.lane_list.length; i++) {
            if (row.id === this.lane_list[i].id) {
              this.lane_list.splice(i, 1)
            }
          }
          // 线删除
          this.clear_canvas()
          // 车道删除
          this.addlane(this.send_data.camera_id)
          if (this.lane_list.length < 2) {
            this.btn_sta.gen_drive = true
          }
        }
      })
      this.x_draw = 1
    },
    // 新的生成按钮
    btn_add () {
      this.$http({
        methods: 'get',
        url: `addlane/${this.send_data.camera_id}/`
      }).then(res => {
        if (res.code === 200) {
          this.addlane(this.send_data.camera_id)
        }
        this.btn_sta.gen_drive = true
      })
      this.x_draw = 5
    },
    // 翻转两条车道线的数组
    server_arr (res) {
      for (var i = 0; i < this.lane_list.length; i++) {
        for (let j = 0; j < this.lane_list.length; j++) {
          if (
            this.lane_list[j]['name'] === res.lane_list[i].lanes_info[0].name
          ) {
            this.car_data[i].dots_list = []
            this.car_data[i].dots_list.push(this.lane_list[j]['dots_list'])
          }
        }
        for (let k = 0; k < this.lane_list.length; k++) {
          if (
            this.lane_list[k]['name'] === res.lane_list[i].lanes_info[1].name
          ) {
            this.car_data[i].dots_list = []
            this.car_data[i].dots_list.push(this.lane_list[k]['dots_list'])
          }
        }
        this.q_car(res.lane_list[i].lanes_info)
      }
    },
    // 更新车道，
    updata_cardata () {
      this.$http({
        methods: 'get',
        url: `lanelist/${this.send_data.camera_id}/`

      }).then(res => {
        if (res.code === 200) {
          this.car_data = res.data.lane_list
          this.updateScreen()
        }
      })
    },
    // 遍历现有车道，将direct变为方向
    dire () {
      for (let i = 0; i < this.car_data.length; i++) {
        this.car_data[i].arr_line =
          this.car_data.data.lane_list[i].lanes_info[0].name +
          '--' +
          this.car_data.data.lane_list[i].lanes_info[1].name
        // this.car_data[i].sort = '车道'
        if (this.car_data[i].faceside === 0) {
          this.car_data[i].orien = '---'
        } else if (this.car_data[i].faceside === 1) {
          this.car_data[i].orien = '正向'
        } else if (this.car_data[i].faceside === 2) {
          this.car_data[i].orien = '背向'
        } else {
          this.car_data[i].orien = '错误'
        }
      }
    },
    // 检测线绘制:将两个点传过去，响应回来的数据，替换原来的car_data,只是增加了检测线的数据而已，不影响其他的
    async examxy (one, two) {
      this.btn_sta.generate = false
      let arr = []
      arr.push(two)
      arr.push(one)
      // 高亮
      this.hightLight(arr)
      this.last_arr.push(arr)
      if (this.last_arr.length === 2) {
        this.car_area.dots = JSON.stringify(this.last_arr)
        let res = await this.$http.post('addexamline/', this.car_area)
        if (res.code === 200) {
          // 将数据更新
          this.updata_cardata(this.car_area.dots)
          this.is_null.test = true
          this.is_null.test_name = true
          this.is_null.test_del = true
          this.last_arr = []
          this.x_draw = 5
        }
      }
    },
    // 高亮
    hightLight (arr) {
      this.car_line(arr, 3, 1)
    },
    // 删除检测线
    async del_detection (row) {
      // 发请求。请求成功，回来删除线
      this.$http({
        methods: 'get',
        url: `delexamline/${row.id}/`
      }).then(res => {
        if (res.code === 200) {
          for (var i = 0; i < this.exam_list.length; i++) {
            if (this.exam_list[i].id === row.id) {
              this.exam_list.splice(i, 1)
            }
          }
          this.clear_canvas()
          // 吧现有的车道画上，吧现有的检测线画上
          for (let i = 0; i < this.car_data.length; i++) {
            this.car_line(this.car_data[i].dots_list, '1')
            // 删除检测线：换颜色，并且画上两个点，变色
            if (row.id === this.car_data[i].examline_info.id) {
              this.$set(this.car_data[i], 'fontOrg', '')
            }
          }
          for (let i = 0; i < this.exam_list.length; i++) {
            this.car_line(this.exam_list[i].dots, 2)
          }
        }
      })
    },
    // 点击绘制检测线按钮
    async addexamline (row) {
      this.car_area.lane_id = row.id
      this.car_area.camera_id = this.send_data.camera_id
      var str = row.name.substr(row.name.length - 1, 1)
      this.car_area.name = '检测线' + str
      this.is_null.test = true
      this.is_null.test_del = true
      this.x_draw = 2
      var cv = document.getElementById('canvas')
      cv.onclick = data => {
        this.updateXY()
      }
    },
    // 编辑
    scheme_edit (index, row) {
      this.editFormVisible = true
      // 编辑页面的内容
      this.edit_data = {}
      let tempObj = {}
      for (let key in row) {
        tempObj[key] = row[key]
      }
      tempObj['lane_id'] = row.id
      this.edit_data = tempObj
      this.storage_data = JSON.parse(JSON.stringify(this.edit_data))
      // 要展示的相位
      this.chosePhase()
    },
    async chosePhase () {
      let res = await this.$http.get('phaselist/')
      let { code, data } = res
      if (code === 200) {
        // mjh 更改报错待校验
        let { phase_list: phaseList } = data
        // 选出type=1并且包含摄像头东西南北字的
        let phaseObj = phaseList.filter(data => {
          return (
            data.type === 1 &&
            // /^(this.detail.f_direct)/.data.phase_name
            data.phase_name.indexOf(this.detail.f_direct.substr(0, 1)) !== -1
          )
        })
        // 将这一项赋值给复选框
        phaseObj.map((item, index) => {
          Object.assign(item, { value: item.phase_name })
        })
        this.options = phaseObj
      }
    },
    // 编辑确认按钮
    async editfixedplan () {
      if (JSON.stringify(this.storage_data) === JSON.stringify(this.edit_data)) {
        return this.$message.warning('内容未修改')
      }
      let res = await this.$http.put(`editlane/${this.edit_data.id}/`, this.edit_data)
      const { code } = res
      if (code === 200) {
        this.editFormVisible = false
        this.updata_cardata()
      }
    },
    // 人行道配置，重置
    async people_line () {
      // 当>1时，点击重置删除，否则绘制
      // mjh 修改重置人行道 只清空画布
      let cv = document.getElementById('canvas')
      this.x_draw = 3
      // var cv = document.getElementById('canvas')
      cv.onmousedown = null
      // 请求列表，如果有，画上，
      // 页面点击
      this.x_draw = 3
      cv.onclick = data => {
        this.updateXY()
      }
      if (this.walk_list.length > 0) {
        this.clear_canvas()
      }
      // if (this.walk_list.length > 0) {
      //   //  删除，清空画布
      //   let res = await this.$http({
      //     methods: 'get',
      //     url: 'delsidewalk/',
      //     params: {
      //       sidewalk_id: this.walk_list[0].id
      //     }
      //   })
      //   if (res.code === 200) {
      //     this.sidewalklist()
      //     // 页面禁用
      //     this.btn_sta.canvas = 'default'
      //     this.btn_sta.can_div = 'none'
      //   }
      // }
    },
    // 点击来的点
    peoplexy (x, y) {
      if (this.people_dots.length === 0) {
        this.area_data.xl = x - 4
        this.area_data.xr = x + 4
        this.area_data.yt = y - 4
        this.area_data.yb = y + 4
        // 触发高亮
        this.peopleHeightLight(x, y)
        // 高亮
      } else {
        if (this.people_dots.length > 2) {
          // 判断是否在原点范围内
          this.isBelongRender(x, y)
        } else {
          this.isBelongBefore(x, y)
          // 小红旗函数
        }
      }
    },
    // 是否在原点范围内
    async isBelongRender (x, y) {
      let str =
        Math.abs(this.area_data.xl + 4 - x) <= 20 &&
        Math.abs(this.area_data.yt + 4 - y) <= 20
      if (str) {
        var obj = {}
        obj.walk_dots = JSON.parse(JSON.stringify(this.people_dots))
        let temp = this.people_dots[this.people_dots.length - 1][0]
        obj.walk_dots[obj.walk_dots.length - 1][0] =
          obj.walk_dots[obj.walk_dots.length - 1][1]
        obj.walk_dots[obj.walk_dots.length - 1][1] = temp
        obj.walk_dots = JSON.stringify(obj.walk_dots)
        obj.camera_id = this.detail.id
        obj.name = '人行道'
        obj.examline_dots = JSON.stringify([[424, 848], [322, 1560]])
        obj.examline_name = '人行道检测线'
        // mjh 修改重置人行道 传给后台新的点之前 把之前的数据清除
        // await this.$http({
        //   methods: 'get',
        //   url: 'delsidewalk/',
        //   params: {
        //     sidewalk_id: this.walk_list[0].id
        //   }
        // })
        let res = await this.$http.post('addsidewalk/', obj)
        if (res.code === 200) {
          // mjh 修改重置人行道 传给后台新的点之前 把之前的数据清除
          await this.$http({
            methods: 'get',
            url: 'delsidewalk/',
            params: {
              sidewalk_id: this.walk_list[0].id
            }
          })
          // 名称改变
          this.peopleLineName = '重置人行道'
          // 列表更新
          this.sidewalklist()
          this.people_dots = []
        }
      } else {
        this.isBelongBefore(x, y)
      }
    },
    // 是否在之前的点集内
    isBelongBefore (x, y) {
      // 如果在之前的点集中，没操作，没在之前的点中，push进去
      // 当前的点x在范围内，y在范围内,如果有，将点填进去，
      let tempArr = []
      this.render_data.filter(data => {
        let str = x >= data.xl && x <= data.xr && y >= data.yt && y <= data.yb
        if (str) {
          tempArr.push(data)
        }
      })
      // 如果没有的话，说明不在那些点中
      if (tempArr.length === 0) {
        // 如果不带之前的点集中
        this.peopleHeightLight(x, y)
      }
    },
    // 人行道高亮，有效数据进people_dots,将相关数据进{xl,xr}
    peopleHeightLight (x, y) {
      // 取出有效数据的最后一个和当前这个画线
      if (this.people_dots.length > 0) {
        let lastdata = this.people_dots[this.people_dots.length - 1]
        lastdata.reverse()
        this.car_line([lastdata, [y, x]], 3)
      }
      // 高亮，push
      this.car_line([y, x], 3, 1)
      this.people_dots.push([x, y])
      // 声明一个变量，将原来的点变成一个范围对象数组
      let obj = {}
      obj.xl = x - 4
      obj.xr = x + 4
      obj.yt = y - 4
      obj.yb = y + 4
      this.render_data.push(obj)
    },
    // 获取人行道列表
    async sidewalklist () {
      let obj = {}
      obj.camera_id = this.detail.id
      let res = await this.$http({
        methods: 'get',
        url: 'sidewalklist/',
        params: {
          camera_id: this.detail.id
        }
      })
      if (res.code === 200) {
        this.walk_list = res.data.walk_list
        this.clear_canvas()
        // 画人行道区域
        if (this.walk_list.length > 0) {
          // 页面禁用
          this.btn_sta.canvas = 'default'
          this.btn_sta.can_div = 'none'
          this.peopleLineName = '重置人行道'
          this.car_line(this.walk_list[0].dots, 1)
          // 画上检测线线
          // 如果偶检测线，直接画上=>点点，两点画线
          // mjh 更改待验证
          if (this.walk_list[0].examline_info !== '') {
            let firstDots = this.walk_list[0].examline_info.dots[1]
            let secondDots = this.walk_list[0].examline_info.dots[0]
            this.car_line([firstDots, secondDots], 2)
            this.car_line(this.walk_list[0].examline_info.dots[0], 3, 1)
            this.car_line(this.walk_list[0].examline_info.dots[1], 3, 1)
          }
        } else {
          this.area_data = {}
          this.people_dots = []
          this.render_data = []
          this.walk_list = []
          this.peopleLineName = '人行道配置'
        }
      }
    },
    // 重置检测线
    addexamwalkline (row) {
      this.x_draw = 4
      this.walk_area = row
      var cv = document.getElementById('canvas')
      cv.onclick = data => {
        this.updateXY()
      }
    },
    // 人行检测线点
    async resetwalk (one, two) {
      let arr = []
      arr.push(two)
      arr.push(one)
      // 高亮
      this.hightLight(arr)
      this.last_arr.push(arr)
      if (this.last_arr.length === 2) {
        this.walk_area.name = '检测线'
        this.walk_area.sidewalk_id = this.walk_area.id
        this.walk_area.dots = JSON.stringify(this.last_arr)
        let res = await this.$http.post('addwalkexamline/', this.walk_area)
        if (res.code === 200) {
          // 将数据更新
          this.sidewalklist()
          this.last_arr = []
        }
      }
    },
    // 删除人行道
    async del_line (row) {
      let res = await this.$http({
        methods: 'get',
        url: 'delsidewalk/',
        params: {
          sidewalk_id: row.id
        }
      })
      if (res.code === 200) {
        this.sidewalklist()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/phaseImg.styl'
@import '../../assets/css/config.styl'
.box1 {
    height: 200px;
    background-color: aqua;
  }
.box2 {
    transition: 0.9 ease;
    // position: sticky;
    z-index: 9;
    top: -20px;
}
.box3 {
    height: 1920px;
    background-color: pink;
}
.b_org
  background #FF6600 !important
  border-color #FF6600 !important
  color #FFF
.header .el-button:focus, .header .el-button:hover
  background #FF6600 !important
  border-color #FF6600 !important
  color #FFF
.car_lineconfig .el-button-text
  color #FF6600 !important
.b_img
  position absolute
  width 58px
  height 34px
  z-inde 999
  line-height 28px
  text-align center
  font-size 12px
  color white
  padding-left 2px
  background url('../../assets/images/little_right.png')
.b_imgr
  position absolute
  width 58px
  height 34px
  z-inde 999
  line-height 28px
  text-align center
  font-size 12px
  color white
  padding-left 2px
  background url('../../assets/images/little_left.png')
.errx
  position absolute
  background red
  z-index 999
  // background:red;
  background url('../../assets/images/little_x.png')
  height 19px
  width 19px
  color green
.line
  position absolute
  color red
.tip_msg
  float left
.header
  display block
  padding 15px 0
.little_tit
  width 64px
  height 16px
  font-size 16px
  font-weight 500
  color rgba(0, 0, 0, 1)
  margin-right 34px
  border-left 4px solid #FF6600
  padding-left 10px
.car_lineconfig
  margin-top 19px
.device
  margin-bottom:20px
.info_device
  font-size 16px
  span
    padding 0 17px
    i
      height: 5px;
      width: 5px;
      font-size: 12px;
    .green
      color: #00d142;
      margin: 0 5px;
    .dang
      color: #d0031c;
      margin-right: 5px;
// 视频区域
.car_video
  position: sticky;
  transition: 0.9 ease;
  z-index: 9;
  top: 80px;
  height 540px
  width 960px
  margin 0
  // background: #FFF;
  margin 0 auto
// 真正的视频
.realvideo
  position absolute
  float left
  height 540px
  width 960px
  // background-color: pink;
#canvas
  height 540px
  width 960px
  text-align center
  // line-height: 500px;
  border 1px solid #E5E5E5
  margin 0 auto
  // background-color: skyblue;
// 遮罩层
.line
  z-index 3
  position absolute
  opacity 1
  // background-color: white;
  // color: red;
  // margin:0 auto
.line_card
  margin-top 31px
.add_btn
  text-align center
  align center
  margin-top 20px
.definite_btn
  background-color #FF6300
  color white
.plan_content, .el-row
  margin-bottom 20px
  &:last-child
    margin-bottom 0
.grid-content
  min-height 36px
.add_plan
  border-bottom 1px solid #E5E5E5
  padding 20px 0 20px 0
  font-size 14px
  line-height 22px
</style>

<style>
.sta_fontcenter {
  text-align: center !important;
}
.car_edit .el-select {
  width: 100%;
}
</style>
