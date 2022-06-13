import { shell } from 'electron';
import BrowserWindow = Electron.BrowserWindow;

export default function initBrowserWindowEvent(win: BrowserWindow | null) {
  win?.on('ready-to-show', () => {
    if (!win) throw new Error('"主窗口没有定义');

    if (process.env.START_MINIMIZED) {
      win.minimize();
    } else {
      win.show();
    }
  });

  win?.on('closed', () => {
    // eslint-disable-next-line
    win = null;
  });

  win?.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
}
