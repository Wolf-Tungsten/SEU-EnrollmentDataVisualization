const xlsx = require('node-xlsx')

const zydm2zymc = require('./predefined-data/zydm2zymc.json')
const zymc2zydm = require('./predefined-data/zymc2zydm.json')
const ssmcList = require('./predefined-data/ssmc.json').ssmc
const zymcList = require('./predefined-data/zymcList.json').zymc
const drlbmc2drlbdm = require('./predefined-data/drlbmc2drlbdm.json')
const drlbdm2ssmc = require('./predefined-data/drlbdm2ssmc.json')
const ssjhs = require('./predefined-data/ssjhs.json')
const zyjhs = require('./predefined-data/zyjhs.json')
const lbList = require('./predefined-data/drlbdm2lb.json')
//const history = require('./predefined-data/history.json')

const keyList = ['nf', 'ssmc', 'drlbdm', 'xbmc', 'mzmc', 'klmc', 'cj', 'zydm']
let srcData
let historyData
const normalizeSSMC = (ssmc) => {
    let result
    ssmcList.forEach(normal => {
        if (ssmc.indexOf(normal) >= 0) {
            result = normal
        }
    })
    return result
}

const loadData = async (path, ipc) => {
    // 加载原始数据
    console.log("!!!!!")
    let orginData = xlsx.parse(path)
    if (orginData[0].data[0][0] === 'nf') {
        // 导入的是本年度录取数据
        console.log('本年度数据')
        srcData = []
        let tableHeader = orginData[0].data[0]
        orginData[0].data.forEach((row, index, arr) => {
            if (index !== 0 && row[0] == 2018) { // 只导入2018年
                let item = {}
                keyList.forEach(careKey => {
                    item[careKey] = row[tableHeader.indexOf(careKey)]
                })
                item.ssmc = normalizeSSMC(item.ssmc) //省市名称规整
                //console.log(item)
                srcData.push(item)
            }
        })
        //console.log(srcData.length)
        //console.log(srcData[0])
        // 开始初始数据渲染
        ipc('set-amount', { amount: srcData.length })
        setPie('qg', '全国', ipc)
        await setZYBar(ipc)
        setMap('理', ipc)
        setProvinceBar(ipc)
    } else {
        // 导入的是历史数据
        console.log('历史数据')
        historyData = {}
        orginData[0].data.forEach((row, index, arr) => {
            if (index > 1) {
                //console.log(row)
                let ssmc = normalizeSSMC(row[1])
                //console.log(ssmc)
                if (!historyData[ssmc]) {
                historyData[ssmc] = {
                    '985高校排名': [],
                    '文史类录取线': [],
                    '文史类超本一线分数': [],
                    '文史类录取线省排名': [],
                    '理工类录取线': [],
                    '理工类超本一线分数': [],
                    '理工类录取线省排名': [],
                }
                }
                let type = ['985高校排名',
                    '文史类录取线',
                    '文史类超本一线分数',
                    '文史类录取线省排名',
                    '理工类录取线',
                    '理工类超本一线分数',
                    '理工类录取线省排名']
                type.forEach((e, i, a) => {
                    historyData[ssmc][e].push(row[i + 2] ? row[i + 2] : null)
                })
            }
        })
        setHistory('江苏', '985高校排名', ipc)
    }
}

const setHistory = async (ssmc, type, ipc) => {
    let title = `${ssmc}${type}近五年(2014-2018)趋势`
    let data = {}
    switch (type) {
        case '985高校排名':
            data['985高校排名'] = historyData[ssmc]['985高校排名']
            break
        case '录取线':
            data['文史类'] = historyData[ssmc]['文史类录取线']
            data['理工类'] = historyData[ssmc]['理工类录取线']
            break
        case '录取线超本一线分值':
            data['文史类'] = historyData[ssmc]['文史类超本一线分数']
            data['理工类'] = historyData[ssmc]['理工类超本一线分数']
            break
        case '录取线省排名':
            data['文史类'] = historyData[ssmc]['文史类录取线省排名']
            data['理工类'] = historyData[ssmc]['理工类录取线省排名']
            break
    }
    //console.log(data)
    ipc('set-history', { title, data })
}

