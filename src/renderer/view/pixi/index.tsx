import { mouseMove } from '@/renderer/view/pixi/create-sprite';
import { Application } from 'pixi.js';
import { LegacyRef, useLayoutEffect, useRef } from 'react';
import styles from './index.scss';

const Pixi2D = () => {
  const dom: LegacyRef<HTMLDivElement> = useRef(null);

  const app = new Application({
    width: 640,
    height: 360,
    backgroundColor: 0x1099bb,
  });

  useLayoutEffect(() => {
    if (dom.current?.firstChild === null) {
      dom.current?.appendChild(app.view);
    }

    mouseMove(app);

    // createText(app);
    // createImg(app);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles?.container} ref={dom} />
    </>
  );
};

export default Pixi2D;
