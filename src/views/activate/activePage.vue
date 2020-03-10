<template>
  <div style="height: 100%; background-color: #F5F5F5">
    <ActivePage></ActivePage>
    <el-row type="flex" justify="center" align="middle" style="height: 100%">
      <el-col type="flex" justify="center" align="middle">
        <el-card class="box-card">
          <el-row justify="center" align="middle">
              <el-col style="width: 720px" type="flex" justify="center" align="middle">
                  <div v-if="flag===1" class="content">
                    <img src="@/assets/images/success.png" alt="">
                    <h3>激活成功</h3>
                    <p>请点击下面按钮直接进入系统<span style="color: #FF7416">登陆页面</span></p>
                    <el-button type="primary" @click="goToPage">点击进入 &gt;</el-button>
                  </div>
                  <div v-if="flag===2"  class="content">
                    <img src="@/assets/images/error.png" alt="">
                    <h3>激活失败</h3>
                    <p>激活失败，请检查网络！</p>
                    <el-button type="primary" @click="goToPage">返回</el-button>
                  </div>
              </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ActivePage from '@/components/layout/active-header.vue'
export default {
  data () {
    return {
      flag: window.localStorage.getItem('flag')
    }
  },
  mounted () {
    // console.log(this.$route.params.flag)
  },
  components: {
    ActivePage
  },
  methods: {
    goToPage () {
      if (this.flag === 1) {
        this.$router.replace({path: '/login'})
      } else if (this.flag === 0) {
        this.$router.replace({path: '/equipmentActive'})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.box-card
  width:1200px;
  height:700px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 10px 4px rgba(0,0,0,0.1);
  border-radius:4px;
  .content
    width 720px
    text-align center
    margin 170px 0 0 220px
    img
      height 72px
      width 72px
    h3
      font-size:24px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:32px;
      margin 16px 0
    p
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.45);
      line-height:22px;
      margin-bottom 42px
    button
      width:146px;
      height:45px;
      border-radius:3px;
</style>
