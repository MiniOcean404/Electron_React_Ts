import { BrowserWindow } from "electron";

// eslint-disable-next-line
export function mainSendMessage(win: BrowserWindow) {
  win.webContents.send("key", "我是主线程的消息");
}
