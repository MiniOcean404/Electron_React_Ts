const { ipcRenderer } = window.require("electron");

export function sendMain() {
  ipcRenderer.send("key", "我是渲染进程的消息");
}

// 通过 channel 发送消息到带有 webContentsId 的窗口.
// 前提是要知道对应的渲染进程的ID
export function sendRenderToRender(webContentsId: number, channel: string, ...arg: unknown[]) {
  ipcRenderer.sendTo(webContentsId, channel, ...arg);
}

export function sendCompressDate(data: object) {
  ipcRenderer.send("compress-data", data);
}
