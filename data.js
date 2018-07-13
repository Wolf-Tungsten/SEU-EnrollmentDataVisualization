const xlsx = require('node-xlsx')

const zydm2zymc = require('./predefined-data/zydm2zymc.json')
const zymc2zydm = require('./predefined-data/zymc2zydm.json')
const ssmcList = require('./predefined-data/ssmc.json').ssmc
const zymcList = require('./predefined-data/zymcList.json').zymc
const drlbmc2drlbdm = require('./predefined-data/drlbmc2drlbdm.json')
const drlbdm2ssmc = require('./predefined-data/drlbdm2ssmc.json')
const ssjhs = require('./predefined-data/ssjhs.json')
const zyjhs = require('./predefined-data/zyjhs.json')

const keyList = ['nf','ssmc','drlbdm','xbmc','mzmc','klmc','cj','zydm']
let srcData

const normalizeSSMC = (ssmc) => {
    let result
    console.log(ssmcList)
    ssmcList.forEach(normal => {
        if (ssmc.indexOf(normal) >= 0) {
            result = normal
        }
    })
    return result
}

const loadData = async (path, ipc) => {
    // 加载原始数据
    srcData = []
    let orginData = xlsx.parse(path)
    let tableHeader = orginData[0].data[0]
    orginData[0].data.forEach((row, index, arr) => {
        if (index !== 0 && row[0] == 2018) { // 只导入2018年
            let item = {}
            keyList.forEach(careKey => {
                item[careKey] = row[tableHeader.indexOf(careKey)]
            })
            item.ssmc = normalizeSSMC(item.ssmc) //省市名称规整
            console.log(item)
            srcData.push(item)
        }
    })
    // 开始初始数据渲染
    ipc('set-amount', {amount:srcData.length})
    setPie('qg', '全国', ipc)
    await setZYBar(ipc)
    setMap('理', ipc)
    setProvinceBar(ipc)
    
}

const setPie = async (type, key, ipc) => {
    key = '' + key // 强制转换字符串
    let xb = {male:0, female:0}
    let wl = {art:0, science:0}
    let mz = {hans:0, noHans:0}
    console.log(key)
    if (type === 'ssmc') {
        srcData.forEach(item => {
            if ( item.ssmc.indexOf(key) >= 0 ) {
                if ( item.xbmc === '男') { xb.male += 1 }
                if ( item.xbmc === '女') { xb.female += 1 }
                if ( item.klmc.indexOf('理') >= 0 ) { wl.science += 1}
                if ( item.klmc.indexOf('文') >= 0 ) { wl.art += 1}
                if ( item.mzmc.indexOf('汉') >= 0 ) { mz.hans += 1 } else { mz.noHans += 1}
            }
        })
    } else if (type === 'zydm') {
        srcData.forEach(item => {
            if ( '' + item.zydm === key ) {
                if ( item.xbmc === '男') { xb.male += 1 }
                if ( item.xbmc === '女') { xb.female += 1 }
                if ( item.klmc.indexOf('理') >= 0 ) { wl.science += 1}
                if ( item.klmc.indexOf('文') >= 0 ) { wl.art += 1}
                if ( item.mzmc.indexOf('汉') >= 0 ) { mz.hans += 1 } else { mz.noHans += 1}
            }
        })
        key = zydm2zymc[key]
    } else {
        srcData.forEach(item => {
            if ( true ) {
                if ( item.xbmc === '男') { xb.male += 1 }
                if ( item.xbmc === '女') { xb.female += 1 }
                if ( item.klmc.indexOf('理') >= 0 ) { wl.science += 1}
                if ( item.klmc.indexOf('文') >= 0 ) { wl.art += 1}
                if ( item.mzmc.indexOf('汉') >= 0 ) { mz.hans += 1 } else { mz.noHans += 1}
            }
        })
    }
    console.log(xb)
    console.log(mz)
    console.log(wl)
    ipc('set-pie', {province: key, xb, mz, wl})
}


const setMap = async (drlbmc, ipc) => {
    let ownMap = {}
    let finishedMap = {}

    let drlbdm = drlbmc2drlbdm[drlbmc]
    // 获取所有涉及该计划的省市
    if ( drlbdm2ssmc[drlbdm] ) {
        Object.keys(drlbdm2ssmc[drlbdm]).forEach ((ssmc)=>{
            if (drlbdm2ssmc[drlbdm][ssmc] > 0) {
                ownMap[ssmc] = 1
            }
        })
    }
    // 遍历数据获取完成情况

    srcData.forEach((item)=>{
        //console.log(drlbdm, item.drlbdm)        
        if (item.drlbdm == drlbdm) {
            finishedMap[item.ssmc] = 1
            ownMap[item.ssmc] = 0
        }
    })
    

    let own = []
    let finished = []

    for (let ssmc in ownMap) {
        if (ownMap[ssmc]) { own.push(ssmc) }
    }
    for (let ssmc in finishedMap) {
        if (finishedMap[ssmc]) { finished.push(ssmc) }
    }

    //console.log('包含该计划但未完成的省市', own)
    //console.log('已完成该计划的省市',finished)

    ipc('set-map', {drlbmc, finished, own})
}

const setProvinceBar = async(ipc) => {
    let unfinished = {}
    let finished = {}
    Object.keys(zymc2zydm).forEach((zymc) => {
        unfinished[zymc] = []
        finished[zymc] = []
    })
    Object.keys(zydm2zymc).forEach((zydm)=>{
        let zymc = zydm2zymc[zydm]
        ssmcList.forEach( (ssmc) => {
            let finishedList = srcData.filter( (item, index, array) => {
                return item.ssmc === ssmc && item.zydm === zydm
            })
            finished[zymc].push(finishedList.length)
            let amount = ssjhs[ssmc][zydm]
            if (amount) {
                unfinished[zymc].push(finishedList.length - amount)
            } else {
                unfinished[zymc].push(0)
            }
        })
    })
    ipc('set-province-bar', {finished, unfinished})
}

const setZYBar = async(ipc) => {
    let unfinished = {}
    let finished = {}
    
    ssmcList.forEach ( (ssmc) => {
        unfinished[ssmc] = []
        finished[ssmc] = []
    })

    ssmcList.forEach ( (ssmc) => {
        zymcList.forEach ((zymc) => {
            if (zymc.indexOf('预科班') === -1) {
            let zydm = zymc2zydm[zymc]
           
            let finishedList = srcData.filter( (item, index, array) => {
                return item.ssmc === ssmc && item.zydm === zydm
            })
            let amount = zyjhs[zydm][ssmc]
            finished[ssmc].push(finishedList.length)
            if (amount) {
                unfinished[ssmc].push(finishedList.length - amount)
            } else {
                unfinished[ssmc].push(0)
            }
        }
        })
    })
    ipc('set-zy-bar', {finished, unfinished})
}
module.exports = { loadData, setPie, setMap, setProvinceBar ,setZYBar}

