const xlsx = require('node-xlsx')
const fs = require('fs')
const drlbmc2drlbdm = require('./drlbmc2drlbdm.json')

console.log(process.cwd())
let srcData = xlsx.parse(`${process.cwd()}/tools/2018计划.xlsx`)

let drlbdm2ss = {}

let tableHeader = srcData[0].data[0]
srcData[0].data.forEach(row => {
  if(row[0] !== 'kl') {
    let drlbmc = row[0]
    let drlbdm = drlbmc2drlbdm[drlbmc]
    if (!drlbdm2ss[drlbdm]) {drlbdm2ss[drlbdm] = {}}

    for (let col=2; col < row.length; col++) {
      let ss = tableHeader[col]
      if (!drlbdm2ss[drlbdm][ss]) { drlbdm2ss[drlbdm][ss]=0 }
      drlbdm2ss[drlbdm][ss] += row[col]? row[col] : 0
      console.log(`${ss} - ${drlbmc} += ${row[col]? row[col] : 0}`)
    }
  }
});

fs.writeFileSync(`${process.cwd()}/tools/drlbdm2ssmc.json`, JSON.stringify(drlbdm2ss))

