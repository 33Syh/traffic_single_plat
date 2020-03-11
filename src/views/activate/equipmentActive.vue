<template>
  <div class="main">
    <ActiveHeader></ActiveHeader>
    <el-row type="flex" justify="center">
      <el-card class="box-card">
        <el-row>
          <el-col :span="12">
            <img src="@/assets/images/computer.png" alt class="computer" />
          </el-col>
          <el-col :span="12" class="Cart-right" >
            <h3>激活提示</h3>
            <p>请联系管理员获取激活码进行激活！</p>
            <el-form
              :model="equipActionList"
              :rules="rules"
              ref="equipActionListForm"
            >
              <el-form-item prop="product_key">
                <el-input
                  type="text"
                  :controls="false"
                  v-model="equipActionList.product_key"
                  placeholder="请输入ProductKey"
                  maxlength="11"
                ></el-input>
              </el-form-item>

              <el-form-item prop="device_key">
                <el-input
                  type="text"
                  v-model="equipActionList.device_key"
                  placeholder="请输入DeviceKey"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item prop="device_secret">
                <el-input
                  type="text"
                  maxlength="32"
                  v-model="equipActionList.device_secret"
                  placeholder="请输入DeviceSecret"
                ></el-input>
              </el-form-item>
              <el-button
                :type="buttonArr.length === 3 ? 'primary' : 'info' "
                plain
                :disabled="buttonArr.length === 3 ? false : 'disabled'"
                ref="btn"
                style="margin-left: 135px;"
                @click="ImmediatelyActive('equipActionListForm')">立刻激活</el-button>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import ActiveHeader from '@/components/layout/active-header.vue'
export default {
  data () {
    var validateNum = (rule, value, callback) => {
      const index = this.buttonArr.indexOf('product_key')
      if (index !== -1) {
        this.buttonArr.splice(index, 1)
      }
      if (!value) {
        return callback(new Error('ProductKey不可为空！'))
      }
      let Reg = /^[0-9a-zA-Z]{1,11}$/
      if (!Reg.test(value)) {
        callback(new Error(' ProductKey由11位数字、字母组成！'))
      } else {
        if (this.buttonArr.includes('product_key')) {
          callback()
        } else {
          this.buttonArr.push('product_key')
          callback()
        }
      }
    }
    var validateName = (rule, value, callback) => {
      const index = this.buttonArr.indexOf('device_key')
      if (index !== -1) {
        this.buttonArr.splice(index, 1)
      }
      if (value === '') {
        callback(new Error('DeviceKey不可为空！'))
      } else {
        let reg = /^[0-9a-zA-Z]{1,11}$/
        if (!reg.test(value.toString())) {
          callback(new Error(' DeviceKey由11位数字、字母组成！'))
        } else {
          if (this.buttonArr.includes('device_key')) {
            callback()
          } else {
            this.buttonArr.push('device_key')
            callback()
          }
        }
      }
    }
    var validateSelect = (rule, value, callback) => {
      const index = this.buttonArr.indexOf('device_secret')
      if (index !== -1) {
        this.buttonArr.splice(index, 1)
      }
      if (value === '') {
        callback(new Error('DeviceSecret不可为空！'))
      } else {
        let reg = /^[0-9a-zA-Z]{1,32}$/
        if (!reg.test(value.toString())) {
          callback(new Error('DeviceSecret由32位数字、字母组成'))
        } else {
          if (this.buttonArr.includes('device_secret')) {
            callback()
          } else {
            this.buttonArr.push('device_secret')
            callback()
          }
        }
      }
    }
    return {
      flag: 'disabled',
      schemeFormVisible: false,
      equipActionList: {
        product_key: '',
        device_key: '',
        device_secret: ''
      },
      rules: {
        product_key: [{validator: validateNum, trigger: 'blur'}],
        device_key: [{validator: validateName, trigger: 'blur'}],
        device_secret: [{validator: validateSelect, trigger: 'blur'}]
      },
      buttonArr: []
    }
  },

  components: {
    ActiveHeader
  },
  methods: {
    ImmediatelyActive (formName) {
      let tempData = 1
      this.$refs[formName].validate(valid => {
        if (!valid) {
          tempData = tempData + 1
        }
      })
      if (tempData === 1) {
      }

      this.$http.post('activate/', {
        ...this.equipActionList
      }).then((res) => {
        if (res.code === 4009) {
          window.localStorage.setItem('flag', '0')
        } else if (res.code === 200 && res.data.status === 1) {
          window.localStorage.setItem('flag', '1')
          this.$router.push({name: 'activepage'})
        } else if (res.code === 4006) {
          window.localStorage.setItem('flag', '0')
          this.$router.push({name: 'activepage'})
        }
      })
    }
  },
  watch: {
    buttonArr (val) {
      if (val.length === 3) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.main {
  background-color: #F5F5F5
  height: 100%
}

.box-card {
  width: 1200px
  height: 700px
  background: rgba(255, 255, 255, 1)
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1)
  border-radius: 4px
  margin-top: 130px
}

.computer {
  margin-left: 162px
  margin-top: 196px
}

.Cart-right {
  width 368px
  margin-left 60px
  margin-top 162px
  h3 {
    height: 33px
    font-size: 33px
    font-family: SourceHanSansCN-Regular, SourceHanSansCN
    font-weight: 400
    color: rgba(0, 0, 0, 0.85)
    line-height: 33px
    text-align: center
    margin-bottom 20px
  }

  p {
    height: 22px
    font-size: 14px
    font-family: PingFangSC-Regular, PingFang SC
    font-weight: 400
    color: rgba(0, 0, 0, 0.45)
    line-height: 22px
    text-align: center
    margin-bottom 20px
  }
  &>>>.el-button--primary.is-plain{
    width:100px;
    height:36px;
    background:rgba(255,102,0,1);
    border-radius:3px;
    border-color: rgba(255,102,0,1)
    span {
      color: #ffffff
    }
  }
}

</style>
