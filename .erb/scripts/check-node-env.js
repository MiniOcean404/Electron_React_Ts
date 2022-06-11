import chalk from 'chalk';

export default function checkNodeEnv(expectedEnv) {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" 没有设置');
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(
      chalk.whiteBright.bgRed.bold(
        `process.env.NODE_ENV" 必须是 "${expectedEnv}" 才能使用这个 webpack 配置`
      )
    );
    process.exit(2);
  }
}
