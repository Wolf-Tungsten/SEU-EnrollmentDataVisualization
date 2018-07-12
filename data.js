const dialog = require('electron').dialog
const xlsx = require('node-xlsx')

const loadData = () => {
    dialog.showOpenDialog({
        title: '选择数据xlsx文件',
        filters: ['xlsx'],
        properties: ['openFile']
    }, async (filePath) => {
        if (filePath) {
            
        }
    })
}

module.exports = { loadData }

