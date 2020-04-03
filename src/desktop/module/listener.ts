import {ipcMain} from 'electron'
export namespace listener {
     export function aysncMessage() {
        return ipcMain.on('asynchronous-message', (event, arg) => {
            console.log(arg) // affiche "ping"
            event.reply('asynchronous-reply', 'pongAsync')
        }
        )
    }

     export function syncMessage() {
        return ipcMain.on('synchronous-message', (event, arg) => {
            console.log(arg) // affiche "ping"
            event.returnValue = 'pongSync'
        })
    }
}
