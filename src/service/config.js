export default {
  // 环境配置
  ENV: {
    local: {
      // api: 'http://api.env.isc.me/',
      // api: 'http://192.168.51.39:30565'
      api: 'http://apiisccoin.dev.tangkc.com'
    },
    develop: {
      // api: 'http://192.168.11.215:30704'
      api: 'http://192.168.51.39:30565'
    },
    test: {
      api: 'http://apiisccoin.test.tangkc.com'
    },
    production: {
      api: 'http://apiisccoin.tangkc.com'
    }
  }[process.env.NODE_ENV],

  // 请求超时
  TIMEOUT: 60000,

  // 项目版本号
  VERSION: `3.3.4.${process.env.VERSION}`,

  // 本地store缓存 前缀
  STORE_PREFIX: 'interstellar_'
}
