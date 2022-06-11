import path from 'path';
import { app } from 'electron';

// Mac 只支持 png 且 大小为16 * 16
const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(process.cwd(), 'assets');

// eslint-disable-next-line
export const iconPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};
