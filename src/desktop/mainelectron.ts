import { app, BrowserWindow, screen, globalShortcut, Tray, Menu, Notification } from 'electron';
import { userInfo } from 'os';
import {listener} from './module/listener';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.

let tray = null;
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  app.setAppUserModelId(process.execPath)
  console.log(process.execPath)
  // Create the browser window.
  const size = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    height: size.height,
    width: size.width,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, '../src/index.html'));

  //Menu
  const template: any = [
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        }
      ]
    },

    {
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },

    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More'
        }
      ]
    },
    {
      label: 'fonction',
      accelerator: 'CmdOrCtrl+f',
      click: () => {
        const notif = {
          title: 'Notification',
          body: 'fonction is clicked'
        };
        const myNotification = new Notification(notif);
        myNotification.show()
      },
    }
  ]

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.loadFile('./dist/AngElect2/index.html')

  // Open the DevTools when ctrl+I is pressed
  globalShortcut.register("Ctrl+I", () => mainWindow.webContents.openDevTools());

  const notif = {
    title: 'Notification',
    body: 'Welcome ' + userInfo().username
  };
  const myNotification = new Notification(notif);

  myNotification.show()

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('quit', () => {
  console.log("see you later")
});

listener.aysncMessage();