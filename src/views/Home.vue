<template>
  <el-container class="container">
    <div class="main-body">
    </div>
    <el-header class="header">
      <layout-header></layout-header>
    </el-header>
    <div class="entrance-wrap">
      <div class="wrap">
        <el-row class="first">
          <el-col :span="24" >
            <p>您好, 欢迎登录5G AI红绿灯单路口控制系统，请按步骤配置</p>
          </el-col>
        </el-row>
        <div class="container_card">
          <el-card class="box-card">
            <el-main class="main" v-loading.body.lock="loading" element-loading-text="拼命加载中">
              <router-view></router-view>
            </el-main>
          </el-card>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script>
import LayoutHeader from '@/components/layout/Header'
export default {
  components: {
    LayoutHeader
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  },
  created () {
    // this.$router.push({'name': 'crossinfo'})
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  min-width 1440px
  margin 0 auto
  .el-main
    padding 18px 10px
  .main-body
    width 1440px
.header
  padding 0
.main
  margin 0 2.2rem
  height: 100%
.entrance-wrap
  margin-top 25px
  min-height 90%
  .wrap
    height 100%
    // box-sizing border-box
    // overflow auto
    // overflow-x hidden
    position relative
.first
  margin 32px 0 20px
  text-align center
  p
    font-size 16px
.container_card
  padding 0 2.2rem 30px
  width 1200px
  margin 0 auto
.box-card
  width 100%
  margin 0 auto
</style>
<style lang="stylus" scoped>
.steps
  padding-top 60px
  width 80%
  margin 0 auto
  height 30px
  text-align center
  padding-left 3%
  overflow hidden
  .line
    width 300px
    height 6px
    background-color #E5E5E5
    text-align center
    margin-right 1px
    float left
    position relative
    span
      font-size 14px
      position absolute
      color #4D4D4D
      top -25px
      left 50%
      transform translate(-55%, -50%)
    .dot
      margin 0 auto
      width 18px
      height 14px
      position absolute
      top 50%
      left 50%
      background-color #ffffff
      transform translate(-50%, -50%)
      z-index 2
      i
        width 14px
        height 14px
        display block
        margin 0 auto
        border-radius 50%
        background-color #E5E5E5
.active
  .line
    background-color #FF6600
    span
      color #FF6600
    .dot i
      background-color #FF6600
</style>
