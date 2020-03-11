import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import router from './router'
import Cookies from 'vue-cookies'
import MyHttpServer from '@/plugins/http.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import VueSocketIO from 'vue-socket.io'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import VideoPlayer from 'vue-video-player'
import promise from 'es6-promise'
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import GeminiScrollbar from 'vue-gemini-scrollbar'
// import 'lib-flexible/flexible.js'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'q6S3S45K1cZ8KpTvX9704TLTZnKBEwhQ'
})
Vue.use(GeminiScrollbar)
promise.polyfill()
Vue.use(VideoPlayer)
Vue.use(HappyScroll)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Cookies)
Vue.use(MyHttpServer)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    setLoading (state, value) {
      state.loading = value
    }
  }
})

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: '/get_redis_mapinfo' //  kaikai
  })
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// window.console =
//   window.console ||
//   (function () {
//     var c = {}
//     c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () {}
//     return c
//   })()
