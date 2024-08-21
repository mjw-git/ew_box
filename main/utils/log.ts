import log4js from 'log4js'
import { join } from 'path'
log4js.configure({
  appenders: { cheese: { type: 'file', filename: join(process.resourcesPath, 'pluto.log') } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } },
})

const logger = log4js.getLogger('cheese')
// logger.level = ''
export default logger
