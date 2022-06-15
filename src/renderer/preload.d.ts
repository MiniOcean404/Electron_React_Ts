import { Channels } from '@/main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send(channel: Channels, ...args: unknown[]): void;

        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;

        once(channel: string, func: (...args: unknown[]) => void): void;

        sendTo(
          webContentsId: number,
          channel: string,
          ...args: unknown[]
        ): void;
      };
    };
  }
}

export {};
