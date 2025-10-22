import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote, ImportNote, ExportNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
  //  importNote: (...args: Parameters<ImportNote>) => ipcRenderer.invoke('importNote', ...args), // 👈 Ahora es consistente con main.ts
    importNote: () => ipcRenderer.invoke('importNote'),
   // exportNote: ()=> ipcRenderer.invoke('exportNote'),
    exportNote: async (title: string, content: string) => {
      return ipcRenderer.invoke('exportNote', title, content)
    }
    
  })
} catch (error) {
  console.error(error)
}

try {
  contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send('window:minimize'),
    maximizeWindow: () => ipcRenderer.send('window:maximize'),
    closeWindow: () => ipcRenderer.send('window:close')
  })
} catch (error) {
  console.error(error)
}
