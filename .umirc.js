// ref: https://umijs.org/config/
export default {
  base: process.env.NODE_ENV === 'development' ? '/' : process.env.BASEPATH,
  publicPath: 'https://dev.huatugz.com/admin-test/',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: 'umi-react-admin',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//
        ]
      }
    }]
  ],
  disableRedirectHoist: true,
  routes: require('@/routes'),
  proxy: {
    // '/web': {
    //   target: 'http://vm3.busbox.com.cn:15000/hongkong-cms'
    // }
  },
  theme: require('@/theme'),
  hash: true,
  ignoreMomentLocale: true,
  treeShaking: true,
  targets: {
    ie: 10
  }
}
