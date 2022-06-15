const ipc =
  window.electron.ipcRenderer || window.require('electron').ipcRenderer;

export function sendMain() {
  ipc.send('key', '我是渲染进程的消息');
}

// 通过 channel 发送消息到带有 webContentsId 的窗口.
// 前提是要知道对应的渲染进程的ID
export function sendRenderToRender(
  webContentsId: number,
  channel: string,
  ...arg: unknown[]
) {
  ipc.sendTo(webContentsId, channel, ...arg);
}

export function sendCompressDate(data: object) {
  ipc.send('compress-data', data);
}

export const ipcTest = () => {
  // calling IPC exposed from preload script
  ipc.once('ipc-example', (arg) => {
    // eslint-disable-next-line no-console
    console.log(arg);
  });

  ipc.send('ipc-example', ['Test Data']);
};
