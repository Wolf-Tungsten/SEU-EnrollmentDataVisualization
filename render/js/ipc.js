const {ipcRenderer} = require('electron')

ipcRenderer.on('set-scale', (_, message) => {
    let scale = message
    console.log(scale)

    $('html').css('transform', `scale(${scale.x}, ${scale.y})`)
    $('html').css('transform-origin','0 0')
} )

ipcRenderer.on('set-pie', (_, message) => {
    setPie1(message.province, message.xb.male, message.xb.female)
    setPie2(message.province, message.wl.art, message.wl.science)
    setPie3(message.province, message.mz.hans, message.mz.noHans)
})

ipcRenderer.on('set-amount', (_, message) => {
    setFinishCount( message.amount )
})

ipcRenderer.on('set-map', (_, message)=>{
    setMap(`导入类别：${message.drlbmc}-`,message.own, message.finished)
    toggleBottom (false)
})

ipcRenderer.on('set-province-bar', (_, message)=>{
    setProvinceBar(message.finished, message.unfinished)
    toggleBottom (false)
})