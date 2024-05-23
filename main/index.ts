import { BrowserView, BrowserWindow, app } from 'electron'
import isDev from 'electron-is-dev'
import { resolve } from 'path'
function createWindow() {
  const window: BrowserWindow = new BrowserWindow({
    icon: resolve(__dirname, '../assets/pluto.png'),
    alwaysOnTop: false,
    height: 1200,
    width: 1200,
    minWidth: 800,
    webPreferences: {
      webSecurity: false,
      contextIsolation: false,
      nodeIntegration: true,
    },
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
  createWindow()
})
