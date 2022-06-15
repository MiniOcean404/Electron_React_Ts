import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = string;

// contextIsolation 为 true 只能通过 contextBridge.exposeInMainWorld 暴露放方法能直接暴露 api
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  exportTest: 'exportTest',
});
