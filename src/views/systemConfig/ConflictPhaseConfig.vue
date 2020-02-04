<template>
  <div>
    <div class="tit">
      <em class="table-title">冲突相位设置</em>
    </div>
    <el-table
      :data="fixedplan_list"
      :header-cell-style="{ background: '#FAFAFA' }"
      style="width: 100%"
      class="device-info"
      type="index"
      :index="indexMethod"
    >
      <el-table-column label="相位序号" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.phase_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="方向" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.phase_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.type == 1 ? '机动相位' : '行人相位' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="冲突相位"
        align="center"
        width="250px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <span>{{ scope.row.fight_show }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.fight_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="phase_edit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!-- 相位编辑弹出框 -->
          <el-dialog
            class="add_stage"
            align="left"
            title="编辑"
            width="500px"
            :close-on-click-modal="false"
            :visible.sync="dialogFormVisible"
          >
            <el-row class="add_plan">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  相位序号：{{ add_list.plan_num }}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  方向：{{ add_list.plan_name }}
                </div>
              </el-col>
            </el-row>
            <el-row class="plan_content">
              <el-col :span="24">
                <!-- 标题 -->
                <el-col :span="24" class="set_camera">相位冲突</el-col>
                <!-- 相位冲突 -->
                <div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-checkbox-group
                          v-model="checkList"
                          class="set_cam_hei"
                        >
                          <el-checkbox
                            v-for="city in xiangwei"
                            :label="city"
                            :checked="city.checked"
                            :key="city.phase_name"
                            :disabled="city.judge"
                            :ref="city.id"
                            @change="chosen(city)"
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
            </el-row>
            <div slot="footer" class="dialog-footer add_btn">
              <el-button @click="cancel_add()">取 消</el-button>
              <el-button
                class="definite_btn"
                @click="addfightphase(add_list.fixedplan_id)"
                >保存</el-button
              >
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="msgVisible" width="30%" :close-on-click-modal="false">
      <span
        >{{ msg_txt }}相位与{{
          current_txt
        }}相位为冲突相位，此操作将删除该关联相位配置信息</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="msg_cancel">取 消</el-button>
        <el-button type="primary" @click="msg_prompt">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      t: '',
      // 是否禁用
      checklabel: true,
      // 默认显示的列表
      fixedplan_list: [
        {
          phase_num: '1',
          phase_name: '2',
          type: '4',
          create_at: '7',
          update_at: '8'
        }
      ],
      // 新增方案
      plan_data: {
        plan_num: '',
        plan_name: '',
        type: '1'
      },
      schemeFormVisible: false,
      schemeLabelWidth: '120px',
      // 编辑按钮
      editFormVisible: true,
      // 编辑数据
      edit_data: {},
      // 相位编辑
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
      // 页面暂存的默认选中值
      old_list: [],
      // 编辑冲突相位提示框
      msgVisible: false,
      // 复选框选中的相位
      msg_txt: '',
      // 当前操作相位
      current_txt: '',
      con_sta: ' ',
      // 红绿灯
      add_list: {
        green_time: 1,
        yellow_time: 1,
        red_time: 1
      },
      formLabelWidth: '120px',
      // 选中项
      checkList: [],
      // 禁用项
      cityOptions: []
    }
  },
  computed: {
    xiangwei: function () {
      return this.cityOptions
    }
  },
  mounted: function () {
    this.initial()
    this.getphaselist()
  },
  methods: {
    // 初始化
    async initial () {
      const res = await this.$http.get('phaselist/')
      const { code, data } = res
      if (code === 200) {
        const { phase_list: phaseList } = data
        this.fixedplan_list = phaseList
        for (let i = 0; i < phaseList.length; i++) {
          // 重新放一个变量
          let conflict = ''
          if (phaseList[i].fightinfo.length > 0) {
            for (let j = 0; j < phaseList[i].fightinfo.length; j++) {
              conflict +=
                phaseList[i].fightinfo[j].phase_num +
                phaseList[i].fightinfo[j].phase_name
              conflict = conflict + ' , '
            }
            conflict = conflict.substr(0, conflict.length - 2)
          } else {
            conflict = '未设置'
          }
          this.fixedplan_list[i].fight_show = conflict
        }
      }
    },
    // 序列号
    indexMethod (index) {
      return index * 2
    },
    // 新增方案
    async addfixedplan () {
      this.schemeFormVisible = false
      let res = await this.$http.post('addfixedplan/', this.plan_data)
      const { code } = res
      if (code === 200) {
        this.initial()
      }
    },
    // 编辑
    scheme_edit (index, row) {
      this.editFormVisible = true
      this.edit_data = row
      this.edit_data.fixedplan_id = row.id
      //  this.add_list.phase_ids=[]
    },
    // 编辑的确认按钮
    async editfixedplan () {
      let res = await this.$http.post('editfixedplan/', this.edit_data)
      const { code } = res
      if (code === 200) {
        this.editFormVisible = false
        this.initial()
      }
    },
    // 打开编辑弹框
    async phase_edit (index, row) {
      // 获取列表数据
      this.add_list.fixedplan_id = row.id
      this.add_list.plan_name = row.phase_name
      this.add_list.plan_num = row.phase_num
      this.dialogFormVisible = true
      // 传值
      this.show_sta(index, row)
    },
    // 弹框内容禁用，选中
    show_sta (index, row) {
      for (let i = 0; i < this.cityOptions.length; i++) {
        this.cityOptions[i].judge = false
        this.cityOptions[i].checked = false
        // 如果id相等，则禁用
        if (row.id === this.cityOptions[i].id) {
          this.cityOptions[i].judge = true
          // 设置选中
          // 将默认的选中
          this.defalt_chose(row, row.fightinfo)
        }
      }
    },
    // 选中操作
    defalt_chose (row, fightinfo) {
      this.checkList = []
      let idArr = []
      for (let i = 0; i < fightinfo.length; i++) {
        idArr.push(fightinfo[i].id)
      }
      for (let i = 0; i < idArr.length; i++) {
        for (let j = 0; j < this.cityOptions.length; j++) {
          if (idArr[i] === this.cityOptions[j].id) {
            this.checkList.push(this.cityOptions[j])
          }
        }
      }
      // 将选中的进行暂存
      this.old_list = this.checkList
    },
    // 提示框取消与确认按钮
    msg_cancel () {
      this.msgVisible = false
      // 将提示的选中
      this.checkList = this.old_list
    },
    // 确定按钮发请求
    msg_prompt (index) {
      this.save_result(this.add_list.fixedplan_id)
      this.msgVisible = false
      this.dialogFormVisible = false
    },
    // 获取编辑的冲突相位
    getphaselist () {
      this.$http({
        method: 'get',
        url: 'phaselist/'
      }).then(res => {
        if (res.code === 200) {
          const { phase_list: phaseList } = res.data
          this.cityOptions = phaseList
          // this.checkList.push(this.cityOptions[2])
        }
      })
    },
    // 整理ids的方法
    get_listcont (ids) {
      let idArray = []
      for (let i = 0; i < ids.length; i++) {
        idArray.push(ids[i].id)
      }
      return idArray
    },
    // 将要判断的两个的id选出来  this.checkList,this.old_list
    id_process (idCon) {
      let arr = []
      for (let i = 0; i < idCon.length; i++) {
        arr.push(idCon[i].phase_num)
      }
      return arr
    },
    // 判断现有选中的对否有原来的值
    if_container () {
      let old = this.id_process(this.old_list)
      let current = this.id_process(this.checkList)
      // 将两个数组的相位号不同的筛选出来
      let temp = old.filter(function (v) {
        return current.indexOf(v) !== -1 // 利用filter方法来遍历是否有相同的元素
      })
      let result = old.concat(temp).filter(function (v) {
        return old.indexOf(v) === -1 || temp.indexOf(v) === -1
      })
      if (result.length > 0) {
        let res = result.join(',')
        return res
      } else {
        return 0
      }
    },
    // 不保存
    cancel_add () {
      this.dialogFormVisible = false
      this.checkList = this.old_list
    },
    // 相位编辑
    async addfightphase (addfightphase) {
      // 这里要判断现有选中的对否有原来的值
      let idStage = this.if_container()
      // 如果有原来的值
      if (idStage !== 0) {
        this.msg_txt = idStage
        this.current_txt = this.add_list.plan_num
        // 选出默认的选项
        this.msgVisible = true
        this.res_dig = addfightphase
      } else {
        // 如果没有原来的值
        this.save_result(addfightphase)
      }
    },
    // 保存冲突相位
    save_result (addfightphase) {
      // 获取ids
      this.add_list.phase_ids = this.get_listcont(this.checkList)
      // 发送请求
      let data = {}
      let arr = []
      for (let i = 0; i < this.add_list.phase_ids.length; i++) {
        arr.push(this.add_list.phase_ids[i])
      }
      data.fightphase_ids = arr
      data.crossphase_id = parseInt(addfightphase)
      this.$http({
        method: 'post',
        url: 'addfightphase/',
        data: {
          fightphase_ids: JSON.stringify(arr),
          crossphase_id: parseInt(addfightphase)
        }
      }).then(res => {
        if (res.code === 200) {
          this.dialogFormVisible = false
          this.initial()
        }
      })
      this.checkList = []
    },
    // 复选框情况
    handlecheckListChange (value) {
      let checkedCount = value.length
      this.checklabel = checkedCount > 0 && checkedCount < this.xiangwei.length
    },
    // 选中的值
    chosen (data) {
      data.checked = !data.checked
      // 找出对应状态，改变
      if (data.fightinfo.length > 0) {
        // 找对应项目
        let dataArr = []
        // push进这个数组
        for (let i = 0; i < this.fixedplan_list.length; i++) {
          if (this.fixedplan_list[i].judge === false) {
            dataArr.push(this.fixedplan_list[i].id)
          }
        }
        for (let i = 0; i < data.fightinfo.length; i++) {
          dataArr.push(data.fightinfo[i].id)
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/config.styl'
* {
  font-size: 14px;
}

.add_btn {
  text-align: center;
  align: center;
  margin-top: 20px;
}

.definite_btn {
  background-color: #FF6600;
  color: white;
}

.add_plan {
  border-bottom: 1px solid #E5E5E5;
  padding: 20px 0 20px 0;
  font-size: 14px;
  line-height: 22px;
}

.tra_img {
  width: 370px;
  background-color: green;
  height: 315px;
}

.set_time {
  height: 42px;
  line-height: 42px;
}

.set_camera {
  height: 48px;
  line-height: 48px;
}

// 相位0102行高
.set_cam_hei {
  display: inherit;
  width: 450px;
  line-height: 32px;
}

label {
  width: 78px;
}

.che_light {
  margin-bottom: 15px;
}

.scheme_light {
  margin-bottom: 30px;
}
.add_border {
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: 10px;
}
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
