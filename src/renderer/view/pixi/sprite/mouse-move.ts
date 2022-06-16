import { Dict } from '@/typing/pixi';
import {
  Application,
  filters,
  Graphics,
  Loader,
  LoaderResource,
  Rectangle,
  SCALE_MODES,
  Sprite,
} from 'pixi.js';

// eslint-disable-next-line import/prefer-default-export
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
