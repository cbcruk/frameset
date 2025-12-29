import { contextBridge, ipcRenderer } from 'electron'

interface FramesetAPI {
  addCustomFilter: (filter: string) => Promise<boolean>
  getBlockStats: () => Promise<{ blocked: number }>
}

const api: FramesetAPI = {
  addCustomFilter: (filter: string) =>
    ipcRenderer.invoke('add-custom-filter', filter),
  getBlockStats: () => ipcRenderer.invoke('get-block-stats'),
}

contextBridge.exposeInMainWorld('frameset', api)

declare global {
  interface Window {
    frameset: FramesetAPI
  }
}
