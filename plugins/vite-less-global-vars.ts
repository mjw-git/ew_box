import { type Plugin } from 'vite'
import fs from 'fs'
const lessFileReg = /.*.module.less$/
export const ViteLessGlobalVars = ({ globalPath }: { globalPath: string }): Plugin => {
  const globalLess = fs.readFileSync(globalPath)

  return {
    enforce: 'pre',
    name: 'viteLessGlobalVars',
    transform(code, id: string) {
      if (lessFileReg.test(id)) {
        console.log(id)

        return {
          code: `${globalLess.toString()}\n${code}`,
        }
      }
      return { code }
    },
  }
}
