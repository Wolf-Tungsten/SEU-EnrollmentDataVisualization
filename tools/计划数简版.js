const xlsx = require('node-xlsx')
const fs = require('fs')
let ssjhs = require('../predefined-data/ssjhs.json')
let  zyjhs = require('../predefined-data/zyjhs.json')

let ssmcList = require('../predefined-data/ssmc.json')['ssmc']
let dlzyList = require('../predefined-data/dlzyList.json')

//dlzyList去空格，中文括号转变为英文括号
dlzyList = dlzyList.map(element => element.split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")") ) 
ssmcList = ssmcList.map(element => element.split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")") ) 

let ssjhsSimple = {}
let zyjhsSimple = {}

ssmcList.forEach(ssmc => {
    ssjhsSimple[""+ssmc] = ssjhs[ssmc]['amount']
});

dlzyList.forEach(dlzy =>{
    zyjhsSimple[dlzy] = zyjhs[dlzy]['amount']
})


fs.writeFileSync(`/Users/zhaozhengji/SEU-EnrollmentDataVisualization/predefined-data/zyjhsSimple.json`,JSON.stringify(zyjhsSimple))
fs.writeFileSync(`/Users/zhaozhengji/SEU-EnrollmentDataVisualization/predefined-data/ssjhsSimple.json`,JSON.stringify(ssjhsSimple))
console.log(ssjhsSimple)
console.log(zyjhsSimple)