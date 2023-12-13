const { app, BrowserWindow } = require('electron');
const path = require('path'); // Import the path module

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, 'logofrodder.png'), // Set the window icon

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true // Make sure this is true
    }
  })
  win.webContents.openDevTools();
  win.setMenuBarVisibility(false);


  // and load the index.html of the app.
  win.loadURL('http://localhost:3000/');
}

app.whenReady().then(createWindow)
