import { createNote, deleteNote, getNotes, readNote, writeNote, getRootDir } from '@/lib'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { BrowserWindow, app, ipcMain, shell, dialog } from 'electron'
import * as path from 'path'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'

function createWindow(): void {
  // Crea la ventana del navegador.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'NoteMark',
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))
  
  // Handler para importar notas
  ipcMain.handle('importNote', async () => {
    const { filePaths } = await dialog.showOpenDialog({
      title: 'Seleccionar una nota',
      filters: [{ name: 'Text Files', extensions: ['md', 'txt'] }],
      properties: ['openFile']
    })

    if (!filePaths || filePaths.length === 0) return null

    const sourcePath = filePaths[0]
    const content = fs.readFileSync(sourcePath, 'utf8')
    // Extrae el nombre correcto sin la ruta ni la extensión.
    const fileName = path.basename(sourcePath, path.extname(sourcePath))
    const rootDir = getRootDir()
    const destinationPath = path.join(rootDir, `${fileName}.md`)
    // Guarda el contenido en el directorio de notas
    fs.writeFileSync(destinationPath, content, 'utf8')
    return { title: fileName, lastEditTime: Date.now() }
  })

  ipcMain.handle('exportNote', async (_, title: string, content: string) => {
    const { filePath } = await dialog.showSaveDialog({
      title: 'Guardar nota',
      defaultPath: `${title}.md`,
      filters: [{ name: 'Markdown Files', extensions: ['md'] }]
    })
  
    if (!filePath) return null
  
    fs.writeFileSync(filePath, content, 'utf8')
    return filePath
  })
 

  ipcMain.on('window:minimize', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) window.minimize()
  })

  ipcMain.on('window:maximize', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) {
      if (window.isMaximized()) {
        window.restore()
      } else {
        window.maximize()
      }
    }
  })

  ipcMain.on('window:close', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) window.close()
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
