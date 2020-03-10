import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'vue-cookies'
// import { Message } from 'element-ui'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  base: '/nice/app/',
  routes: [
    {
      path: '/',
      redirect: '/activate'
    },
    {
      path: '/activate',
      name: 'activate',
      component: () => import('@/views/activate/index.vue')
    },
    {
      path: '/equipmentactive',
      name: 'equipmentactive',
      component: () => import('@/views/activate/equipmentActive.vue')
    },
    {
      path: '/activepage',
      name: 'activepage',
      component: () => import('@/views/activate/activePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: resovle => import('@/views/Login.vue').then(resovle)
    },
    {
      path: '/',
      name: 'home',
      component: resovle => import('@/views/Home.vue').then(resovle),
      children: [
        {
          path: '/crossinfo',
          name: 'crossinfo',
          component: resovle =>
            import('@/views/components/CrossInfo.vue').then(resovle)
        },
        {
          path: '/deviceinfo',
          name: 'deviceinfo',
          component: resovle =>
            import('@/views/components/DeviceInfo.vue').then(resovle)
        },
        {
          path: '/controlinfo',
          name: 'controlinfo',
          component: resovle =>
            import('@/views/components/ControlInfo.vue').then(resovle)
        }
      ]
    },
    {
      path: '/',
      name: 'index',
      component: resovle => import('@/views/index.vue').then(resovle),
      children: [
        {
          path: '/consoles',
          name: 'consoles',
          component: resovle => import('@/views/Consoles.vue').then(resovle)
        },
        {
          path: '/monitoringinfo',
          name: 'monitoringinfo',
          component: resovle =>
            import('@/views/MonitoringInfo.vue').then(resovle)
        },
        {
          path: '/fixedcontrol',
          name: 'fixedcontrol',
          component: resovle =>
            import('@/views/controls/FixedControl.vue').then(resovle)
        },
        {
          path: '/fixededit',
          name: 'fixededit',
          component: resovle =>
            import('@/views/controls/FixedEdit.vue').then(resovle)
        },
        {
          path: '/statusdetail',
          name: 'statusdetail',
          component: resovle =>
            import('@/views/controls/StatusDetail.vue').then(resovle)
        },
        {
          path: '/tacticscontrol',
          name: 'tacticscontrol',
          component: resovle =>
            import('@/views/controls/TacticsControl.vue').then(resovle)
        },
        {
          path: '/timescontrol',
          name: 'timescontrol',
          component: resovle =>
            import('@/views/controls/TimesControl.vue').then(resovle)
        },
        // {
        //   path: '/cardatas',
        //   name: 'cardatas',
        //   component: resovle =>
        //     import('@/views/datas/CarDatas.vue').then(resovle)
        // },
        // {
        //   path: '/tacticsdatas',
        //   name: 'tacticsdatas',
        //   component: resovle =>
        //     import('@/views/datas/TacticsDatas.vue').then(resovle)
        // },
        // {
        //   path: '/timesdatas',
        //   name: 'timesdatas',
        //   component: resovle =>
        //     import('@/views/datas/TimesDatas.vue').then(resovle)
        // },
        {
          path: '/roadconfig',
          name: 'roadconfig',
          component: resovle =>
            import('@/views/systemConfig/RoadConfig.vue').then(resovle)
        },
        {
          path: '/deviceconfig',
          name: 'deviceconfig',
          component: resovle =>
            import('@/views/systemConfig/DeviceConfig.vue').then(resovle)
        },
        {
          path: '/phaseconfig',
          name: 'phaseconfig',
          component: resovle =>
            import('@/views/systemConfig/PhaseConfig.vue').then(resovle)
        },
        {
          path: '/conflictphase',
          name: 'conflictphase',
          component: resovle =>
            import('@/views/systemConfig/ConflictPhaseConfig.vue').then(resovle)
        },
        {
          path: '/carconfig',
          name: 'carconfig',
          component: resovle =>
            import('@/views/systemConfig/CarConfig.vue').then(resovle)

        },
        {
          path: '/systemconfig',
          name: 'systemconfig',
          component: (resovle) => import('@/views/systemConfig/SystemConfig.vue').then(resovle)
        },
        {
          path: '/systemlog',
          name: 'systemlog',
          component: (resovle) => import('@/views/systemConfig/SystemLog.vue').then(resovle)
        }
      ]
    }
  ]
})
// 路由的前置守卫
router.beforeEach((to, from, next) => {
  let url = window.location.href
  let str = url.substr(url.indexOf('?') + 1)
  let data = {}
  data[str.substring(0, str.indexOf('='))] = str.substr(str.indexOf('=') + 1)
  if (data.token) {
    Cookies.set('singleToken', data.token)
  }
  // 下载升级过程中禁止跳转，字符串类型，不可删掉直接='true'
  if (from.name === 'systemconfig' && localStorage.getItem('updataDia') === 'true') {
    // router.push({
    //   name: 'systemconfig'
    // })
    history.go(1)
    return
  }
  if (to.name !== 'login' && to.name !== 'activate' && to.name !== 'equipmentactive') {
    const singleToken = Cookies.get('singleToken')
    if (!singleToken) {
      router.push({
        name: 'login'
      })
      next()
    }
  } else {
    next()
  }
  next()
})

export default router