const setRank = async (type, ipc) => {
    let data = []
    ssmcList.forEach((ssmc) => {
        let provinceData = {}
        switch (type) {
            case '985高校排名':
                provinceData[ssmc] = historyData[ssmc]['985高校排名']
                break
            case '文史类录取线':
                provinceData[ssmc] = historyData[ssmc]['文史类录取线']
                break
            case '理工类录取线':
                provinceData[ssmc] = historyData[ssmc]['理工类录取线']
                break
            case '文史类录取线超本一线分值':
                provinceData[ssmc] = historyData[ssmc]['文史类超本一线分数']
                break
            case '理工类录取线超本一线分值':
                provinceData[ssmc] = historyData[ssmc]['理工类超本一线分数']
                break
            case '文史类录取线省排名':
                provinceData[ssmc] = historyData[ssmc]['文史类录取线省排名']
                break
            case '理工类录取线省排名':
                provinceData[ssmc] = historyData[ssmc]['理工类录取线省排名']
                break
        }
        data.push(provinceData)
    })
    ipc('set-rank', { type, data })
}

const setPie = async (type, key, ipc) => {
    key = '' + key // 强制转换字符串
    let xb = { male: 0, female: 0 }
    //pt 普通类  ts 特殊类  gjzx 国家专项 art 艺术类  
    let lb = { pt: 0, ts: 0, gjzx: 0, art: 0 }
    let mz = { hans: 0, noHans: 0 }
    //console.log(lbList[])
    //console.log(key)
    if (type === 'ssmc') {
        srcData.forEach(item => {
            if (item.ssmc.indexOf(key) >= 0) {
                if (item.xbmc === '男') { xb.male += 1 }
                if (item.xbmc === '女') { xb.female += 1 }

                if (lbList[''+item.drlbdm] === '普通类') {
                    lb.pt += 1
                } else if (lbList[''+item.drlbdm] === '艺术类') {
                    lb.art += 1
                } else if (lbList[''+item.drlbdm] === '国家专项') {
                    lb.gjzx += 1
                } else { lb.ts += 1 }

                if (item.mzmc.indexOf('汉') >= 0) { mz.hans += 1 } else { mz.noHans += 1 }
            }
        })
    } else if (type === 'zydm') {
        srcData.forEach(item => {
            if ('' + item.zydm === key) {
                if (item.xbmc === '男') { xb.male += 1 }
                if (item.xbmc === '女') { xb.female += 1 }
                if (lbList[''+item.drlbdm] === '普通类') {
                    lb.pt += 1
                } else if (lbList[''+item.drlbdm] === '艺术类') {
                    lb.art += 1
                } else if (lbList[''+item.drlbdm] === '国家专项') {
                    lb.gjzx += 1
                } else { lb.ts += 1 }
                if (item.mzmc.indexOf('汉') >= 0) { mz.hans += 1 } else { mz.noHans += 1 }
            }
        })
        key = zydm2zymc[key]
    } else {
        srcData.forEach(item => {
            if (true) {
                if (item.xbmc === '男') { xb.male += 1 }
                if (item.xbmc === '女') { xb.female += 1 }
                if (lbList[''+item.drlbdm] === '普通类') {
                    lb.pt += 1
                } else if (lbList[''+item.drlbdm] === '艺术类') {
                    lb.art += 1
                } else if (lbList[''+item.drlbdm] === '国家专项') {
                    lb.gjzx += 1
                } else { lb.ts += 1 }
                if (item.mzmc.indexOf('汉') >= 0) { mz.hans += 1 } else { mz.noHans += 1 }
            }
        })
    }
    //console.log(xb)
    //console.log(mz)
    //console.log(lb)
    ipc('set-pie', { province: key, xb, mz, lb })
}


