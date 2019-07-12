const xlsx = require('node-xlsx')

const zydm2zymc = require('./predefined-data/zydm2zymc.json')
const zymc2zydm = require('./predefined-data/zymc2zydm.json')
const ssmcList = require('./predefined-data/ssmc.json').ssmc
const dlzyList = require('./predefined-data/dlzyList.json')
const drlbmc2drlbdm = require('./predefined-data/drlbmc2drlbdm.json')
const drlbdm2ssmc = require('./predefined-data/drlbdm2ssmc.json')
const ssjhs = require('./predefined-data/ssjhs.json')
const zyjhs = require('./predefined-data/zyjhs.json')
const lbList = require('./predefined-data/drlbdm2lb.json')
const drlbdm2lb = require('./predefined-data/drlbdm2lb.json')
const collegeList = require('./predefined-data/collegeList.json')
const xyjhs = require('./predefined-data/xyjhs.json')
//const history = require('./predefined-data/history.json')

const keyList = ['nf', 'ssmc', 'drlbdm', 'xbmc', 'mzmc', 'klmc', 'cj', 'zymc', 'yxmc']
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
            if (index !== 0 && row[0] == 2019) { // 只导入2019年
                let item = {}
                keyList.forEach(careKey => {
                    item[careKey] = row[tableHeader.indexOf(careKey)]
                })
                item.ssmc = normalizeSSMC(item.ssmc) //省市名称规整
              
                srcData.push(item)
            }
        })
        //console.log(srcData)
        //console.log(srcData.length)
        console.log(srcData[0])
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
        console.log(historyData)
        setHistory('江苏', '985高校排名', ipc)
    }
}

const setHistory = async (ssmc, type, ipc) => {
    let title = `${ssmc}${type}近五年(2014-2019)趋势`
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

                if (lbList['' + item.drlbdm] === '普通类') {
                    lb.pt += 1
                } else if (lbList['' + item.drlbdm] === '艺术类') {
                    lb.art += 1
                } else if (lbList['' + item.drlbdm] === '国家专项') {
                    lb.gjzx += 1
                } else { lb.ts += 1 }

                if (item.mzmc.indexOf('汉') >= 0) { mz.hans += 1 } else { mz.noHans += 1 }
            }
        })
    } else if (type === 'dlzy') {
        srcData.forEach(item => {
            if ('' + item.zymc === key) {
                if (item.xbmc === '男') { xb.male += 1 }
                if (item.xbmc === '女') { xb.female += 1 }
                if (lbList['' + item.drlbdm] === '普通类') {
                    lb.pt += 1
                } else if (lbList['' + item.drlbdm] === '艺术类') {
                    lb.art += 1
                } else if (lbList['' + item.drlbdm] === '国家专项') {
                    lb.gjzx += 1
                } else { lb.ts += 1 }
                if (item.mzmc.indexOf('汉') >= 0) { mz.hans += 1 } else { mz.noHans += 1 }
            }
        })
        //key = zydm2zymc[key]
    } else {
        srcData.forEach(item => {
            if (true) {
                if (item.xbmc === '男') { xb.male += 1 }
                if (item.xbmc === '女') { xb.female += 1 }
                if (lbList['' + item.drlbdm] === '普通类') {
                    lb.pt += 1
                } else if (lbList['' + item.drlbdm] === '艺术类') {
                    lb.art += 1
                } else if (lbList['' + item.drlbdm] === '国家专项') {
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

    ssmcList.forEach((ssmc) => {
        let amount = ssjhs[ssmc]['amount']
        let count = srcData.filter((item, index, value) => {
            //根据省份，和导入代码进行过滤
            return (item.ssmc === ssmc && drlbdm2lb[item.drlbdm] === "普通类")
        }).length
        
        let unfinishedCount = amount - count 
        finished['已完成'].push(count)
        unfinished['未完成'].push(unfinishedCount)
    })
    ipc('set-province-bar', { finished, unfinished })
}

const setZYBar = async (ipc) => {
    let unfinished = { '未完成': [] }
    let finished = { '已完成': [] }


    dlzyList.forEach((zymc) => {
        if (zymc.indexOf('预科班') === -1) {
            let amount = zyjhs[zymc]['amount']
            let finishedCount = srcData.filter((item, index, array) => {
                item.zymc = item.zymc.split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")")
                return item.zymc === zymc && drlbdm2lb[item.drlbdm] === "普通类"
            }).length
            let unfinishedCount = amount - finishedCount 
            finished['已完成'].push(finishedCount)
            unfinished['未完成'].push(unfinishedCount)
        }
    })
    ipc('set-zy-bar', { finished, unfinished })
}
const setCollegeBar = async (ipc) =>{
    let unfinished = { '未完成': [] }
    let finished = { '已完成': [] }

    collegeList.forEach((college) => {
        let amount = xyjhs[college]
        //console.log(college)
        //console.log(amount)
        let finishedCount = srcData.filter((item,index,array)=>{
            return item.yxmc === college
        }).length
        console.log(finishedCount)

        let unfinishedCount = amount - finishedCount  
        finished['已完成'].push(finishedCount)
        unfinished['未完成'].push(unfinishedCount)
    })
    
    ipc('set-college-bar', { finished, unfinished })

}
const setGrade = async (type, ipc) => {
    console.log(type)
    //type 大类专业名称
    data = {}
    //按照省市
    ssmcList.forEach(ele => {
        data[ele] = []
    })
    srcData.forEach(item => {
        //表中数据zymc有空格和中文括号
        if (item['zymc'].split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")") === type) {
            data[item['ssmc']].push(item['cj'])
        }

    })
    
    //获取省市的最大最小成绩
    maxGrade = {}
    minGrade = {}

    ssmcList.forEach(ele =>{
        maxGrade[ele] = 0
        minGrade[ele] = 100000
    })

    srcData.forEach(item =>{
        //去空格，去中文括号
        item.ssmc = item.ssmc.split(" ").join("").replace( /[（]/g,"(").replace(/[）]/g,")")
        if(maxGrade[item.ssmc] < item.cj){
            maxGrade[item.ssmc] = item.cj
        }
        if(minGrade[item.ssmc] > item.cj){
            minGrade[item.ssmc] = item.cj
        }
    })
    console.log(data)
    //将最大最小成绩加入到data中
    ssmcList.forEach(ssmc =>{
        if(data[ssmc].length !== 0){
            data[ssmc].push(maxGrade[ssmc])
            data[ssmc].push(minGrade[ssmc])
        }
    })
    

    //console.log(maxGrade)
    //console.log(minGrade)
    console.log(data)
    ipc('set-grade', { type, data})
}

module.exports = { loadData, setPie, setMap, setProvinceBar, setZYBar, setHistory, setRank, setGrade,setCollegeBar}

