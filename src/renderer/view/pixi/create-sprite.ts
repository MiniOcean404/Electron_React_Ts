import { Dict } from '@/typing/pixi';
import {
  Application,
  Container,
  filters,
  Graphics,
  Loader,
  LoaderResource,
  Rectangle,
  SCALE_MODES,
  Sprite,
  Text,
  TextStyle,
} from 'pixi.js';

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

export function mouseMove(app: Application) {
  const loader = Loader.shared;

  loader.reset();
  // Inner radius of the circle
  const radius = 100;

  // The blur amount
  const blurSize = 32;

  const setup = (_: Loader, resources: Dict<LoaderResource>) => {
    const background = new Sprite(resources.bg.texture);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const circle = new Graphics()
      .beginFill(0xff0000)
      .drawCircle(radius + blurSize, radius + blurSize, radius)
      .endFill();
    circle.filters = [new filters.BlurFilter(blurSize)];

    const bounds = new Rectangle(
      0,
      0,
      (radius + blurSize) * 2,
      (radius + blurSize) * 2
    );

    const texture = app.renderer.generateTexture(circle, {
      scaleMode: SCALE_MODES.NEAREST,
      resolution: 1,
      region: bounds,
    });
    const focus = new Sprite(texture);

    background.mask = focus;
    app.stage.interactive = true;

    function pointerMove(event: any) {
      focus.position.x = event.data.global.x - focus.width / 2;
      focus.position.y = event.data.global.y - focus.height / 2;
    }

    app.stage.on('mousemove', pointerMove);

    app.stage.addChild(background);
    app.stage.addChild(focus);
  };

  loader
    .add(
      'bg',
      'http://tva3.sinaimg.cn/large/006APoFYly8h2uf1v77qxj305k05la9x.jpg'
    )
    .load(setup);
}
