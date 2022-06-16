import { Link, Route, Routes } from 'react-router-dom';

import Home from '@/renderer/view/home/index';
import Pixi2D from '@/renderer/view/pixi';

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
