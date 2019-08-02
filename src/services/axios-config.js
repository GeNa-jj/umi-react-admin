/**
 * Created by lujianjun on 2019/07/09.
 * 接口调用配置
 */
import axios from 'axios'
import {message} from 'antd'
import {$cookies} from '../utils/cookie'
import router from 'umi/router'

class AxiosConfig {
	constructor() {
		// 取消上一次请求
		this.pending = []

		this.axios = axios
		this.$ajax = null
		this.$ajaxForm = null
		this.$ajaxFile = null

		this.install(axios)
	}

	/**
	 * @param resultCode int http状态码
	 */
	errResponse(resultCode) {
		if (message) {
			switch (resultCode) {
				case 401:

					break
				case 500:
					message.error('服务器正忙，请稍后重试')
					break
				case 504:
					message.error('请求超时')
					break
				default:

					break
			}
		}
	}

	cancelPending(config) {
		this.pending.forEach((item, index) => {
			if (config) {
				if (item.UrlPath === config.url) {
					item.Cancel() // 取消请求
					this.pending.splice(index, 1) // 移除当前请求记录
				}
			} else {
				item.Cancel() // 取消请求
				this.pending.splice(index, 1) // 移除当前请求记录
			}
		})
	}

	ajaxFilters(axios, CancelToken) {
		// 缓存作用域
		axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
		// 携带上次的token
		axios.defaults.withCredentials = true

		// 请求拦截器
		axios.interceptors.request.use(config => {
			// Do something before request is sent
			this.cancelPending(config)
			config.cancelToken = new CancelToken(res => {
				this.pending.push({'UrlPath': config.url, 'Cancel': res})
			})
			return config
		}, function (error) {
			// Do something with request error
			return Promise.reject(error)
		})

		// 响应拦截器
		axios.interceptors.response.use(response => {
			this.cancelPending(response.config) // 取消上一次请求

			let resultCode = response.data.resultCode

			this.errResponse(resultCode) // 处理错误信息
			// Do something with response data

      // TODO 登录判断
      if (response && response.data) {
        switch (response.data.header) {
          case '900':
          case '905':
            $cookies.remove('token')
            // $cookies.remove('menu')
            localStorage.removeItem('menu')
            router.replace('/login')
            break
          default:
            break
        }
      }

			return response
		}, error => {
			// let resultCode = 504
			if (error.response) {
				// resultCode = error.response.status
				this.errResponse(error.response.status) // 处理错误信息
			}
			// Do something with response error
			return Promise.reject(error)
		})
	}

	install(axios) {
		// 配置默认的ajax
		this.$ajax = axios.create()

		// 配置form表单方式提交
		this.$ajaxForm = axios.create({
			transformRequest: [function (data) {
				let ret = ''
				if (typeof data === 'object') {
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
				} else {
					ret = data
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		// 使用FormData的方式上传文件
		this.$ajaxFile = axios.create({
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		//  取消请求
		let CancelToken = axios.CancelToken

		this.ajaxFilters(this.$ajax, CancelToken)
		this.ajaxFilters(this.$ajaxForm, CancelToken)
		this.ajaxFilters(this.$ajaxFile, CancelToken)
	}
}

export default new AxiosConfig()
