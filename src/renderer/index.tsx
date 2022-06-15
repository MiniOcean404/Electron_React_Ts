import '@/renderer/css/base.scss';
import { ipcTest } from '@/renderer/message/send';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ShaderSystem } from '@pixi/core';
import { install } from '@pixi/unsafe-eval';
import App from './App';

ipcTest();

install({
  ShaderSystem,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
