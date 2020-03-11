<template>
  <div class="fixedcontrol">
    <div class="tit" style="display:flex">
      <em class="table-title" style="display:inline-block; flex:1">
        固定方案管理
      </em>
      <span
        style="cursor:pointer;color: #409EFF;"
        @click="add_plan()"
        v-if="isShow"
      >
        新增方案
      </span>
    </div>
    <el-card shadow="always">
      <el-table
        :data="
          fixedplan_list.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )
        "
        :header-cell-style="{ background: '#FAFAFA' }"
        style="width: 100%"
        class="device-info"
        type="index"
        :index="indexMethod"
      >
        <!-- ascending, descending -->
        <el-table-column
          label="方案编号"
          prop="plan_num"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="方案名称"
          prop="plan_name"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="阶段数"
          prop="part_count"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="总周期时长(秒)"
          prop="time"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          align="center"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
          <span>{{ scope.row.status==1?"使用中":"未使用"}}</span>
          </template>-->
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="create_at"
          align="center"
          show-overflow-tooltip
          v-if="isShow"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="update_at"
          align="center"
          show-overflow-tooltip
          v-if="isShow"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="230px">
          <template slot-scope="scope">
            <!-- 编辑按钮开始 -->
            <el-button
              type="text"
              @click="scheme_edit(scope.$index, scope.row)"
              v-if="isShow"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="handleDelete(scope.$index, scope.row, fixedplan_list)"
              v-if="isShow"
              >删除</el-button
            >
            <!-- 查看按钮 -->
            <el-button type="text" @click="scheme_view(scope.$index, scope.row)"
              >查看</el-button
            >
            <!-- 2019-10-14新增阶段禁用 -->
            <!-- <el-button type="text" @click="handleAdd(scope.$index, scope.row)"  v-if="isShow">新增阶段</el-button> -->
            <!-- 新增阶段弹出框 -->
            <el-dialog
              class="add_stage"
              align="left"
              title="新增阶段"
              width="900px"
              :close-on-click-modal="false"
              :visible.sync="dialogFormVisible"
            >
              <el-row class="add_plan">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    方案号：{{ add_list.plan_num }}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    方案名称：{{ add_list.plan_name }}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    阶段号：{{ add_list.part_num }}
                  </div>
                </el-col>
              </el-row>
              <div class="set_time">时间设置</div>
              <el-row class="plan_content">
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-col :span="24">
                      <div class="grid-content bg-purple che_light">
                        阶段绿灯时间 &nbsp;
                        <el-input-number
                          size="small"
                          v-model="add_list.green_time"
                          controls-position="right"
                          :min="0"
                          :max="255"
                        ></el-input-number
                        >&nbsp;秒
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="grid-content bg-purple che_light">
                        阶段黄灯时间 &nbsp;
                        <el-input-number
                          size="small"
                          v-model="add_list.yellow_time"
                          controls-position="right"
                          :min="0"
                          :max="255"
                        ></el-input-number
                        >&nbsp;秒
                      </div>
                    </el-col>
                    <el-col :span="24" class="add_border">
                      <div class="grid-content bg-purple che_light">
                        阶段红灯时间 &nbsp;
                        <el-input-number
                          size="small"
                          v-model="add_list.red_time"
                          controls-position="right"
                          :min="0"
                          :max="255"
                        ></el-input-number
                        >&nbsp;秒
                      </div>
                    </el-col>
                  </div>
                  <!-- 标题 -->
                  <el-col :span="24" class="set_camera">相位设置</el-col>
                  <!-- 相位设置 -->
                  <div>
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple">
                          <el-checkbox-group
                            v-model="checkList"
                            @change="handlecheckListChange"
                            class="set_cam_hei"
                          >
                            <el-checkbox
                              v-for="(city, t) in direct"
                              :label="city"
                              :checked="city.checked"
                              :key="t"
                              :disabled="city.judge"
                              :ref="city.id"
                              @change="chosen(city, t)"
                              >相位{{ city.phase_num }}-{{
                                city.phase_name
                              }}</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <!-- 中间留白 -->
                <el-col :span="1">&nbsp;</el-col>
                <!-- 右侧图 -->
                <el-col :span="11">
                  <div class="grid-content bg-purple-light">
                    <!-- 图例区域开始 -->
                    <div
                      style="margin: 30px auto; text-align:right"
                      class="diagram"
                    >
                      <div
                        style="text-align: center;  width:370px; display: inline-block;"
                      >
                        <div class="img-style">
                          <div class="div_n">
                            <div class="phase">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[2].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[1].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[0].phase_num
                              }}</span>
                            </div>
                            <div class="phase_img">
                              <span class="phase_img_r">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/right_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(2) != -1 }"
                                  src="../../assets/images/svg/cross/right_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_c">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/straight_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(1) != -1 }"
                                  src="../../assets/images/svg/cross/straight_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_l">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/left_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(0) != -1 }"
                                  src="../../assets/images/svg/cross/left_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                            <div class="foot_way">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[12].phase_num
                              }}</span>
                              <span class="foot_way_img">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/footway_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{
                                    active: temp_arr.indexOf(12) != -1
                                  }"
                                  src="../../assets/images/svg/cross/footway_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                          <div class="div_w">
                            <div class="phase">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[5].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[4].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[3].phase_num
                              }}</span>
                            </div>
                            <div class="phase_img">
                              <span class="phase_img_r">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/right_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(5) != -1 }"
                                  src="../../assets/images/svg/cross/right_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_c">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/straight_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(4) != -1 }"
                                  src="../../assets/images/svg/cross/straight_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_l">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/left_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(3) != -1 }"
                                  src="../../assets/images/svg/cross/left_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                            <div class="foot_way">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[13].phase_num
                              }}</span>
                              <span class="foot_way_img">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/footway_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{
                                    active: temp_arr.indexOf(13) != -1
                                  }"
                                  src="../../assets/images/svg/cross/footway_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                          <div class="div_s">
                            <div class="phase">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[8].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[7].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[6].phase_num
                              }}</span>
                            </div>
                            <div class="phase_img">
                              <span class="phase_img_r">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/right_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(8) != -1 }"
                                  src="../../assets/images/svg/cross/right_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_c">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/straight_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(7) != -1 }"
                                  src="../../assets/images/svg/cross/straight_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_l">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/left_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(6) != -1 }"
                                  src="../../assets/images/svg/cross/left_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                            <div class="foot_way">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[14].phase_num
                              }}</span>
                              <span class="foot_way_img">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/footway_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{
                                    active: temp_arr.indexOf(14) != -1
                                  }"
                                  src="../../assets/images/svg/cross/footway_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                          <div class="div_e">
                            <div class="phase">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[11].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[10].phase_num
                              }}</span>
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[9].phase_num
                              }}</span>
                            </div>
                            <div class="phase_img">
                              <span class="phase_img_r">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/right_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{
                                    active: temp_arr.indexOf(11) != -1
                                  }"
                                  src="../../assets/images/svg/cross/right_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_c">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/straight_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{
                                    active: temp_arr.indexOf(10) != -1
                                  }"
                                  src="../../assets/images/svg/cross/straight_1.svg"
                                  alt=""
                                />
                              </span>
                              <span class="phase_img_l">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/left_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{ active: temp_arr.indexOf(9) != -1 }"
                                  src="../../assets/images/svg/cross/left_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                            <div class="foot_way">
                              <span>{{
                                phaseTraffic.length === 0
                                  ? ""
                                  : phaseTraffic[15].phase_num
                              }}</span>
                              <span class="foot_way_img">
                                <img
                                  class="change_img"
                                  src="../../assets/images/svg/cross/footway_2.svg"
                                  alt=""
                                />
                                <img
                                  class="change_img"
                                  :class="{
                                    active: temp_arr.indexOf(15) != -1
                                  }"
                                  src="../../assets/images/svg/cross/footway_1.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 图例区域结束 -->
                  </div>
                </el-col>
              </el-row>
              <div slot="footer" class="dialog-footer add_btn">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button class="definite_btn" @click="addfixedpart"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-row></el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              prev-text="上一页"
              next-text="下一页"
              :page-size="pagesize"
              :current-page="currentPage"
              layout=" prev, pager, next, jumper, total"
              :total="fixedplan_list.length"
            ></el-pagination>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true,
      temp_arr: [],
      // 图例的数据
      phaseTraffic: [],
      cameraData: [],
      index: '',
      // 图例的数据结束
      t: '',
      // 分页
      currentPage: 1, // 初始页
      pagesize: 20, //    每页的数据
      // 是否禁用

      checklabel: true,
      // 默认显示的列表
      fixedplan_list: [
        {
          plan_num: '1',
          plan_name: '2',
          part_count: '3',
          time: '4',
          status: '6',
          create_at: '7',
          update_at: '8'
        }
      ],
      // 编辑按钮
      editFormVisible: false,
      // 编辑数据
      edit_data: {
        fixedplan_id: '',
        plan_name: '',
        plan_num: ''
      },
      // 新增阶段
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 红绿灯
      add_list: {
        green_time: 0,
        yellow_time: 0,
        red_time: 0
      },
      formLabelWidth: '120px',
      // 复选框渲染
      // 选中项
      checkList: [],
      // 禁用项
      cityOptions: []
    }
  },
  computed: {
    direct: function () {
      return this.cityOptions
    }
  },
  mounted: function () {
    this.initial()
  },
  methods: {
    // 初始化
    async initial () {
      const res = await this.$http.get('/fixedplanlist/')
      const { code, data } = res
      data.fixedplan_list.map(v => {
        v.status === 1 ? (v.status = '使用中') : (v.status = '未使用')
      })
      if (code === 200) {
        // data.fixedplan_list.filter((data) => {
        //   data.plan_num = '方案' + data.plan_num
        // })
        this.fixedplan_list = data.fixedplan_list
        this.fixedplan_list.filter((data) => {
          data.plan_num = '方案' + data.plan_num
        // })
        })
        this.$cookies.set('row', '')
        this.$cookies.set('index', '')
      }
    },
    // 序列号
    indexMethod (index) {
      return index * 2
    },
    // 分页
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 查看
    scheme_view (index, row) {
      this.$router.push({
        name: 'statusdetail',
        params: {
          index: index,
          row: row
        }
      })
    },
    // 打开新增方案
    add_plan () {
      if (this.fixedplan_list.length === 16) {
        return this.$message.error('方案数量已达上限，系统最多可配置16个方案！')
      }
      localStorage.setItem('row', -1)
      localStorage.setItem('index', -1)
      let sortArr = []
      sortArr = this.fixedplan_list.sort((a, b) => {
        return a.plan_num - b.plan_num
      })
      let tempArr = []
      sortArr.filter((row, index) => {
        if (row.plan_num !== index + 1) {
          tempArr.push(index + 1)
        }
      })
      // localStorage.setItem(
      //   'length',
      //   tempArr.length === 0 ? this.fixedplan_list.length + 1 : tempArr[0]
      // )

      let sendData = {plan_num: tempArr.length === 0 ? this.fixedplan_list.length + 1 : tempArr[0]}
      localStorage.setItem('row', JSON.stringify(sendData))
      this.$router.push({
        name: 'fixededit'
      })
    },
    // 编辑
    scheme_edit (index, row) {
      if (row.status === '使用中') {
        return this.$message.error('当前方案正在执行，无法编辑')
      }
      if (row.type === 2 || row.dynamic_status === 1) {
        return this.$message.error('此方案供策略使用，请取消关联后修改！')
      }
      this.$http({
        method: 'get',
        url: `fixedplaninfo/${row.id}/`
      }).then(res => {
        let { code, data } = res
        if (code === 200) {
          localStorage.setItem('row', JSON.stringify(data))
          localStorage.setItem('index', JSON.stringify(index))
          this.$router.push({
            name: 'fixededit'
          })
        }
      })
    },
    // 编辑的确认按钮
    // async editfixedplan () {
    //   let res = await this.$http.post('editfixedplan/', this.edit_data)
    //   const { code } = res
    //   if (code === 200) {
    //     this.editFormVisible = false
    //     this.initial()
    //   }
    // },
    // 删除
    handleDelete (index, row, rows) {
      if (row.status === '使用中') {
        return this.$message.error('当前方案正在执行，无法删除')
      }
      if (row.type === 2 || row.dynamic_status === 1) {
        return this.$message.error('此方案供策略使用，请取消关联后修改！')
      }
      this.$confirm('是否要删除该方案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http({
            method: 'delete',
            url: `delfixedplan/${row.id}/`
          }).then(res => {
            if (res.code === 200) {
              // rows.splice(index, 1)
              this.initial()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 新增阶段
    async handleAdd (index, row) {
      // 上面的数据
      this.add_list.green_time = 0
      this.add_list.red_time = 0
      this.add_list.yellow_time = 0
      this.add_list.fixedplan_id = row.id
      this.add_list.plan_name = row.plan_name
      this.add_list.plan_num = row.plan_num
      this.add_list.part_num = row.part_count + 1
      this.dialogFormVisible = true
      // 获取相位列表
      this.getphaselist()
      // 清空选中数组
      this.temp_arr = []
    },
    // 获取相位列表
    getphaselist () {
      this.$http({
        method: 'get',
        url: 'phaselist/'
      }).then(res => {
        if (res.code === 200) {
          let { phase_list: phaseList } = res.data
          this.cityOptions = phaseList
          for (let i = 0; i < this.cityOptions.length; i++) {
            this.cityOptions[i].judge = false
            this.cityOptions[i].checked = false
          }

          // 图例相关设置开始
          // let phaseArr = []
          this.phaseTraffic = phaseList
          // phaseList.map(function (v, index) {
          //   if (JSON.stringify(v.light_info) === '{}') {
          //     v.light_info.light_num = '未关联'
          //   }
          //   phaseArr.push(v.light_info.light_num)
          // })
          // let phaseArrDom = this.getPhaseList().phaseArr
          // for (let i = 0; i < phaseArr.length; i++) {
          //   if (phaseArr[i] === '未关联') {
          //     phaseArrDom[i].lastChild.classList.remove('active')
          //   } else {
          //     phaseArrDom[i].lastChild.classList.add('active')
          //   }
          // }
        }
      })
    },
    // 图例方法
    getPhaseList () {
      let phaseList = document.querySelectorAll('.phase_img')
      let footWayList = document.querySelectorAll('.foot_way_img')
      let phaseArr = []
      let obj = {}
      Object.values(phaseList).map(v => {
        Object.values(v.children)
          .reverse()
          .map(v => {
            phaseArr.push(v)
          })
      })
      Object.values(footWayList).map(v => {
        phaseArr.push(v)
      })
      obj.phaseArr = phaseArr
      return obj
    },
    // 整理ids的方法
    get_listcont (ids) {
      let idArray = []
      for (let i = 0; i < ids.length; i++) {
        idArray.push(ids[i].id)
      }
      return idArray
    },
    // 新增阶段
    async addfixedpart () {
      // 获取ids
      this.add_list.phase_ids = JSON.stringify(
        this.get_listcont(this.checkList)
      )
      this.checklist = []
      // 发送请求
      let res = await this.$http.post('addfixedpart/', this.add_list)
      if (res.code === 200) {
        this.dialogFormVisible = false
        this.initial()
      }
    },
    // 复选框情况
    handlecheckListChange (value) {
      let checkedCount = value.length
      this.checklabel = checkedCount > 0 && checkedCount < this.direct.length
    },
    // 选中的值
    chosen (data, t) {
      data.checked = !data.checked
      // 找出对应状态，改变
      let dataArr = []
      if (data.fightinfo.length > 0) {
        // 找对应项目
        for (let i = 0; i < data.fightinfo.length; i++) {
          dataArr.push(data.fightinfo[i].id)
        }
      }
      // 通过id找到对应的那一项
      this.revise_pro(dataArr, data.checked, t)
    },
    // 找到对应项
    revise_pro (resId, checked, t) {
      if (checked === false) {
        var index = this.temp_arr.indexOf(t)
        if (index > -1) {
          this.temp_arr.splice(index, 1)
        }
      } else {
        this.temp_arr.push(t)
      }
      if (checked === false) {
        for (let j = 0; j < resId.length; j++) {
          // 为了将每个元素取出
          if (this.cityOptions === true) {
          }
          // 将这id找出对应项
          for (let i = 0; i < this.cityOptions.length; i++) {
            if (resId[j] === this.cityOptions[i].id) {
              // 让id是的单独这一项禁用
              if (this.cityOptions[i].judge === false) {
                this.cityOptions[i].judge = true
              } else {
                this.cityOptions[i].judge = false
              }
            }
          }
        }
        // 如果是选中，则将对应的禁用
      } else {
        for (let j = 0; j < resId.length; j++) {
          // 为了将每个元素取出
          if (this.cityOptions === true) {
          }
          // 将这id找出对应项
          for (let i = 0; i < this.cityOptions.length; i++) {
            if (resId[j] === this.cityOptions[i].id) {
              // 让id是的单独这一项禁用
              if (this.cityOptions[i].judge === false) {
                this.cityOptions[i].judge = true
              } else {
                this.cityOptions[i].judge = true
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/phaseImg.styl'
@import '../../assets/css/config.styl'
*
  font-size 14px
.add_btn
  text-align center
  align center
  margin-top 20px
.definite_btn
  background-color #FF6600
  color white
.plan_content
.el-row
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
.set_time
  height 42px
  line-height 42px
.set_camera
  height 48px
  line-height 48px
// 相位0102行高
.set_cam_hei
  display inherit
  width 450px
  line-height 32px
label
  width 78px
.che_light
  margin-bottom 15px
.scheme_light
  margin-bottom 30px
.add_border
  border-bottom 1px solid #E5E5E5
  padding-bottom 10px
</style>

<style>
/* 难以重置的样式 */
.el-dialog__header {
  font-size: 14px;
  background-color: #f5f5f5;
}
.el-dialog__title {
  font-size: 14px;
  font-weight: 700;
}
.el-dialog__body {
  padding: 0px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.fr {
  float: right;
  margin-right: 10px;
}
</style>
<style lang="stylus">
.fixedcontrol
  .handelwidth
    .el-input-number
      text-align left
      width 100%
      .el-input__inner
        text-align left
</style>
