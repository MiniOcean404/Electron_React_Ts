import { BrowserWindow } from 'electron';

export default async (win: BrowserWindow) => {
  // 在 14 版本 require('electron').remote 方式被移除
  // https://www.electronjs.org/zh/docs/latest/breaking-changes#removed-remote-module
  // eslint-disable-next-line promise/catch-or-return
  import('@electron/remote/main').then((res) => {
    res.initialize();
    res.enable(win.webContents);
  });
};
