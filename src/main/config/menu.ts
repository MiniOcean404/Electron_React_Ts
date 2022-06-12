import {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  shell,
} from 'electron';
import { isDebug } from '@/constant/env';

let win: BrowserWindow;

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

function buildDarwinTemplate(): MenuItemConstructorOptions[] {
  const subMenuAbout: DarwinMenuItemConstructorOptions = {
    label: 'Electron',
    submenu: [
      {
        label: 'About ElectronReact',
        selector: 'orderFrontStandardAboutPanel:',
      },
      { type: 'separator' },
      { label: 'Services', submenu: [] },
      { type: 'separator' },
      {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:',
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:',
      },
      { label: 'Show All', selector: 'unhideAllApplications:' },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  };
  const subMenuEdit: DarwinMenuItemConstructorOptions = {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:',
      },
    ],
  };
  const subMenuViewDev: MenuItemConstructorOptions = {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => {
          win.webContents.reload();
        },
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => {
          win.setFullScreen(!win.isFullScreen());
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: () => {
          win.webContents.toggleDevTools();
        },
      },
    ],
  };
  const subMenuViewProd: MenuItemConstructorOptions = {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => {
          win.setFullScreen(!win.isFullScreen());
        },
      },
    ],
  };
  const subMenuWindow: DarwinMenuItemConstructorOptions = {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:',
      },
      { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
      { type: 'separator' },
      { label: 'Bring All to Front', selector: 'arrangeInFront:' },
    ],
  };
  const subMenuHelp: MenuItemConstructorOptions = {
    label: 'Help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell.openExternal('https://electronjs.org');
        },
      },
      {
        label: 'Documentation',
        click() {
          shell.openExternal(
            'https://github.com/electron/electron/tree/main/docs#readme'
          );
        },
      },
      {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://www.electronjs.org/community');
        },
      },
      {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/electron/electron/issues');
        },
      },
    ],
  };

  const subMenuView =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
      ? subMenuViewDev
      : subMenuViewProd;

  return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
}

function buildDefaultTemplate() {
  const templateDefault = [
    {
      label: '&文件',
      submenu: [
        {
          label: '&打开窗口',
          accelerator: 'Ctrl+O',
        },
        {
          label: '&关闭窗口',
          accelerator: 'Ctrl+W',
          click: () => {
            win.close();
          },
        },
      ],
    },
    {
      label: '&开发者工具',
      submenu: isDebug
        ? [
            {
              label: '&刷新',
              accelerator: 'Ctrl+R',
              click: () => {
                win.webContents.reload();
              },
            },
            {
              label: '切换全屏',
              accelerator: 'F11',
              click: () => {
                win.setFullScreen(!win.isFullScreen());
              },
            },
            {
              label: '切换开发者工具',
              // 添加快捷键
              accelerator: 'CmdOrCtrl + shift + i',
              click: () => {
                const { webContents } = win;
                webContents.toggleDevTools();
              },
            },
          ]
        : [
            {
              label: '切换全屏',
              accelerator: 'F11',
              click: () => {
                win.setFullScreen(!win.isFullScreen());
              },
            },
          ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '学习更多',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'electron 文档',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            );
          },
        },
        {
          label: '交流社区',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: '搜索 issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    },
  ];

  return templateDefault;
}

function setupDevelopmentEnvironment(): void {
  win.webContents.on('context-menu', (_, props) => {
    const { x, y } = props;

    Menu.buildFromTemplate([
      {
        label: '检查元素',
        click: () => {
          win.webContents.inspectElement(x, y);
        },
      },
    ]).popup({ window: win });
  });
}

const template =
  process.platform === 'darwin'
    ? buildDarwinTemplate()
    : buildDefaultTemplate();

export default function createMenu(windows: BrowserWindow) {
  win = windows;

  if (isDebug) {
    setupDevelopmentEnvironment();
  }

  // 从模板中创建菜单
  const myMenu = Menu.buildFromTemplate(template);

  // 设置为应用程序菜单
  Menu.setApplicationMenu(myMenu);
}
