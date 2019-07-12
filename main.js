const { app, BrowserWindow, globalShortcut, ipcMain, Menu } = require('electron')
const { loadData, setPie, setMap, setProvinceBar, setZYBar, setHistory, setRank, setGrade,setCollegeBar} = require('./data')

const ssmcList = require('./predefined-data/ssmc.json').ssmc
const zymcList = Object.keys(require('./predefined-data/zymc2zydm.json'))
const drlbmcList = Object.keys(require('./predefined-data/drlbmc2drlbdm.json'))
const zymc2zydm = require('./predefined-data/zymc2zydm.json')
const dlzyList = require('./predefined-data/dlzyList.json')
const collegeList = require('./predefined-data/collegeList.json')

app.setName("招生录取数据可视化")
let displayWindow
let ipc
require('electron-reload')(__dirname);

function createWindow() {
  // Create the browser window.
  displayWindow = new BrowserWindow({ resizable: false, frame: false, width: 1920, height: 1080, x: -1920, y: 0, enableLargerThanScreen: true, webPreferences: { nodeIntegration: true } })
  monitorWindow = new BrowserWindow({ title: '招生录取数据可视化', resizable: false, frame: true, width: 1536, minHeight: 580, height: 580, useContentSize: true, enableLargerThanScreen: true, webPreferences: { nodeIntegration: true } })
  // and load the index.html of the app.
  displayWindow.loadFile('./render/index.html')
  monitorWindow.loadFile('./render/index.html')

  displayWindow.webContents.on('did-finish-load', () => {
    displayWindow.webContents.send('set-scale', { x: 1, y: 1.5 })
  })

  monitorWindow.webContents.on('did-finish-load', () => {
    monitorWindow.webContents.send('set-scale', { x: 0.8, y: 0.8 })
  })

  // Open the DevTools.
  monitorWindow.webContents.openDevTools()

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

  let submenu1 = [{
    label: '全国|全专业', role: '全国|全专业',
    click: (a, b, c) => { setPie('qg', '全国', ipc) }
  }, { type: 'separator' }]


  ssmcList.forEach(element => {
    submenu1.push({
      label: element,
      role: element,
      click: (a, b, c) => {
        setPie('ssmc', element, ipc)
      }
    })
  })
  submenu1.push({ type: 'separator' })
  //将专业名称改为大类专业
  dlzyList.forEach(element => {
    submenu1.push({
      label: element,
      role: element,
      click: (a, b, c) => {
        setPie('dlzy', element, ipc)
      }
    })
  })

  let submenu2 = []
  drlbmcList.forEach(element => {
    submenu2.push({
      label: element,
      role: element,
      click: (a, b, c) => {
        setMap(element, ipc)
      }
    })
  })

  let submenu3 = []
  let historyType = ['985高校排名', '录取线', '录取线超本一线分值', '录取线省排名']
  ssmcList.forEach(ssmc => {
    submenu3.push({
      label: ssmc,
      role: ssmc,
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
  
  subCollege = collegeList
  subSubMenu = []
  subCollege.forEach(college =>{
    subSubMenu.push({
      label:college,
      click: (a, b, c) =>{
        setCollegeBar(college, ipc)
      }
    })
  })

  
  let submenu4 = []
  let rankType = ['985高校排名', '文史类录取线', '理工类录取线', '文史类录取线超本一线分值', '理工类录取线超本一线分值', '文史类录取线省排名', '理工类录取线省排名']
  rankType.forEach((type) => {
    submenu4.push({
      label: type,
      click: (a, b, c) => {
        setRank(type, ipc)
      }
    })
  })

  let submenu5 = []
  //大类专业
  dlzyList.forEach((type)=>{
    submenu5.push({
      label:type,
      click: (a, b, c) => {
        setGrade(type, ipc)
      }
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
          click: async (a, b, c) => { await setProvinceBar(ipc) }
        },
        {
          label: '专业视图',
          role: '专业视图',
          click: async (a, b, c) => { await setZYBar(ipc) }
        },
        {
          label:'学院视图',
          role:'学院视图',
          click: async (a, b, c) => { await setCollegeBar(ipc) }
        }
      ]
    },
    {
      label: '各省市指标趋势',
      submenu: submenu3
    },
    {
      label: '指标省市视图',
      submenu: submenu4
    },
    {
      label: '成绩分布视图',
      submenu: submenu5
    },
    {
      label: '自动切换',
      submenu: [{
        label: '打开自动切换',
        role: '打开自动切换',
        click: (a,b,c) => {
          console.log('自动切换')
          displayWindow.webContents.send("Turn-on-automatic-switching",null)
          monitorWindow.webContents.send("Turn-on-automatic-switching",null)
        }

      },{
        label: '关闭自动切换',
        role: '关闭自动切换',
        click:  (a,b,c) => {
          console.log('关闭切换')
          displayWindow.webContents.send("Turn-off-automatic-switching",null)
          monitorWindow.webContents.send("Turn-off-automatic-switching",null)
        }
      }]
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  monitorWindow.setMenu(menu)
  Menu.setApplicationMenu(menu)

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
