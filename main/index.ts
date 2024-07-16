import { BrowserWindow, app, protocol } from 'electron'
import isDev from 'electron-is-dev'
import { resolve, normalize } from 'path'
import registerService from './ipc'
import Channel from './interface/channel'
import { initDirectory } from './utils/init'
function createWindow() {
  const window: BrowserWindow = new BrowserWindow({
    alwaysOnTop: false,
    height: 800,
    width: 1200,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: resolve(__dirname, './preload/index.js'),
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: true,
    },
  })
  Channel.mainWindow = window
  registerService()
  if (isDev) {
    initDirectory()
    window.webContents.openDevTools()
    window.loadURL('http://localhost:8889')
  } else {
    window.loadFile(resolve(__dirname, '../render/dist/index.html'))
  }
  return window
}
function registerProtocol() {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substring(7)

    callback(decodeURI(normalize(url.split('?')[0])))
  })
}
app.dock.setIcon(resolve(__dirname, '../assets/icons.iconset/icon_512x512.png'))
app.on('ready', () => {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' //关闭web安全警告
})
app.whenReady().then(() => {
  app.getAppPath()

  createWindow()
  // 这个需要在app.ready触发之后使用
  registerProtocol()
})
