import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

// 检查是否构建了渲染器和主包 脚本
const mainPath = path.join(webpackPaths.distMainPath, 'main.js');
const rendererPath = path.join(webpackPaths.distRendererPath, 'renderer.js');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      '主要进程尚未构建。通过运行“npm run build:main”来构建它'
    )
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      '主要进程尚未构建。通过运行“npm run build:main”来构建它'
    )
  );
}
