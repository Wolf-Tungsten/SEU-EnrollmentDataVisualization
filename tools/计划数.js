const xlsx = require('node-xlsx')
const fs = require('fs')
let ssmcList = require('../predefined-data/ssmc.json')['ssmc']
let  dlzyList = require('../predefined-data/dlzyList.json')

//dlzyList去空格，中文括号转变为英文括号
dlzyList = dlzyList.map(element => element.split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")") ) 
ssmcList = ssmcList.map(element => element.split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")") ) 


let srcData = xlsx.parse(`/Users/zhaozhengji/Downloads/公布计划\(3\)\(1\).xls`)

let zyjhs = {} // 专业计划数
let amountforzyjhs = [] //总数
dlzyList.forEach(element => {
  zyjhs[element] = {}
})
//console.log(zyjhs)
let ssjhs = {} // 省市计划数
let amountForssjhs = [] 
ssmcList.forEach(element => {
  ssjhs[element] = {}
});

let tableHeader = srcData[0].data[0]
let body = srcData[0].data

//zyjhs
body.forEach((dlzy,index)=>{
  if(index !==0 ){
    dlzy[0]= dlzy[0].split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")")
    let temp = zyjhs[dlzy[0]]
    dlzy.forEach((number,index2) =>{
      if(index2 !== 0){
        if(temp[tableHeader[index2]] !== undefined){
          temp[tableHeader[index2]] += ((number) === undefined ? 0: number)
          
        }else{
          temp[tableHeader[index2]] = parseInt(temp[tableHeader[index2]])
          temp[tableHeader[index2]] = ((number) === undefined ? 0: number)
          
        }
      }
    })
    zyjhs[dlzy[0]] = temp
  }
})


//ssjhs
ssmcList.forEach((ssmc,index)=>{
  let temp = ssjhs[ssmc]
  body.forEach((ele,index2)=>{
    if(index2 !== 0){
      if(temp[ele[0]] === undefined){
        temp[ele[0]] = ele[index+1] === undefined ? 0: ele[index+1]
      }else{
        
        temp[ele[0]] += ele[index+1] === undefined ? 0: ele[index+1]
        temp[ele[0]] = parseInt(temp[ele[0]])
      }
    }
  })
})

//计算总和

dlzyList.forEach(dlzy=>{
  let amount = 0
  ssmcList.forEach(ssmc=>{
    if(zyjhs[dlzy][ssmc] === '0'){
      zyjhs[dlzy][ssmc] = 0
    }
    amount += zyjhs[dlzy][ssmc]
  })
  zyjhs[dlzy]['amount'] = amount
})
fs.writeFileSync(`/Users/zhaozhengji/SEU-EnrollmentDataVisualization/predefined-data/zyjhs.json`,JSON.stringify(zyjhs))

ssmcList.forEach(ssmc=>{
  let amount = 0
  dlzyList.forEach(dlzy=>{
    if(ssjhs[ssmc][dlzy] === '0'){
      ssjhs[ssmc][dlzy] = 0
    }
    amount += ssjhs[ssmc][dlzy]
  })
  ssjhs[ssmc]['amount'] = amount
})

fs.writeFileSync(`/Users/zhaozhengji/SEU-EnrollmentDataVisualization/predefined-data/ssjhs.json`,JSON.stringify(ssjhs))