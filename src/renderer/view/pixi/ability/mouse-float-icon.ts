import mouseIcon from '@/../assets/icons/16x16.png';
import { Application } from 'pixi.js';

export default function setMouseFloatIcon(app: Application) {
  // css 样式
  const defaultIcon = `url('${mouseIcon}'),auto`;
  const hoverIcon = `url('${mouseIcon}'),auto`;

  // 添加鼠标 行内样式
  app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
  app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;
}
