import { isDebug } from '@/constant/env';
import AppUpdater from '@/main/config/auto-update';
import browserWindowProp from '@/main/config/browser-window-prop';
import installExtensions from '@/main/config/dev-tools';
import initElectronRemote from '@/main/config/electron-remote';
import { regGlobalShortcut } from '@/main/config/global-shortcut';
import createMenu from '@/main/config/menu';
import initTray from '@/main/config/tray';
import initBrowserWindowEvent from '@/main/life-cycle/browser-window';
import ipcMainInit from '@/main/message/accept';
import { resolveHtmlPath } from '@/main/utils/path';
import { BrowserWindow } from 'electron';

export default async function createWindow() {
  const win: BrowserWindow | null = new BrowserWindow(browserWindowProp);

  // objc[85955]: Class WebSwapCGLLayer is implemented in both xxxxx One of the two will be used. Which one is undefined.
  // Failed to fetch extension, trying 4 more times
  // 是因为安装开发者工具 没有外网
  // 必须在 loadURL 之前进行安装
  if (isDebug) await installExtensions();

  await win.loadURL(resolveHtmlPath('index.html'));

  // 设置为最顶层
  // win.setAlwaysOnTop(true)
  // 可以让主进程打开文件或者一个链接;
  // win.loadURL(`www.baidu.com`)

  initTray(win);
  createMenu(win);
  regGlobalShortcut(win);

  initBrowserWindowEvent(win);
  ipcMainInit();
  await initElectronRemote(win);
  // eslint-disable-next-line no-new
  AppUpdater();
}
