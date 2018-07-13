const xlsx = require('node-xlsx')
const fs = require('fs')
const zymc2zydm = require('./zymc2zydm.json')
const zydm2zymc = require('./zydm2zymc.json')
console.log(process.cwd())
let srcData = xlsx.parse(`${process.cwd()}/tools/排名数据.xlsx`)

let rankData = {}

for (let row = 2; row < srcData[0].data.length; row++) {
    let src = srcData[0].data[row]
    let ssmc = ''+src[1]
    let nf = ''+src[0]
    if ( !rankData[ssmc] ) { rankData[ssmc] = {} }
    rankData[ssmc][nf] = {'985排名':src[2] ? src[2] : -1,'文史':src[3] ? src[3] : -1, '理工':src[6] ? src[6] : -1}
}
console.log(rankData)
fs.writeFileSync(`${process.cwd()}/tools/history.json`, JSON.stringify(rankData))