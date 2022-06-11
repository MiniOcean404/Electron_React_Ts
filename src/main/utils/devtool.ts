import { WebContents } from "electron";

// eslint-disable-next-line
export function isOpenOrCloseDevtools(webContents: WebContents) {
  return webContents.isDevToolsOpened() ? webContents.closeDevTools() : webContents.openDevTools();
}
