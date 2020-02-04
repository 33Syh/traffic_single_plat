<template>
  <div class="main-layout tacticscontrol_contain">
    <el-button
      v-if="!isShow"
      size="small"
      type="primary"
      style="float: right; position: relative; top: -5px;"
      @click="before"
      >返回</el-button
    >
    <div class="tit">
      <em class="table-title">策略管理</em>
    </div>
    <div v-if="!isShow" style="height: 1px; background-color: black;"></div>
    <el-table
      :data="tacticsplan_list"
      :header-cell-style="{ background: '#FAFAFA' }"
      style="width: 100%"
      class="device-info"
      type="index"
      v-if="isShow"
    >
      <el-table-column label="策略号" align="center">
        <template slot-scope="scope">
          <span>{{ tacticsplan_list != [] ? scope.row.tactics_num : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="策略名称" align="center">
        <template slot-scope="scope">
          <span>{{
            tacticsplan_list != [] ? scope.row.tactics_name : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="策略控制模式"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.control_model === 1
              ? "固定方案切换"
              : scope.row.control_model === 2
              ? "动态配时方案"
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{
            tacticsplan_list === []
              ? ""
              : scope.row.status === 1
              ? "使用中"
              : "未使用"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{
            tacticsplan_list != [] ? scope.row.update_at : "---"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            v-show="scope.row.tactics_num !== '03'"
            @click="phase_edit(scope.$index, scope.row)"
            >配置</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >公式说明</el-button
          >
          <!-- 相位编辑弹出框 -->
          <el-dialog
            class="add_stage"
            align="left"
            title="策略配置"
            width="524px"
            :close-on-click-modal="false"
            :visible.sync="dialogFormVisible"
          >
            策略控制模式:
            <!-- 这里是否清空待定 -->
            <!-- @change="fixedplan_ids = []" -->
            <el-radio-group
              class="model_strategy"
              v-model="editList.control_model"
            >
              <el-radio v-if="editList.type === 1" :label="1"
                >固定方案切换</el-radio
              >
              <em
                v-if="editList.type === 1"
                title="需在固定方案中设计相同阶段的固定方案"
                >?</em
              >
              <el-radio :label="2">动态配时方案</el-radio>
              <em title="根据选择的标准方案动态调整方案中各阶段配时">?</em>
            </el-radio-group>
            <div v-if="editList.control_model === 1">
              <p style="margin-top:30px">策略方案选择:</p>
              <el-checkbox-group
                :min="min"
                class="scheme"
                v-model="fixedplan_ids"
              >
                <el-checkbox
                  :title="row.plan_name"
                  style="margin-top:20px"
                  v-for="(row, index) in editList.fixedplan_list"
                  :key="`tacedit` + index"
                  :label="row.id"
                >
                  {{ row.plan_name }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div v-if="editList.control_model === 2">
              <span style="margin-top:30px;display: inline-block;"
                >策略方案选择:</span
              >
              <el-select
                style="margin-left:20px"
                v-model="cehsidata[0]"
                placeholder="请选择"
              >
                <el-option
                  show-overflow-tooltip
                  v-for="(item, index) in editList.fixedplan_list"
                  :key="index + `+editoption`"
                  :label="item.plan_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div
              slot="footer"
              style="text-align:center"
              class="dialog-footer add_btn"
            >
              <el-button @click="msg_cancel()">取 消</el-button>
              <el-button
                class="definite_btn"
                style="background:#FF6600;color:white"
                @click="addfightphase()"
                >确定</el-button
              >
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="!isShow" style="margin-top: 30px; padding: 20px 50px">
      <pdf-component :tactics_num="tactics_num"></pdf-component>
    </el-row>
  </div>
</template>

<script>
import pdfComponent from '../components/tacticscontrol/pdfComponent'
export default {
  components: {
    pdfComponent
  },
  data () {
    return {
      min: 1,
      radio: 3,
      cehsidata: [],
      fixedplan_ids: [],
      // 编辑
      dialogFormVisible: false,
      // 选中项
      tacticsplan_id: '',
      tacticsplan_list: [],
      centerDialogVisible: false,
      isShow: true,
      tactics_num: '',
      editList: {}
    }
  },
  computed: {},
  created () {
    this.getTacticsList()
  },
  mounted () {},
  methods: {
    async getTacticsList () {
      await this.$http.get('tacticsplanlist/').then(res => {
        if (res.code === 200) {
          this.tacticsplan_list = res.data.tacticsplan_list
          for (let i = 0; i < this.tacticsplan_list.length; i++) {
            for (
              let j = 0;
              j < this.tacticsplan_list[i].fixedplan_list.length;
              j++
            ) {
              this.tacticsplan_list[i].fixedplan_list[j].index = parseInt(
                this.tacticsplan_list[i].fixedplan_list[j].plan_name.substring(
                  2
                )
              )
            }
            this.tacticsplan_list[i].fixedplan_list.sort(function (a, b) {
              return a.index - b.index
            })
          }
        }
      })
    },
    // 配置
    phase_edit (index, row) {
      this.tacticsplan_id = row.id
      this.editList = JSON.parse(JSON.stringify(row))
      if (row.control_model === 1) {
        // 设置左边复选
        this.fixedplan_ids = []
        row.fixedplan_list.map(data => {
          if (data.status === 1) {
            this.fixedplan_ids.push(data.id)
          }
        })
        // this.fixedplan_ids = row为1的
        // 设置单选
        this.cehsidata[0] = row.fixedplan_list[0].id
      } else if (row.control_model === 2) {
        // 设置复选
        this.fixedplan_ids = []
        this.fixedplan_ids.push(row.fixedplan_list[0].id)
        // 设置单选
        this.fixedplan_ids[0] = row.fixedplan_list[0].id
        row.fixedplan_list.map(v => {
          if (v.status === 1) {
            this.cehsidata[0] = v.id
          }
        })
      }
      this.editList.ids = []
      this.$forceUpdate()
      this.dialogFormVisible = true
    },
    // 保存
    addfightphase () {
      let sendData = {}
      sendData.tacticsplan_id = this.tacticsplan_id
      if (this.editList.control_model === 2) {
        sendData.fixedplan_ids = JSON.stringify(this.cehsidata)
      } else {
        sendData.fixedplan_ids = JSON.stringify(this.fixedplan_ids)
      }
      sendData.type = this.editList.type
      sendData.control_model = this.editList.control_model
      this.$http({
        method: 'put',
        url: `/edittacticsplan/${sendData.tacticsplan_id}/`,
        data: sendData
      }).then(res => {
        if (res.code === 200) {
          this.dialogFormVisible = false
          this.fixedplan_ids = []
          this.sendData = {}
          this.getTacticsList()
        }
      })
    },
    // 取消
    msg_cancel () {
      this.dialogFormVisible = false
      // 将提示的选中
      this.fixedplan_ids = []
    },
    // 公式说明
    handleEdit (index, data) {
      if (data && data.tactics_num) {
        this.tactics_num = data.tactics_num
      }
      this.centerDialogVisible = true
      this.isShow = !this.isShow
    },
    before () {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="stylus">
.tacticscontrol_contain
  .el-radio
    margin 0 2px 0 20px
    .el-radio__inner
      display block !important
  .el-radio__input.is-checked .el-radio__inner
    border-color #FF6600
    background #FF6600
  .el-dialog__header
    background #F5F5F5
  .el-radio__input.is-checked+.el-radio__label
    color #333333
  .el-dialog__body
    padding 20px 30px
  .el-checkbox
    text-align left
    margin-right 0px
    width 120px
  .scheme
    .el-checkbox:nth-child(4n)
      width 0
      display inline-block
  .el-checkbox__input.is-checked+.el-checkbox__label
    color #606266
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
    background-color #FF6600
    border-color #FF6600
</style>
<style scoped lang="stylus">
.set_cam_hei
  display inherit
  width 450px
  line-height 32px
.model_strategy
  em
    margin-left 5px
    display inline-block
    border 1px solid #e1dfdf
    border-radius 50%
    height 12px
    line-height 12px
    width 12px
    font-size 12px
    text-align center
    cursor pointer
h3
  font-size 22px
  margin 20px 0
.img
  margin 20px
  img
    display block
    margin 0px auto
    // transform scale(0.7)
em
  font-size 14px
  font-style normal
  display block
  height 20px
.main-layout
  padding 0
</style>
