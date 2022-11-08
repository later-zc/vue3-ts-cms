import request from '@/service'

// 用户的网络请求
export function getUserListData(queryInfo: any) {
  return request.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUser(id: number) {
  return request.delete({
    url: `/users/${id}`
  })
}

export function createNewUser(userInfo: any) {
  return request.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserInfo(id: number, userInfo: any) {
  return request.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
