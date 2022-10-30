import { defineStore } from 'pinia'

import { accountLogin, getUserInfo, getUserMenus } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { USER_INFO, LOGIN_TOKEN, USER_MENUS } from '@/global/constant'
import mapMenusToRoutes from '@/utils/mapMenus'
import router from '@/router'

interface ILoginState {
  accountInfo: {
    id: number
    token: string
  }
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    accountInfo: {
      id: -1,
      // name: '',
      token: ''
    },
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await accountLogin(account)
      if (!res.data) return Promise.reject(res)
      this.accountInfo = res.data
      localCache.setCache(LOGIN_TOKEN, res.data.token)

      const userInfoResult = await getUserInfo(this.accountInfo.id)
      if (!userInfoResult.data) return Promise.reject(userInfoResult)
      this.userInfo = userInfoResult.data
      localCache.setCache(USER_INFO, userInfoResult.data)

      const userMenusResult = await getUserMenus(this.userInfo.role.id)
      if (!userMenusResult.data) return Promise.reject(userMenusResult)
      this.userMenus = userMenusResult.data
      localCache.setCache(USER_MENUS, userMenusResult.data)

      const routes = mapMenusToRoutes(userMenusResult.data)
      routes.forEach((route) => router.addRoute('main', route))
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)

      // 用户刷新时：判断用户是否登录以及是否包含useMenus菜单
      if (token && userInfo && userMenus) {
        this.accountInfo.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
