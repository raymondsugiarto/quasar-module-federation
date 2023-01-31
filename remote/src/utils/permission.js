export const hasPermissionRoutes = (permissionAccess, route) => {
  if (route.meta && route.meta.key) {
    if (route.meta.hidden) {
      return true
    } else {
      // Logger.info('list', permissionAccess, 'access')()
      return hasPermission(permissionAccess, route.meta.key)
      // return true
    }
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes, permissionAccess) => {
  const res = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermissionRoutes(permissionAccess, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, permissionAccess)
      }
      res.push(r)
    } else {
      r.meta.restricted = true
      res.push(r)
    }
  })
  return res
}

// Return true if has permission
export const hasPermission = (permissionAccess, key) => {
  const access = permissionAccess.filter((x) => x.menu_key === key)
  return access.length > 0
}
