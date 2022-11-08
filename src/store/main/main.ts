import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    getEntireDataAction() {
      Promise.all([getEntireRoles(), getEntireDepartments()])
        .then((res) => {
          console.log('res: ', res)
          const [entireRolesResult, entireDepartmentsResult] = res
          this.entireRoles = entireRolesResult.data.list
          this.entireDepartments = entireDepartmentsResult.data.list
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    }
  }
})

export default useMainStore
