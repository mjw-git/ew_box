import { BrowserWindow, app, net, protocol } from 'electron'
import isDev from 'electron-is-dev'
import { resolve, normalize } from 'path'
import registerService from './ipc'
import Channel from './interface/channel'
import { initDb, initDirectory } from './utils/init'

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
      contextIsolation: true,
      nodeIntegration: true,
    },
  })
  registerService()
  initDirectory()
  if (isDev) {
    Channel.mainWindow.loadURL('http://localhost:8889')
  } else {
    Channel.mainWindow.loadFile(resolve(__dirname, '../render-dist/index.html'))
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
  protocol.handle('atom', (request) => {
    const url = request.url.substring(7)

    const filePath = decodeURI(normalize(url.split('?')[0]))

    return net.fetch('file://' + filePath)
  })
}
// if (electronIsDev) {
//   app.dock.setIcon(resolve(__dirname, '../assets/icons.iconset/icon_512x512.png'))
// }
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
// app.setName('A' + app.getName())
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
