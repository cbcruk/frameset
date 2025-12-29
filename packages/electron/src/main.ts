import {
  app,
  BrowserWindow,
  ipcMain,
  session,
  WebContents,
  Session,
} from 'electron'
import * as path from 'path'
import * as fs from 'fs'
import { ElectronBlocker } from '@ghostery/adblocker-electron'
import fetch from 'cross-fetch'

let mainWindow: BrowserWindow | null = null
let blocker: ElectronBlocker | null = null

const webviewPreloadScript = fs.readFileSync(
  path.join(__dirname, 'webview-preload.js'),
  'utf-8'
)

function removeSecurityHeaders(ses: Session): void {
  ses.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = { ...details.responseHeaders }

    const headersToRemove = [
      'content-security-policy',
      'content-security-policy-report-only',
      'x-frame-options',
      'x-content-type-options',
    ]

    Object.keys(responseHeaders).forEach((key) => {
      if (headersToRemove.includes(key.toLowerCase())) {
        delete responseHeaders[key]
      }
    })

    callback({ responseHeaders })
  })
}

async function createWindow(): Promise<void> {
  blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch)

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'))

  blocker.enableBlockingInSession(session.defaultSession)
}

app.on('web-contents-created', (_event, contents: WebContents) => {
  if (contents.getType() === 'webview') {
    const ses = contents.session

    removeSecurityHeaders(ses)

    if (blocker) {
      blocker.enableBlockingInSession(ses)
    }

    contents.on('dom-ready', () => {
      contents.executeJavaScript(webviewPreloadScript).catch(() => {})
    })
  }
})

ipcMain.handle(
  'add-custom-filter',
  async (_event, filter: string): Promise<boolean> => {
    if (blocker) {
      blocker.update({
        // @ts-expect-error
        rawFilters: filter,
      })
      return true
    }
    return false
  }
)

ipcMain.handle('get-block-stats', async (): Promise<{ blocked: number }> => {
  return {
    blocked: 0,
  }
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
