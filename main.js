// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron')
const {loadData} = require('./data')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let displayWindow
let ipc
require('electron-reload')(__dirname);

function createWindow () {
  // Create the browser window.
  displayWindow = new BrowserWindow({ resizable:false, frame: false ,width: 1920, height: 1080, x:0, y:0, enableLargerThanScreen:true})
  monitorWindow = new BrowserWindow({ title:'招生录取数据可视化', resizable:false, frame: true ,width:965,  height:400 , x:20, y:20, enableLargerThanScreen:true})
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
