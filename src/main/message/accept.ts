import { app, ipcMain } from 'electron';

export default () => {
  // ipcMain.on 和 ipcMain.once
  ipcMain.on('key', (_, args) => {
    if (args === '退出程序') {
      app.quit();
    }
  });

  // ipcMain.on 和 ipcMain.once
  ipcMain.on('compress-data', (_, args) => {
    console.log(args);
  });

  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });
};
