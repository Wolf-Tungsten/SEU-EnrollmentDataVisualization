const xlsx = require('node-xlsx')
const fs = require('fs')

//当前工作路径
console.log(process.cwd())
srcData = xlsx.parse(`/Users/zhaozhengji/Downloads/测试用/院系和专业\(1\)\(1\).xls`)
srcData = srcData[0]['data']
title = srcData[0]
srcBody = []
srcData.forEach((element,index)=>{
    if((index != 0)&&element[2]){
        srcBody.push(element[2])
    }
})
body = []
checkRepeat = {}

srcBody.forEach(element=>{
    if(checkRepeat[element]!==true){
        checkRepeat[element] = true
        body.push(element)
    }
})

fs.writeFileSync(`/Users/zhaozhengji/SEU-EnrollmentDataVisualization/predefined-data/collegeList.json`,JSON.stringify(body))