<template>
    <el-header class="header">
      <el-row :gutter="20">
        <el-col :span="18">
          <router-link to="consoles" class="logo">
            <img src="@/assets/images/svg/logo1.png" alt="logo" title="logo" >
          </router-link>
        </el-col>
        <el-col :span="6">
          <div class="right">
            <span class="left">
              <img src="@/assets/images/svg/user.svg" alt="">
              &nbsp;
              <i>  {{this.username}}</i>
              <span class="admin_img">管理员</span>
            </span>
            <span @click='logout'>退出</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
</template>
<script>
export default {
  data () {
    return {
      username: 'admin'
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    logout () {
      this.$confirm('是否退出系统', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        this.$router.push({
          name: 'login'
        })
        this.$cookies.remove('singleToken')
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.header
  background-color #333
  padding 0 30px
a
  float left
.logo img
  height 40px
  vertical-align middle
.right
  width 200px
  font-size 15px
  line-height 60px
  cursor pointer
  color #999
  img
    position relative
    top 6px
    left 0
  i
    margin-right 10px
    font-style normal
  a
    text-decoration none
    color #999
  .admin_img
    font-size 12px
    padding 1px 2px
    margin 0 24px 0 0px
    color #fff
    border-radius 2px
    background-color #7ED321
</style>
