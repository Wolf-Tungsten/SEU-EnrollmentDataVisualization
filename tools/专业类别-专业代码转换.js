const xlsx = require('node-xlsx')
const fs = require('fs')
console.log(process.cwd())
let srcData = xlsx.parse(`${process.cwd()}/tools/2018专业库.xlsx`)
let zydm2zymc = {}
let zymc2zydm = {}

for (let row of srcData[0].data) {
  zydm2zymc[row[0]] = row[2]
  zymc2zydm[row[2]] = row[0]
  console.log(`${row[0]} -> ${row[2]}`)
}

delete zydm2zymc['专业代码']
delete zymc2zydm['专业名称']

fs.writeFileSync(`${process.cwd()}/tools/zydm2zymc.json`, JSON.stringify(zydm2zymc))
fs.writeFileSync(`${process.cwd()}/tools/zymc2zydm.json`, JSON.stringify(zymc2zydm))


