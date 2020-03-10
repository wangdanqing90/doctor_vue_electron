const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  version: state => state.user.version,
  expires: state => state.user.expires,
  iconurl: state => state.user.iconurl
}
export default getters
