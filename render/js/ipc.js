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