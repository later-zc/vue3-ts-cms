import request from '..'

import type { IAccount } from '@/types'

export function accountLogin(account: IAccount) {
  return request.post({
    url: '/login',
    data: account
  })
}

export function getUserInfo(id: number) {
  return request.get({
    url: `/users/${id}`
  })
}

export function getUserMenus(id: number) {
  return request.get({
    url: `/role/${id}/menu`
  })
}
