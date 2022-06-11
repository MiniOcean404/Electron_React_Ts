import chalk from 'chalk';
import detectPort from 'detect-port';

const port = process.env.PORT || '1213';

// 检查端口是否被占用
detectPort(port, (err, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `端口 "${port}" on "localhost" 已经被使用. 请使用其他端口`
      )
    );
  } else {
    process.exit(0);
  }
});
