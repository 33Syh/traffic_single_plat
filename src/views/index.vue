<template>
  <el-container class="container">
    <el-header class="header">
      <layout-header></layout-header>
    </el-header>
    <el-container class="container">
      <el-aside width="auto" class="aside">
        <layout-Drawer></layout-Drawer>
      </el-aside>
      <el-main class="main" v-loading.body.lock="loading" element-loading-text="拼命加载中">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import LayoutHeader from '@/components/layout/Header'
import LayoutDrawer from '@/components/layout/Drawer'
export default {
  components: {
    LayoutHeader,
    LayoutDrawer
  },
  data () {
    return {

    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>
<style scoped lang="stylus">
.container
  height 100%
  min-width 1440px
  box-sizing border-box !important
  overflow hidden !important
.header
  padding 0
.main
  height 100%
  background-color #F5F5F5
  margin-right -17px !important
  overflow-y scroll !important
  box-sizing border-box
</style>
