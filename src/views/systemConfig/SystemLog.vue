<template>
  <div class="systemlog_contain">
    <div class="tit">
      <em class="table-title">系统日志</em>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix deepcolor">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              操作时间
               <div class="block" style="display:inline;margin:-2px 20px 0;vertical-align: middle">
                <el-date-picker
                  v-model="time_range"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :maxTime="nowData"
                  :picker-options="pickerOptionsEnd"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['12:00:00']">
                </el-date-picker>
              </div>
              关键词
              <em title="请输入操作内容和日志详情列表区相关操作信息">?</em>
              <el-input width="260px" v-model="keywords" style="margin:0 20px 0 10px" placeholder="请输入内容"></el-input>
              <el-button style="color:#fff; background-color:#FF6600" @click="initial()" size="small">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row >
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-table
              :data="fixedplan_list"
              :header-cell-style="{ background: '#FAFAFA' }"
              style="width: 100%"
              class="device-info"
            >
              <!-- @current-change="handleCurrentChange" -->
              <el-table-column type="index"  align="center" label="日志编号" width="100">
              </el-table-column>
              <el-table-column
                label="操作人"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.operator }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作时间"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.create_at }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作内容"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作详情"
                align="center"
                effect="light"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.before!==scope.row.after?scope.row.before+scope.row.after: scope.row.before}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:0">
          <el-col :span="8">
            <div class="grid-content bg-purple">&nbsp;</div>
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
                :total="total"
              ></el-pagination>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">&nbsp;</div>
          </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time_range: [ ],
      keywords: '',
      total: 0,
      // 默认显示的列表
      fixedplan_list: [],
      // 分页
      currentPage: 1, // 初始页
      pagesize: 20, //    每页的数据
      nowData: '2019-11-14 12:00:00',
      // 结束日期配置
      pickerOptionsEnd: {
        disabledDate: time => {
          return (
            time.getTime() < new Date(this.startDate).getTime() - 86400000 ||
            time.getTime() > Date.now()
          )
        }
      }
    }
  },
  computed: {
    xiangwei: function () {
      return this.cityOptions
    }
  },
  mounted: function () {
    this.initial()
  },
  methods: {
    indexMethod (index) {
      return index
    },
    // 分页
    handleSizeChange (val) {
      this.pagesize = val
      this.initial()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initial()
    },

    // 初始化
    async initial () {
      let res = ''
      let str = {
        params: {}
      }
      if (this.time_range === null && this.keywords === '') {
        str = {
          params: {}
        }
      } else if (this.time_range === null && this.keywords !== '') {
        str = {params: {'keywords': this.keywords}}
      } else if (this.time_range.length === 0 && this.keywords === '') {
        str = {
          params: {}
        }
      } else if (this.time_range.length > 0 && this.keywords === '') {
        str = {params: {'time_range': JSON.stringify(this.time_range)}}
      } else if (this.time_range.length === 0 && this.keywords !== '') {
        str = {params: {'keywords': this.keywords}}
      } else {
        str = {params: {'time_range': JSON.stringify(this.time_range), 'keywords': this.keywords}}
      }
      str.params.page = this.currentPage
      str.params.pagesize = this.pagesize
      res = await this.$http.get('systemloglist/', str)
      if (res.code === 200) {
        this.fixedplan_list = res.data.list
        this.total = res.data.total
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/config.styl'
*
  font-size 14px
.clearance
  margin 20px
.add_btn
  text-align center
  align center
  margin-top 20px
.definite_btn
  background-color #FF6600
  color white
.plan_content, .add_plan
  border-bottom 1px solid #E5E5E5
  padding 20px 0 20px 0
  font-size 14px
  line-height 22px
.tra_img
  width 370px
  background-color green
  height 315px
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
.box-card
  em
    margin-left:5px
    display: inline-block;
    border: 1px solid #e1dfdf;
    border-radius: 50%;
    height: 12px;
    line-height 12px
    width: 12px;
    font-size: 12px;
    text-align: center;
    cursor pointer

</style>

<style lang="stylus">
/* 难以重置的样式 */
.systemlog_contain
  .el-card__header
    padding: 10px 20px;
  .deepcolor
    .el-input
      width 260px
  .el-input__icon
    line-height 26px
  .el-dialog__header
    font-size 14px
    background-color #f5f5f5
  .el-dialog__title
    font-size 14px
    font-weight 700
  .el-dialog__body
    padding 0px 20px
    color #606266
    font-size 14px
    word-break break-all
  .fr
    float right
    margin-right 10px
.el-tooltip__popper
  padding: 12px;
  font-size: 14px;
  line-height: 1.3;
.el-tooltip__popper.is-dark
  width: 290px;
</style>
