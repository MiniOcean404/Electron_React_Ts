// 通过 Electron app getPath 可以获得应用存储路径
import fs from 'fs';
import { URL } from 'url';
import path from 'path';

// 解析 html 路径
// eslint-disable-next-line import/no-mutable-exports
export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}

// 创建目录，返回创建目录的结果
// eslint-disable-next-line
export const mkdir = (path: string) =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      resolve(true);
      return;
    }

    fs.mkdir(path, (error) => {
      if (error) return reject(error);

      return resolve(true);
    });
  });
