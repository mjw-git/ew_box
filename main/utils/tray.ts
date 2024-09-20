import { app, Menu, nativeImage, Tray } from 'electron'
import { resolve } from 'path'
const icon16Path = resolve(__dirname, '../assets/icons.iconset/icon_16x16.png')
const icon32Path = resolve(__dirname, '../assets/icons.iconset/icon_32x32.png')
// console.log(iconPath, '==icon')

const initTray = () => {
  try {
    const icon16 = nativeImage.createFromPath(icon16Path)
    const icon32 = nativeImage.createFromPath(icon32Path)
    const icon = nativeImage.createEmpty()
    icon.addRepresentation({ width: 16, height: 16, scaleFactor: 1, buffer: icon16.toPNG() })
    icon.addRepresentation({ width: 16, height: 16, scaleFactor: 32, buffer: icon32.toPNG() })
    // icon.setTemplateImage(true)
    // icon.resize({ width: 16, height: 16 })
    const tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      {
        label: 'Item4',
        type: 'radio',
        click: () => {
          app.quit()
        },
      },
    ])

    tray.setToolTip('Ew Box')
    tray.setContextMenu(contextMenu)
    console.log('托盘图标已创建')
  } catch (error) {
    console.log(error)
  }
}
export default initTray
