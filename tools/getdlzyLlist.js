const xlsx = require('node-xlsx')
const fs = require('fs')

//当前工作路径
console.log(process.cwd())
srcData = xlsx.parse(`/Users/zhaozhengji/Downloads/测试用/院系和专业\(1\)\(1\).xls`)
srcData = srcData[0]['data']
title = srcData[0]
body = []
srcData.forEach((element,index)=>{
    if((index !== 0)&&element[0]){
        
        console.log(element[0])
        element[0] = element[0].split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")")
        body.push(element[0])
    }
})
fs.writeFileSync(`/Users/zhaozhengji/SEU-EnrollmentDataVisualization/predefined-data/dlzyList.json`,JSON.stringify(body))