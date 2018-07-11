const xlsx = require('node-xlsx')
const fs = require('fs')
console.log(process.cwd())
let srcData = xlsx.parse(`${process.cwd()}/tools/2018导入类别标准库.xls`)
let drlbdm2drlbmc = {}
let drlbmc2drlbdm = {}

for (let row of srcData[0].data) {
  drlbdm2drlbmc[row[0]] = row[1]
  drlbmc2drlbdm[row[1]] = row[0]
  console.log(`${row[0]} -> ${row[1]}`)
}

delete drlbdm2drlbmc['导入类别代码']
delete drlbmc2drlbdm['导入类别名称']

fs.writeFileSync(`${process.cwd()}/tools/drlbdm2drlbmc.json`, JSON.stringify(drlbdm2drlbmc))
fs.writeFileSync(`${process.cwd()}/tools/drlbmc2drlbdm.json`, JSON.stringify(drlbmc2drlbdm))


