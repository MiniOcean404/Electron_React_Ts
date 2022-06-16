import { Application, Container, Graphics, Rectangle, Sprite } from 'pixi.js';

// eslint-disable-next-line import/prefer-default-export
export function createImg(app: Application) {
  // 创建一个图像精灵
  const luFei = Sprite.from(
    'https://img1.baidu.com/it/u=2082729884,1583333066&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711'
  );

  // 创建一个容器
  const container = new Container();
  // 为容器添加name属性
  container.name = 'my-container';
  // 通过 position 设置精灵在画布中的位置
  // luFei.position.x = app.screen.width/2
  // luFei.position.y = app.screen.height/2
  // 上面注释的是分别设置 也可以统一设置
  luFei.position.set(app.screen.width / 2, app.screen.height / 2);

  // 通过 pivot 设置精灵的枢轴，枢轴也可以理解为中心点
  luFei.pivot.set(100, 100);

  // 通过 anchor 设置精灵的右上角为图片精灵的原点
  luFei.anchor.set(0.5, 0.5);

  // 通过 scale 设置精灵的缩放比例
  luFei.scale.set(0.5);

  // 通过 rotation 设置精灵的旋转角度
  luFei.rotation = 0.5 * Math.PI; // 90度

  luFei.skew.set(0.5, 0); // x轴倾斜0.5

  // 创建一个图形类
  const graphics = new Graphics();
  // 指定一个简单的单色填充
  graphics.beginFill(0xff0000);
  // 通过图形类画一个圆
  graphics.drawCircle(app.screen.width / 2, app.screen.height / 2, 100);
  // 填充上一次设置的 beginFill()
  graphics.endFill();

  // 把圆形精灵以掩模的形式添加在图片精灵上
  luFei.mask = graphics;

  // 设置x和y轴的值
  luFei.x = 200;
  luFei.y = 100;

  // 通过 angle 设置精灵的角度
  luFei.angle = 45;

  // 通过 alpha 设置精灵的透明度 0-1(透明到不透明）
  luFei.alpha = 0.5;

  // 设置层级
  luFei.zIndex = 1;

  // 通过 visible 设置精灵的可见度
  luFei.visible = true;

  // 通过 renderable 设置精灵是否可被渲染
  luFei.renderable = true;

  // 开启事件交互
  luFei.interactive = true;

  // 开启按钮模式
  luFei.buttonMode = true;

  luFei.cursor = 'wait';

  // 定义一个矩形对象
  const rec = new Rectangle(0, 0, 100, 100);
  // 在图像精灵上添加矩形的命中区域
  luFei.hitArea = rec;

  // 给图像精灵添加点击事件，
  luFei.addListener('click', () => {
    console.log('🚀 ~ file: luFei.parent', luFei.parent);
  });

  // 把图像加到容器上
  container.addChild(luFei);

  // 把容器精灵添加到舞台（app）上
  app.stage.addChild(container);

  // 为舞台添加一个更新循环的方法
  app.ticker.add(() => {
    // 让图像精灵每次更新旋转0.01度
    luFei.rotation += 0.01;
  });

  return { luFei, container };
}
