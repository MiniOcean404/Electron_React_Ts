import rimraf from 'rimraf';
import process from 'process';
import webpackPaths from '../configs/webpack.paths';

// rimraf 清理脚本 dist release dll
const args = process.argv.slice(2);
const commandMap = {
  dist: webpackPaths.distPath,
  release: webpackPaths.releasePath,
  dll: webpackPaths.dllPath,
};

args.forEach((x) => {
  const pathToRemove = commandMap[x];
  if (pathToRemove !== undefined) {
    rimraf.sync(pathToRemove);
  }
});
