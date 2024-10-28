const path = {
  home: '/',
  register: '/register',
  login: '/login',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/account/profile',
  address: '/user/account/address',
  changePhone: '/user/account/phone',
  changePassword: '/user/account/password',
  historyPurchase: '/user/purchase'
} as const

export default path
