import { BrowserView, BrowserWindow, app, protocol } from 'electron'
import isDev from 'electron-is-dev'
import { ipcMain } from 'electron/main'
import { resolve, normalize } from 'path'
function createWindow() {
  const window: BrowserWindow = new BrowserWindow({
    icon: resolve(__dirname, '../assets/pluto.png'),
    alwaysOnTop: false,
    height: 1200,
    width: 1200,
    minWidth: 800,
    webPreferences: {
      preload: resolve(__dirname, './preload/index.js'),
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: true,
    },
  })
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win?.setTitle(title)
  })
  if (isDev) {
    window.webContents.openDevTools()
    window.loadURL('http://localhost:8889')
  } else {
    window.loadFile(resolve(__dirname, '../render/dist/index.html'))
  }
  return window
}
app.dock.setIcon(resolve(__dirname, '../assets/pluto.png'))
app.on('ready', () => {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' //关闭web安全警告
})
app.whenReady().then(() => {
  createWindow()
  // 这个需要在app.ready触发之后使用
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substring(7)

    callback(decodeURI(normalize(url.split('?')[0])))
  })
})
