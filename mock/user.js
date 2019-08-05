export default {
  'POST /api/user/login': (req, res) => {
    setTimeout(() => {
      res.send({
        data: {
          date: new Date(),
          effectTime: 7200,
          token: 'gena'
        },
        header: '000',
        message: '响应正常，有数据返回'
      })
    }, 1000)
  },
  'POST /api/user/logout': (req, res) => {
    setTimeout(() => {
      res.send({
        data: null,
        header: '000',
        message: '响应正常，有数据返回'
      })
    }, 300)
  }
}
