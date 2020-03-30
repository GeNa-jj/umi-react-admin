/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 * @param {number} min
 */
const numberFormatter = (num, digits, min) => {
  if (num && (min ? num > min : true)) {
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'k' }
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      }
    }
    return num.toString()
  }
  return num
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
const toThousandFilter = num => {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
 * @param url
 * @returns {string[]}
 */
const urlToList = url => {
  const urllist = url.split('/').filter(i => i)
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`
  })
}

/**
 * 文件流导出
 * @param dataFlow
 * @param fileName
 */
const exportExcel = (dataFlow, fileName = 'fileName') => {
  let blob = new Blob([dataFlow], {type: 'application/vnd.ms-excel;charset=utf-8'})
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  downloadElement.download = `${fileName}.xlsx`
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}


export {
  numberFormatter,
  toThousandFilter,
  urlToList,
  exportExcel
}
