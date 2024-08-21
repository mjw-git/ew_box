import { app } from 'electron'
import electronIsDev from 'electron-is-dev'
import { resolve } from 'path'

export const appUserPath = app.getPath('userData')
export const sharpPath = electronIsDev ? resolve(__dirname, `../testImg`) : resolve(app.getPath('userData'), './sharp')
export const pwdPath = electronIsDev ? resolve(__dirname, `../testImg`) : resolve(app.getPath('userData'), './password')
