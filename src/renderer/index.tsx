import '@/renderer/css/base.scss';
import { ipcTest } from '@/renderer/message/send';
import { createRoot } from 'react-dom/client';
import App from './App';

ipcTest();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
