<template>
  <div>
    <!-- jghjghhgkh -->
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
      if (res.data.status === 1) { // 1 则代码激活成功
        window.localStorage.setItem('isBan', 1)
        this.$router.push({path: '/login'})
      } else if (res.data.status === 3) { // 为 3 则代码禁用
        window.localStorage.setItem('isBan', 2)
        this.$router.push({path: '/login'})
      } else if (res.data.status === 0) { // 为 0 未激活
        window.localStorage.setItem('isBan', 3)
        this.$router.push({path: '/equipmentactive'})
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
