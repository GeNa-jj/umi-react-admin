/*eslint-disable*/
const $cookies = {
	// 获取cookie
	get: function(key) {
		const name = key + '='
		const ca = document.cookie.split(';')
		for (let i = 0; i < ca.length; i++) {
			const c = ca[i].trim()
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ''
	},

	// 设置cookie,默认是7天
	set: function(key, value, effectTime = (7 * 24 * 60 * 60), path, domain, secure) {
		const d = new Date()
		d.setTime(d.getTime() + (effectTime * 1000))
		const expires = 'expires=' + d.toGMTString()
		document.cookie = key + '=' + value + '; ' + expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : '; path=/') + (secure ? "; secure" : "")
	},

	// 删除cookie
	remove: function(key, path, domain) {
		if (!key || !this.isKey(key)) {
			return false
		}
		document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : '; path=/')
		return this
	},

	// 是否有此cookie
	isKey: function(key) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)
	},

	// 获取cookie全部key
	keys:  function() {
		if(!document.cookie) return []
		var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var _index = 0; _index < _keys.length; _index++) {
			_keys[_index] = decodeURIComponent(_keys[_index])
		}
		return _keys
	}

}

export {$cookies}
