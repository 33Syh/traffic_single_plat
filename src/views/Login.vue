<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      :model="formData"
      :rules="rules"
      ref="formData"
      status-icon
    >
      <el-row :gutter="24" class="login_top">
        <el-col :span="20" :offset="2">
          <el-col :span="24">
            <img src="@/assets/images/login.png" alt="" class="loginImg" />
            <img
              src="@/assets/images/font_login.png"
              alt=""
              class="loginImg"
              style="margin-top: 15px; height: 20px"
            />
          </el-col>
          <!-- <p class="loginText">5G AI红绿灯单路口控制系统</p> -->
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form-item label="" prop="username">
            <el-input
              class="login-input"
              v-model="formData.username"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
              maxlength="30"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="pwd">
            <el-input
              class="login-input"
              type="password"
              v-model="formData.pwd"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              maxlength="30"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-button
            @click="handleLogin('formData')"
            class="login-button"
            type="warning"
            >登录</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="login_footer">
          copyright &copy;
          {{ new Date().getFullYear() }}
          泛网信通
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (this.formData.pwd !== '') {
        //   this.$refs.formData.validateField('');
        // }
        callback()
      }
    }
    return {
      firstLogin: true,
      formData: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [{ validator: checkName, trigger: 'blur' }],
        pwd: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async handleLogin (formName) {
      if (window.localStorage.getItem('isBan') === '3') { return this.$message.error('设备已被禁用,请联系中心管理员授予权限!') }
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false
        }
      })
      if (this.formData.username !== '' && this.formData.pwd !== '') {
        let res = await this.$http.post('login/', this.formData)
        // this.firstLogin ? this.$router.push({'name': 'crossinfo'}) : this.$router.push({'name': 'consoles'})
        const { code } = res
        if (code === 200) {
          localStorage.removeItem('isBan')
          const singleToken = res.data.token
          this.$cookies.set('singleToken', singleToken)
          this.$cookies.set('is_set', res.data.is_set)
          this.$cookies.set('username', this.formData.username)
          this.$cookies.set('abcddddd', 12121212121212121)
          res.data.is_set === 2
            ? this.$router.push({ name: 'crossinfo' })
            : this.$router.push({ name: 'consoles' })
        }
      }
    }
  },
  created () {
    // if (process.env.NODE_ENV === 'production') {
    //   console.log('production')
    // } else if (process.env.NODE_ENV === 'development') {
    //   console.log(this.$http.defaults.baseURL)
    //   console.log('development')
    // }
    // console.log(this.$route.params)
  }
}
</script>
<style lang="stylus" scoped>
html, body, .login-wrap
  min-width 800px
  height 100%
  min-height 820px
  display flex
  justify-content center
  background-color #F5F5F5
 .login-form
    margin-top 180px
    width 445px
    border-radius 8px
    .login-button
      width 100%
      line-height 18px
      margin-top 30px
      background-color #FF6600
.login_top
  margin-bottom 50px
.loginImg
  // width 280px
  height 56px
  display block
  margin 0 auto
.loginText
  padding 5px
  font-size 12px
  text-align center
  color #999
.login_footer
  text-align center
  color #999
  margin-top 260px
</style>
