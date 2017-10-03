var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

//window object global reference
var mainWindow = null;

//Quit on close
app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

//Electron ready
app.on('ready', function() {
	mainWindow = new BrowserWindow({width: 800, height: 600});

	//load index
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		//free window
		mainWindow = null;
	});
});
