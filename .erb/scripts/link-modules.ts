import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

const { srcNodeModulesPath } = webpackPaths;
const { appNodeModulesPath } = webpackPaths;
// 创建符号链接 将 app 的 node_modules 目录指向 src 的 node_modules
if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
