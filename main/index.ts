import { BrowserWindow, app, protocol } from 'electron'
import isDev from 'electron-is-dev'
import { resolve, normalize } from 'path'
import registerService from './ipc'
import Channel from './interface/channel'
import { initDb, initDirectory } from './utils/init'
import electronIsDev from 'electron-is-dev'
import initTray from './utils/tray'

function createWindow() {
  Channel.mainWindow = new BrowserWindow({
    alwaysOnTop: false,
    height: 800,
    width: 1200,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: isDev,
      preload: resolve(__dirname, './preload/index.js'),
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: true,
    },
  })
  registerService()
  initDirectory()
  if (isDev) {
    Channel.mainWindow.webContents.openDevTools()
    Channel.mainWindow.loadURL('http://localhost:8889')
  } else {
    Channel.mainWindow.loadFile(resolve(__dirname, '../render/dist/index.html'))
  }
  Channel.mainWindow.on('close', (e) => {
    e.preventDefault()
    Channel.mainWindow.hide()
  })
  Channel.mainWindow.on('closed', () => {
    Channel.mainWindow = null
  })

  return Channel.mainWindow
}
function registerProtocol() {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substring(7)

    callback(decodeURI(normalize(url.split('?')[0])))
  })
}
if (electronIsDev) {
  app.dock.setIcon(resolve(__dirname, '../assets/icons.iconset/icon_512x512.png'))
}
app.on('ready', () => {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' //关闭web安全警告
})
app.on('before-quit', () => {
  Channel.mainWindow?.removeAllListeners('close')
  Channel.mainWindow = null
})
app.on('activate', () => {
  Channel.mainWindow?.show()
})
app.setName('A' + app.getName())
app.whenReady().then(async () => {
  await initDb()

  import('./server/index').then((res) => {
    res.default(() => {
      createWindow()
      // initTray()
    })
  })

  // 这个需要在app.ready触发之后使用
  registerProtocol()
})
