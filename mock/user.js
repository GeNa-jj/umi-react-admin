export default {
  'POST /api/user/login': (req, res) => {
    setTimeout(() => {
      res.send({
        data: {
          data: {
            date: new Date(),
            effectTime: 7200,
            authToken: 'gena'
          },
          code: '0',
          message: '响应正常，有数据返回'
        }
      })
    }, 1000)
  }
}
