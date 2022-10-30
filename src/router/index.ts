import { createRouter, createWebHashHistory } from 'vue-router'

import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import { firstMenu } from '@/utils/mapMenus'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  console.log('to: ', to)
  console.log('from: ', from)

  // if(to.path.startsWith('/main'))
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path != '/login' && !token) return '/login'

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
