/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import '@/main/life-cycle/app';
import { isDebug } from '@/constant/env';
// eslint-disable-next-line
// @ts-ignore
import sourceMapSupport from 'source-map-support';

if (process.env.NODE_ENV === 'production') {
  sourceMapSupport.install();
}

if (isDebug) {
  require('electron-debug')();
}
