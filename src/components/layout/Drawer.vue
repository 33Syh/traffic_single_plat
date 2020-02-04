<template>
  <div class="drawer">
    <el-radio-group v-model="isCollapse" @change='isCollapseChange' class="menu-isopen">
      <el-radio-button :label="false" v-if='isOpen === false'><i class="icon iconfont icon-caidan"></i></el-radio-button>
      <el-radio-button :label="true" v-else class="open"><i class="icon iconfont icon-caidan"></i></el-radio-button>
    </el-radio-group>
    <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :default-active="this.$route.name"
              menu-trigger="click"
              :unique-opened='true'
              class="el-menu-vertical-demo"
              :collapse="isCollapse"
              :router="true">
              <el-menu-item index="consoles">
                <i class="icon iconfont icon-shuju"></i>
                <span slot="title">中控台</span>
              </el-menu-item>
              <el-menu-item index="monitoringinfo">
                <i class="icon iconfont icon-jiankong"></i>
                <span slot="title">视频监控</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="icon iconfont icon-diaojiekongzhi2"></i>
                  <span>控制管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="fixedcontrol">固定方案管理</el-menu-item>
                  <el-menu-item index="tacticscontrol">策略管理</el-menu-item>
                  <el-menu-item index="timescontrol" disabled>分时方案管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- <el-submenu index="4">
                <template slot="title">
                  <i class="icon iconfont icon-tongjibaobiao"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="cardatas">车流量统计</el-menu-item>
                  <el-menu-item index="tacticsdatas">策略统计</el-menu-item>
                  <el-menu-item index="timesdatas">通过时间统计</el-menu-item>
                </el-menu-item-group>
              </el-submenu> -->
              <el-submenu index="5">
                <template slot="title">
                  <i class="icon iconfont icon-shezhi"></i>
                  <span>系统配置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="roadconfig">路口配置</el-menu-item>
                  <el-menu-item index="deviceconfig">设备配置</el-menu-item>
                  <el-menu-item index="phaseconfig">相位设置</el-menu-item>
                  <el-menu-item index="conflictphase">冲突相位设置</el-menu-item>
                  <el-menu-item index="carconfig">道路区域配置</el-menu-item>
                  <el-menu-item index="systemconfig">系统配置</el-menu-item>
                  <el-menu-item index="systemlog">系统日志</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
  </div>
</template>
<script>
export default {
  name: 'LayoutDrawer',
  data () {
    return {
      msg: '',
      isCollapse: false,
      isOpen: true
    }
  },
  methods: {
    isCollapseChange (e) {
      if (e === false) {
        this.isOpen = true
      } else {
        this.isOpen = false
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.el-aside
  color #333
.el-menu
  width 200px
.el-menu--collapse
  width 60px
  border-right 0 none
</style>
