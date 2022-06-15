import { lazy } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Pixi2D from '@/renderer/view/pixi';

const Home = lazy(() => import('@/renderer/view/home/index'));

export default function App() {
  return (
    <>
      <Link to="/">去主页</Link>
      <Link to="/pixi">去PIXI</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pixi" element={<Pixi2D />} />
      </Routes>
    </>
  );
}
