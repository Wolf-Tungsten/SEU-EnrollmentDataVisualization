const xlsx = require('node-xlsx')

const keyList = ['nf','ssmc','drlbdm','xbmc','mzmc','klmc','cj','zydm']
let srcData
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
            console.log(item)
            srcData.push(item)
        }
    })
}

const setPie = async (type, key, ipc) => {
    key = '' + key // 强制转换字符串
    let xb = {male:0, female:0}
    let wl = {art:0, science:0}
    let mz = {}
    console.log(key)
    if (type === 'ssmc') {
        srcData.forEach(item => {
            if ( item.ssmc.indexOf(key) >= 0 ) {
                if ( item.xbmc === '男') { xb.male += 1 }
                if ( item.xbmc === '女') { xb.female += 1 }
                if ( item.klmc.indexOf('理') >= 0 ) { wl.science += 1}
                if ( item.klmc.indexOf('文') >= 0 ) { wl.art += 1}
                let mzmc = item.mzmc
                if ( !mz[mzmc] ) {
                    mz[mzmc] = 0
                }
                mz[mzmc] += 1
            }
        })
    } else if (type === 'zydm') {
        srcData.forEach(item => {
            if ( '' + item.zydm === key ) {
                if ( item.xbmc === '男') { xb.male += 1 }
                if ( item.xbmc === '女') { xb.female += 1 }
                if ( item.klmc.indexOf('理') >= 0 ) { wl.science += 1}
                if ( item.klmc.indexOf('文') >= 0 ) { wl.art += 1}
                let mzmc = item.mzmc
                if ( !mz[mzmc] ) {
                    mz[mzmc] = 0
                }
                mz[mzmc] += 1
            }
        })
    } else {
        srcData.forEach(item => {
            if ( true ) {
                if ( item.xbmc === '男') { xb.male += 1 }
                if ( item.xbmc === '女') { xb.female += 1 }
                if ( item.klmc.indexOf('理') >= 0 ) { wl.science += 1}
                if ( item.klmc.indexOf('文') >= 0 ) { wl.art += 1}
                let mzmc = item.mzmc
                if ( !mz[mzmc] ) {
                    mz[mzmc] = 0
                }
                mz[mzmc] += 1
            }
        })
    }
    console.log(xb)
    console.log(mz)
    console.log(wl)
}

module.exports = { loadData, setPie }

