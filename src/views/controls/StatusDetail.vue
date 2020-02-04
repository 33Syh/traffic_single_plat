<template>
  <div>
    <div class="tit">
      <em>方案信息</em>
      <hr />
      <div class="bg_tit">
        固定方案-{{ all_data.length > 0 ? all_data[0].plan_num : '' }}
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">&nbsp;</div>
        </el-col>
      </el-row>
      <em class="table-title">方案详情</em>
      <el-table
        :header-cell-class-name="font_style"
        :cell-class-name="font_style"
        :data="all_data"
        border=""
        style="width: 100%"
      >
        <el-table-column show-overflow-tooltip prop="plan_num" label="方案号" width=""></el-table-column>
        <el-table-column show-overflow-tooltip prop="plan_name" label="方案名称" width=""></el-table-column>
        <el-table-column show-overflow-tooltip prop="status" label="状态"></el-table-column>
        <el-table-column show-overflow-tooltip prop="create_at" label="创建时间" v-if="isShow"></el-table-column>
        <el-table-column show-overflow-tooltip prop="update_at" label="更新时间" v-if="isShow"></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">&nbsp;</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">&nbsp;</div>
        </el-col>
      </el-row>
      <em class="table-title">阶段详情</em>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">&nbsp;</div>
        </el-col>
      </el-row>
      <el-table
        :data="all_data"
        border=""
        style="width: 100%"
        :header-cell-class-name="font_style"
        :cell-class-name="font_style"
      >
        <el-table-column show-overflow-tooltip prop="part_count" label="总阶段数"></el-table-column>
        <el-table-column show-overflow-tooltip prop="time" label="总周期时长（秒）"></el-table-column>
      </el-table>
      <!-- 方案处理 -->
      <i></i>
      <el-table
        :data="partsInfo"
        border=""
        style="width: 100%"
        :header-cell-class-name="font_style"
        :cell-class-name="font_style"
      >
        <el-table-column show-overflow-tooltip prop="part_num" label="阶段号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="green_time" label="阶段绿灯时间(秒)"></el-table-column>
        <el-table-column show-overflow-tooltip prop="red_time" label="阶段红灯时间(秒)"></el-table-column>
        <el-table-column show-overflow-tooltip prop="yellow_time" label="阶段黄灯时间(秒)"></el-table-column>
        <el-table-column show-overflow-tooltip prop="phases_info" label="相位设置" style="width:180;"></el-table-column>
        <el-table-column show-overflow-tooltip prop="all_time" label="阶段时长(秒)"></el-table-column>
      </el-table>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">&nbsp;</div></el-col
      >
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" align="center">
          <el-button class="definite_btn" @click="return_total">返回</el-button>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: true,
      row: '',
      index: '',
      viewFormVisible: false,
      all_data: [],
      partsInfo: []
    }
  },
  mounted () {
    this.row = this.$route.params.row
    this.index = this.$route.params.index
    this.inital(this.index, this.row)
  },
  methods: {
    // element方法让蚊子居中
    font_style ({ row, rowIndex }) {
      return 'sta_fontcenter'
    },
    // 页面初始化
    inital (index, row) {
      this.$http({
        method: 'get',
        url: `fixedplaninfo/${row.id}/`
      }).then(res => {
        this.all_data = []
        this.all_data.push(res.data)
        // 处理连接
        if (this.all_data[0].status === 1) {
          this.all_data[0].status = '使用中'
        } else {
          this.all_data[0].status = '未使用'
        }
        // 处理下面的阶段
        let { parts_info: partsInfo } = res.data
        this.partsInfo = partsInfo
        // 相位设置处理
        var str = ''
        for (var i = 0; i < partsInfo.length; i++) {
          // all_time是周期时长
          partsInfo[i].all_time =
            partsInfo[i].green_time +
            partsInfo[i].red_time +
            partsInfo[i].yellow_time
          // 下面是处理的
          for (var j = 0; j < partsInfo[i].phases_info.length; j++) {
            str +=
              partsInfo[i].phases_info[j].phase_num +
              partsInfo[i].phases_info[j].phase_name +
              '， '
          }
          str = str.substr(0, str.length - 2)
          partsInfo[i].phases_info = str
          str = ''
        }
      })
    },
    // 返回按钮
    return_total () {
      this.$router.push({
        name: 'fixedcontrol'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/config.styl';
  .bg_tit{
    font-size:28px;
    font-weight:600;
    text-align:center;
    line-height:50px
  }
</style>
<style>
.sta_fontcenter {
  text-align: center !important;
}
.definite_btn {
  background-color: #ff6600;
  color: white;
}
</style>
