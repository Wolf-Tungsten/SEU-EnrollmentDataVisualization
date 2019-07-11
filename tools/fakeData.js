const xlsx = require('node-xlsx')
const fs = require('fs')
const dlzyList = require('../predefined-data/dlzyList.json')

srcData = xlsx.parse(`/Users/zhaozhengji/Downloads/显示测试数据的副本.xls`)
src = srcData[0]['data']
title = src[0]
zymcIndex = title.indexOf('zymc')
amounOfdlzyList = dlzyList.length
src.forEach((ele,index) => {
    if(index != 0){
        var indexFordlzy = 0 + Math.round(Math.random()*amounOfdlzyList)
        console.log(indexFordlzy)
        indexFordlzy = indexFordlzy > 19 ? 19 :indexFordlzy
        ele[zymcIndex] = dlzyList[indexFordlzy]
        console.log(ele[zymcIndex])
    }
});
fakeData = [];
src.forEach(Element=>{
    fakeData.push(Element)
})

buffer = xlsx.build([
    {
        name:'Sheet1',
        data:fakeData
    }
])

fs.writeFileSync('/Users/zhaozhengji/Downloads/显示测试数据的副本_假数据.xls',buffer,{'flag':'w'});