const setMap = async (drlbmc, ipc) => {
    let ownMap = {}
    let finishedMap = {}

    let drlbdm = drlbmc2drlbdm[drlbmc]
    // 获取所有涉及该计划的省市
    if (drlbdm2ssmc[drlbdm]) {
        Object.keys(drlbdm2ssmc[drlbdm]).forEach((ssmc) => {
            if (drlbdm2ssmc[drlbdm][ssmc] > 0) {
                ownMap[ssmc] = 1
            }
        })
    }
    // 遍历数据获取完成情况

    srcData.forEach((item) => {
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

    ipc('set-map', { drlbmc, finished, own })
}

const setProvinceBar = async (ipc) => {
    let unfinished = { '未完成': [] }
    let finished = { '已完成': [] }
    // Object.keys(zymc2zydm).forEach((zymc) => {
    //     unfinished[zymc] = []
    //     finished[zymc] = []
    // })
    // Object.keys(zydm2zymc).forEach((zydm)=>{
    //     let zymc = zydm2zymc[zydm]
    //     ssmcList.forEach( (ssmc) => {
    //         let finishedList = srcData.filter( (item, index, array) => {
    //             return item.ssmc === ssmc && item.zydm === zydm
    //         })
    //         finished[zymc].push(finishedList.length)
    //         let amount = ssjhs[ssmc][zydm]
    //         if (amount) {
    //             unfinished[zymc].push(finishedList.length - amount)
    //         } else {
    //             unfinished[zymc].push(0)
    //         }
    //     })
    // })
    ssmcList.forEach((ssmc) => {
        let amount = ssjhs[ssmc].amount
        let count = srcData.filter((item, index, value) => {
            return item.ssmc === ssmc
        }).length
        let unfinishedCount = amount - count > 0 ? amount - count : 0
        finished['已完成'].push(count)
        unfinished['未完成'].push(unfinishedCount)
    })
    ipc('set-province-bar', { finished, unfinished })
}

const setZYBar = async (ipc) => {
    let unfinished = { '未完成': [] }
    let finished = { '已完成': [] }

    // ssmcList.forEach ( (ssmc) => {
    //     unfinished[ssmc] = []
    //     finished[ssmc] = []
    // })

    // ssmcList.forEach ( (ssmc) => {
    //     zymcList.forEach ((zymc) => {
    //         if (zymc.indexOf('预科班') === -1) {
    //         let zydm = zymc2zydm[zymc]

    //         let finishedList = srcData.filter( (item, index, array) => {
    //             return item.ssmc === ssmc && item.zydm === zydm
    //         })
    //         let amount = zyjhs[zydm][ssmc]
    //         finished[ssmc].push(finishedList.length)
    //         if (amount) {
    //             unfinished[ssmc].push(finishedList.length - amount)
    //         } else {
    //             unfinished[ssmc].push(0)
    //         }
    //     }
    //     })
    // })

    zymcList.forEach((zymc) => {
        if (zymc.indexOf('预科班') === -1) {
            let zydm = zymc2zydm[zymc]
            let amount = zyjhs[zydm].amount
            let finishedCount = srcData.filter((item, index, array) => {
                return item.zydm === zydm
            }).length
            let unfinishedCount = amount - finishedCount > 0 ? amount - finishedCount : 0
            finished['已完成'].push(finishedCount)
            unfinished['未完成'].push(unfinishedCount)
        }
    })
    ipc('set-zy-bar', { finished, unfinished })
}

const setGrade = async (type,ipc) =>{

    //数据处理
    data = 0
    ipc('set-grade',{type,data})
}

module.exports = { loadData, setPie, setMap, setProvinceBar, setZYBar, setHistory, setRank, setGrade }

