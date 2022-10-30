import type { RouteRecordRaw } from 'vue-router'

export function mapLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main中所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })

  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export default function mapMenusToRoutes(menus: any[]) {
  // 映射本地路由
  const localRoutes = mapLocalRoutes()

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
  const breadCrumbs: IBreadCrumbs[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadCrumbs.push({
          name: menu.name,
          path: menu.url
        })
        breadCrumbs.push({
          name: subMenu.name,
          path: subMenu.url
        })
      }
    }
  }
  return breadCrumbs
}
