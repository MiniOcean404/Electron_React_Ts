import { Application, Text, TextStyle } from 'pixi.js';

// eslint-disable-next-line import/prefer-default-export
export function createText(app: Application) {
  // 创建一个文本样式
  const skewStyle = new TextStyle({
    fontFamily: 'Arial',
    dropShadow: true,
    dropShadowAlpha: 0.8,
    dropShadowAngle: 2.1,
    dropShadowBlur: 4,
    dropShadowColor: '0x111111',
    dropShadowDistance: 10,
    fill: ['#ffffff'],
    stroke: '#004620',
    fontSize: 60,
    fontWeight: 'lighter',
    lineJoin: 'round',
    strokeThickness: 12,
  });
  // 创建一个文本类型
  const skewText = new Text('Hello PixiJS', skewStyle);
  // 将文本倾斜
  skewText.skew.set(0.1, -0.1);
  // 定义文本在舞台（app）中的位置
  skewText.x = 10;
  skewText.y = 100;

  // 将文本添加到舞台（app）中
  app.stage.addChild(skewText);
}
