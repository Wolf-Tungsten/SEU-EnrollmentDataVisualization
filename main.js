const {app, BrowserWindow, globalShortcut, ipcMain, Menu} = require('electron')
const {loadData, setPie, setMap, setProvinceBar, setZYBar, setHistory} = require('./data')

const ssmcList = require('./predefined-data/ssmc.json').ssmc
const zymcList = Object.keys(require('./predefined-data/zymc2zydm.json'))
const drlbmcList = Object.keys(require('./predefined-data/drlbmc2drlbdm.json'))
const zymc2zydm = require('./predefined-data/zymc2zydm.json')

app.setName("招生录取数据可视化")
let mainWindow
let displayWindow
let ipc
require('electron-reload')(__dirname);

function createWindow () {
  // Create the browser window.
  displayWindow = new BrowserWindow({ resizable:false, frame: false ,width: 1920, height: 1080, x:0, y:0, enableLargerThanScreen:true})
  monitorWindow = new BrowserWindow({ title:'招生录取数据可视化', resizable:false, frame: true ,width:960,  minHeight:370, height:370,useContentSize:true , x:20, y:20, enableLargerThanScreen:true})
  // and load the index.html of the app.
  displayWindow.loadFile('./render/index.html')
  monitorWindow.loadFile('./render/index.html')

  displayWindow.webContents.on('did-finish-load', () => {
    displayWindow.webContents.send('set-scale', {x:1, y:1.5})
  })

  monitorWindow.webContents.on('did-finish-load', () => {
    monitorWindow.webContents.send('set-scale', {x:0.5, y:0.5})
  })
  
  // Open the DevTools.
  //monitorWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  displayWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    displayWindow = null
  })

  monitorWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    monitorWindow = null
  })

  ipc = (name, message) => {
    displayWindow.webContents.send(name, message)
    monitorWindow.webContents.send(name, message)
  }
}

function createMenu() {

  let submenu1 = [{label:'全国|全专业' ,role: '全国|全专业', 
  click:(a,b,c) => {setPie('qg','全国',ipc)}
},{type: 'separator'}]
  ssmcList.forEach(element => {
    submenu1.push({
      label:element,
      role:element,
      click:(a, b, c) => {
        setPie('ssmc', element, ipc)
      }
    })
  })
  submenu1.push({type: 'separator'})
  zymcList.forEach(element => {
    submenu1.push({
      label:element,
      role:element,
      click:(a, b, c) => {
        setPie('zydm', zymc2zydm[element], ipc)
      }
    })
  })

  let submenu2 = []
  drlbmcList.forEach(element => {
    submenu2.push({
      label:element,
      role:element,
      click:(a, b, c) => {
        setMap(element, ipc)
      }
    })
  })

  let submenu3 = []
  let historyType = ['985高校排名','录取线','录取线超本一线分值','录取线省排名']
  ssmcList.forEach( ssmc => {
    submenu3.push({
      label:ssmc,
      role:ssmc,
      submenu: historyType.map((type, index, array) => {
        return {
          label: type,
          click: (a, b, c) => {
            setHistory(ssmc, type, ipc)
          }
        }
      })
    })
  })
  const template = [
    {
      label: '环状图切片',
      submenu: submenu1
    },
    {
      label: '地图导入类别',
      submenu: submenu2
    },
    {
      label: '进度柱状图',
      submenu: [
        {
          label: '省市视图',
          role: '省市视图',
          click:async (a,b,c) => { await setProvinceBar(ipc)}
        },
        {
          label: '专业视图',
          role: '专业视图',
          click:async (a,b,c) => { await setZYBar(ipc)}
        }
      ]
    },
    {
      label: '各省市指标趋势',
      submenu: submenu3
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  monitorWindow.setMenu(menu)


}

function setListener() {
    ipcMain.on('import-data', (_, path) => {
      loadData(path, ipc)
    })
}

function onReady() {
  // 主进程入口
  createWindow()
  // 设置监听器
  setListener()
  // 设置菜单
  createMenu()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onReady)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (displayWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
