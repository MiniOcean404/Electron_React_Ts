import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

// 日志位置，就是electron-log本身使用的日志位置了，其路径如下：
// on Linux:@/.config/{app name}/logs/{process type}.log
// on macOS:@/Library/Logs/{app name}/{process type}.log
// on Windows:%USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log

// 添加更新日志
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
