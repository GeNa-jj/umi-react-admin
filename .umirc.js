// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: 'schedulingSystem',
      dll: false,
      locale: {
        default: 'zh-CN',
        baseNavigator: true,
        antd: true
      },

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
  routes: require('./src/routes'),
  proxy: {
    // '/api': {
    //   target: 'http://192.168.0.1'
    // }
  },
  hash: true,
  ignoreMomentLocale: true,
  treeShaking: true,
  targets: {
    ie: 10
  }
}
