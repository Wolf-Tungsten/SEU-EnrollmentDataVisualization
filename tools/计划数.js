const xlsx = require('node-xlsx')
const fs = require('fs')
const zymc2zydm = require('./zymc2zydm.json')
const zydm2zymc = require('./zydm2zymc.json')
console.log(process.cwd())
let srcData = xlsx.parse(`${process.cwd()}/tools/2018计划.xlsx`)

let zyjhs = {} // 专业计划数
let ssjhs = {} // 省市计划数

let tableHeader = srcData[0].data[0]
for (let row of srcData[0].data) {
  if (row[0] === 'kl') { continue }
  let zydm = zymc2zydm[row[1]]
  if (!zydm) {
    console.log(row[1])
  }
  if (!zyjhs[zydm]) {zyjhs[zydm] = {}}
  for (let i = 2; i < row.length; i++) {
    if (!zyjhs[zydm][tableHeader[i]]) { 
      zyjhs[zydm][tableHeader[i]] = row[i] ? row[i] : 0 
    } else {
      zyjhs[zydm][tableHeader[i]] += row[i] ? row[i] : 0
    }

    if (!ssjhs[tableHeader[i]]) {
      ssjhs[tableHeader[i]] = {}
    }
    if (!ssjhs[tableHeader[i]][zydm]) {
      ssjhs[tableHeader[i]][zydm] = row[i] ? row[i] : 0
    } else {
      ssjhs[tableHeader[i]][zydm] += row[i] ? row[i] : 0 
    }
  }
  }

  Object.keys(zyjhs).forEach((zydm, index, a) => {
    let sum = 0
    Object.keys(zyjhs[zydm]).forEach((ssmc, index, a)=>{
      //console.log(`${zydm2zymc[zydm]} 在 ${ssmc} 招收 ${zyjhs[zydm][ssmc]}`)
      sum += zyjhs[zydm][ssmc]
    })
    zyjhs[zydm].amount = sum
  })

  Object.keys(ssjhs).forEach((ssmc, index, a)=>{
    let sum = 0
    Object.keys(ssjhs[ssmc]).forEach((zydm, index, a)=>{
      //console.log(`${ssmc} 招收 ${zydm2zymc[zydm]} ${ssjhs[ssmc][zydm]} 人`)
      sum += ssjhs[ssmc][zydm]
    })
    ssjhs[ssmc].amount = sum
  })

//fs.writeFileSync(`${process.cwd()}/tools/ssjhs.json`, JSON.stringify(ssjhs))
//fs.writeFileSync(`${process.cwd()}/tools/zyjhs.json`, JSON.stringify(zyjhs))

let ssmcList = []
for (let i = 2; i < tableHeader.length; i++) {
  ssmcList.push(tableHeader[i])
}

fs.writeFileSync(`${process.cwd()}/tools/ssmcList.json`, JSON.stringify(ssmcList))