import * as os from 'os'
import { ipcMain } from 'electron'

const sysInformation = {
    userInfo: os.userInfo(),
    platform: os.platform(),
    architecture: os.arch(),
    cpus: os.cpus(),
    memoryInfo: process.getSystemMemoryInfo()
    
}

export namespace sysInfo {
    export function information() {
        return ipcMain.on('sysInfo', (event, arg) => {
            event.returnValue = sysInformation;
        })
    }
}