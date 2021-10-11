import {BrowserWindow,app} from 'electron'
import isDev from 'electron-is-dev'
import {resolve} from 'path'
function createWindow(){
    console.log(7)
    const window:BrowserWindow=new BrowserWindow({
        height:1000,
        width:1000,
        webPreferences:{
            webSecurity:false,
            contextIsolation:false,
            nodeIntegration:true,
        }
    })
    if(isDev){
        try {
            require('electron-reloader')(module, {});
        } catch (_) { }
        window.webContents.openDevTools();
        window.loadURL('http://localhost:8080')
    }else{
        window.loadFile(resolve(__dirname,"../render/dist-render/index.html"));
    }
    return window;
}
app.on('ready',()=>{
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']='true'//关闭web安全警告
    createWindow();
})
