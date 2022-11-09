import { defineStore } from 'pinia'

import { accountLogin, getUserInfo, getUserMenus } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { USER_INFO, LOGIN_TOKEN, USER_MENUS } from '@/global/constant'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/mapMenus'
import router from '@/router'
import useMainStore from '../main/main'

interface ILoginState {
  accountInfo: {
    id: number
    token: string
  }
  userInfo: any
  userMenus: any[]
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    accountInfo: {
      id: -1,
      // name: '',
      token: ''
    },
    userInfo: {},
    userMenus: [],
    permissions: []
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
      const userMenus = userMenusResult.data

      if (!userMenus) return Promise.reject(userMenusResult)
      this.userMenus = userMenus
      localCache.setCache(USER_MENUS, userMenus)

      const mainStore = useMainStore()
      mainStore.getEntireDataAction()

      // 获取登录用户的所有按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 动态添加路由
      const routes = mapMenusToRoutes(userMenus)
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

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.getEntireDataAction()

        // 2.获取按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
