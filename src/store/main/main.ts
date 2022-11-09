import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    getEntireDataAction() {
      Promise.all([getEntireRoles(), getEntireDepartments(), getEntireMenus()])
        .then((res) => {
          const [
            entireRolesResult,
            entireDepartmentsResult,
            entireMenusResult
          ] = res
          this.entireRoles = entireRolesResult.data.list
          this.entireDepartments = entireDepartmentsResult.data.list
          this.entireMenus = entireMenusResult.data.list
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    }
  }
})

export default useMainStore
