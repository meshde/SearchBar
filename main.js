const { app, BrowserWindow, globalShortcut } = require('electron');
const url = require('url');
const iohook = require('iohook');
const path = require('path');

let mainWindow;
let state = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 80,
    backgroudColor: '#ffffff',
    closable: false,
    resizable: false,
    maximizable: false,
    minimizable: false,
    frame: false,
    movable: true,
    transparent: true,
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );
}

iohook.on('keyup', (event) => {
  if (event.keycode === 3675 || event.keycode === 3676) {
    if (state === 0) {
      state = 1;
      setTimeout(() => { state = 0; }, 1000);
    } else if (state === 1) {
      mainWindow.show();
      mainWindow.webContents.executeJavaScript('document.getElementById("search-box").focus();document.getElementById("search-box").select();');
      state = 0;
    }
  } else if (state === 1) {
    state = 0;
  }
});

iohook.start();
app.on('ready', createWindow);
