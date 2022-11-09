import {
  createNewUser,
  deleteUser,
  editUserInfo,
  getUserListData,
  newPageData,
  postPageListData,
  editPageData,
  deletePageById
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async getUserListAction(queryInfo: any) {
      const userListResult = await getUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserAction(id: number) {
      const deleteUserResult = await deleteUser(id)
      this.getUserListAction({ offset: 0, size: 10 })
      return deleteUserResult
    },
    async createNewUser(userInfo: any) {
      const createNewUserResult = await createNewUser(userInfo)
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async editUserInfo(id: number, userInfo: any) {
      const editUserInfoResult = await editUserInfo(id, userInfo)
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.getEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.getEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.getEntireDataAction()
    }
  }
})

export default useSystemStore
