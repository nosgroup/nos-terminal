'use strict'

import {app, protocol, BrowserWindow} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import { autoUpdater } from "electron-updater"

const isDevelopment = process.env.NODE_ENV !== 'production'

import {NfcTool} from "@/nfcTool";

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])
let win;

export class Background{
    sendToWindow(data){
        win.webContents.send('rfid-chip', {'data': data});
    }
}

let background = new Background();
let nfcTool = new NfcTool(background);
nfcTool.listen();

async function createWindow() {
    win = new BrowserWindow({
        roundedCorners: true,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) {
            //disabled dev tools for nosgroup live production
            //win.webContents.openDevTools()
        }
    } else {
        createProtocol('app')
        win.loadURL('app://./index.html')
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow().then(() => {
        /*
        autoUpdater.checkForUpdatesAndNotify()

        autoUpdater.on('checking-for-update', () => {
            win.webContents.send('checking-for-updates');
        });

        autoUpdater.on('update-available', () => {
            win.webContents.send('update-available');
        });

        autoUpdater.on('update-not-available', () => {
            win.webContents.send('update-not-available');
        });

        autoUpdater.on('error', (err) => {
            win.webContents.send('update-error', err.message);
        });

        autoUpdater.on('download-progress', (progressObj) => {
            let logMessage = "Download speed: " + progressObj.bytesPerSecond;
            logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
            logMessage = logMessage + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
            win.webContents.send('update-download-progress', progressObj);
        });

        autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
            console.log("DONE");
        });
         */
    });
})

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
