<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'activate',
  methods: {
    async init () {
      let res = await this.$http.get('activate/')
      if (res.code !== 200) return
      if (res.data.status === 1) {
        window.localStorage.setItem('isBan', '1')
        window.localStorage.setItem('flag', '1') // flag 为 1 则代码激活成功
        this.$router.push({path: '/login'})
      } else if (res.data.status === 3) {
        window.localStorage.setItem('isBan', '3')
        window.localStorage.setItem('flag', '1') // flag 为 3 则代码禁用
        this.$router.push({path: '/login'})
      } else if (res.data.status === 0) {
        window.localStorage.setItem('isBan', '2')
        window.localStorage.setItem('flag', '0') // flag 为 0 未激活
        this.$router.push({name: 'equipmentactive'})
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
