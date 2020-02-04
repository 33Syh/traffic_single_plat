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
      console.log(res)
      if (res.data.status === 1) {
        window.localStorage.setItem('flag', '1') // flag 为 1 则代码激活成功
        this.$router.push({path: '/login'})
      } else {
        window.localStorage.setItem('flag', '0')
        this.$router.push({name: 'equipmentactive'})
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
