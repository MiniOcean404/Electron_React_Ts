import createMenu from '@/main/config/menu';
import initTray from '@/main/config/tray';
import { BrowserWindow } from 'electron';
import { resolveHtmlPath } from '@/main/util';
import installExtensions from '@/main/config/dev-tools';
import initBrowserWindowEvent from '@/main/life-cycle/browser-window';
import { isDebug } from '@/constant/env';
import AppUpdater from '@/main/config/auto-update';
import browserWindowProp from '@/main/config/browser-window-prop';
import initElectronRemote from '@/main/config/electron-remote';
import { regGlobalShortcut } from '@/main/config/global-shortcut';
import ipcMainInit from '@/main/message/accept';

export default async function createWindow() {
  const win: BrowserWindow | null = new BrowserWindow(browserWindowProp);

  if (isDebug) await installExtensions();
  await win.loadURL(resolveHtmlPath('index.html'));
  initBrowserWindowEvent(win);

  // eslint-disable-next-line no-new
  new AppUpdater();

  // 设置为最顶层
  // win.setAlwaysOnTop(true)
  // 可以让主进程打开文件或者一个链接;
  // win.loadURL(`www.baidu.com`)
  ipcMainInit();
  await initElectronRemote(win);
  initTray(win);
  createMenu(win);
  regGlobalShortcut(win);
}
