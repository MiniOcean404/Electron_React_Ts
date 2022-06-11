// 通过 Electron app getPath 可以获得应用存储路径
import fs from "fs";

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
