import {
  createNewUser,
  deleteUser,
  editUserInfo,
  getUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
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
    }
  }
})

export default useSystemStore
