const {ipcRenderer} = require('electron')

ipcRenderer.on('set-scale', (_, message) => {
    let scale = message
    console.log(scale)

    $('html').css('transform', `scale(${scale.x}, ${scale.y})`)
    $('html').css('transform-origin','0 0')
} )

ipcRenderer.on('set-pie', (_, message) => {
    setPie1(message.province, message.xb.male, message.xb.female)
    setPie3(message.province, message.mz.hans, message.mz.noHans)
    setPie2(message.province, message.lb.pt, message.lb.ts, message.lb.gjzx, message.lb.art)
    
})

ipcRenderer.on('set-amount', (_, message) => {
    setFinishCount( message.amount )
})

ipcRenderer.on('set-map', (_, message)=>{
    setMap(`${message.drlbmc}`,message.own, message.finished)
    toggleBottom ('rigthMiddleLeft')
})

ipcRenderer.on('set-province-bar', (_, message)=>{
    setProvinceBar(message.finished, message.unfinished)
    toggleBottom ('rigthMiddleLeft')
})

ipcRenderer.on('set-zy-bar', (_, message)=>{
    setZYBar(message.finished, message.unfinished)
    toggleBottom ('rightLeft')
})

ipcRenderer.on('set-history', (_, message) => {
    setHistory(message.title, message.data)
    toggleBottom ('rigthMiddleLeft')
})

ipcRenderer.on('set-rank', (_, message) => {
    setRank(message.type, message.data)
    toggleBottom ('rightLeft')
})
ipcRenderer.on('set-grade',(_,message) =>{
    console.log(message.type)
    console.log(message.data)
    setGrade(message.type)
    toggleBottom ('rightLeft')
})