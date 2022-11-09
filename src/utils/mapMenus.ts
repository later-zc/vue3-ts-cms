import type { RouteRecordRaw } from 'vue-router'

export function mapLocalRoutes() {
  // 1.动态获取所有的路由对象, 放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []

  // 1.1.读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })

  // 1.2.将加载的对象放到localRoutes
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(menus: any[]) {
  // 1.映射本地路由
  const localRoutes = mapLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  // 动态添加路由
  for (const menu of menus) {
    for (const subMenu of menu.children) {
      localRoutes.find((item) => {
        if (item.path == subMenu.url) {
          // 给route的顶层菜单增加重定向功能（只需要添加一次即可）
          if (!routes.find((route) => route.path === menu.url)) {
            routes.push({
              path: menu.url,
              redirect: item.path
            })
          }

          routes.push(item)
          // 记录第一个匹配的菜单
          if (!firstMenu) firstMenu = subMenu
        }
      })
    }
  }

  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) return subMenu
    }
  }
}

interface IBreadCrumbs {
  name: string
  path: string
}
export function mapPathToBreadCrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadCrumbs: IBreadCrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        // 1.顶层菜单
        breadCrumbs.push({
          name: menu.name,
          path: menu.url
        })
        // 2.匹配菜单
        breadCrumbs.push({
          name: subMenu.name,
          path: subMenu.url
        })
      }
    }
  }
  return breadCrumbs
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
