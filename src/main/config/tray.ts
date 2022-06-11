import { iconPath } from '@/constant/icon';
import { isOpenOrCloseDevtools } from '@/main/utils/devtool';
import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';

export default (win: BrowserWindow) => {
  const icon = nativeImage.createFromPath(iconPath());
  const tray = new Tray(icon);

  // 鼠标移到托盘中应用程序的图标上时，显示的文本
  tray.setToolTip('图片压缩');
  // 设置 iOS 标题
  // tray.setTitle("标题");

  // 点击图标的响应事件
  // win.hide() 隐藏应用
  tray.on('click', () => (win.isVisible() ? win.show() : win.show()));

  // 右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: '打开开发者工具',
        click: () => isOpenOrCloseDevtools(win.webContents),
      },
      {
        label: '退出',
        click: () => app.quit(),
      },
    ]);

    tray.popUpContextMenu(menuConfig);
  });
};
