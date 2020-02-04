<template>
  <div>
    <div class="tit">
      <em class="table-title">相位设置</em>
    </div>
    <el-table
      :data="fixedplan_list"
      :header-cell-style="{ background: '#FAFAFA' }"
      style="width: 100%"
      class="device-info"
      type="index"
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
      <el-table-column label="状态" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- :style="scope.row.light_num === '未关联' ? 'color: red' : ''" -->
          <span>{{ scope.row.light_num }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      viewFormVisible: false,
      t: '',
      view_list: '',
      // 默认显示的列表
      fixedplan_list: [],
      // 新增方案
      phase_data: {
        phase_num: '',
        phase_name: '',
        type: '1'
      },
      schemeFormVisible: false,
      schemeLabelWidth: '120px',

      // 查看
      all_data: '',

      // 红绿灯
      add_list: {
        green_time: 1,
        yellow_time: 1,
        red_time: 1
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
    xiangwei: function () {
      return this.cityOptions
    }
  },
  mounted: function () {
    this.initial()
  },
  methods: {
    // 初始化
    async initial () {
      const res = await this.$http.get('phaselist/')
      const { code, data } = res
      if (code === 200) {
        const { phase_list: phaseList } = data
        this.fixedplan_list = phaseList
        // 将判断的数据筛选
        for (var i = 0; i < phaseList.length; i++) {
          if ('light_num' in phaseList[i].light_info) {
            phaseList[i].light_num = phaseList[i].light_info.light_num
          } else {
            phaseList[i].light_num = '未关联'
          }
        }
      }
    },
    // // 查看
    // async handle_view (index, row) {
    //   this.viewFormVisible = true
    //   let res = await this.$http.get('fixedplaninfo/', {params: {fixedplan_id: 1}})
    // },
    // 获取相位列表
    getphaselist () {
      this.$http({
        method: 'get',
        url: 'phaselist/'
      }).then((res) => {
        if (res.code === 200) {
          const { data } = res
          const { phase_list: phaseList } = data
          this.cityOptions = phaseList
          for (var i = 0; i < this.cityOptions.length; i++) {
            this.cityOptions[i].judge = false
          }
        }
      })
    },
    // 整理ids的方法
    get_listcont (ids) {
      var idArray = []
      for (var i = 0; i < ids.length; i++) {
        idArray.push(ids[i].id)
      }
      return idArray
    },

    // 复选框情况
    handlecheckListChange (value) {
      let checkedCount = value.length
      this.checklabel = checkedCount > 0 && checkedCount < this.xiangwei.length
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

.plan_content {
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
