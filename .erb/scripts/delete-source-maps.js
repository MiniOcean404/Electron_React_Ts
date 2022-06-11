import path from 'path';
import rimraf from 'rimraf';
import webpackPaths from '../configs/webpack.paths';

// rimraf 清理 source-map 脚本
export default function deleteSourceMaps() {
  rimraf.sync(path.join(webpackPaths.distMainPath, '*.js.map'));
  rimraf.sync(path.join(webpackPaths.distRendererPath, '*.js.map'));
}
