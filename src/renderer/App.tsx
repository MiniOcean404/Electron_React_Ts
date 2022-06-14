import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

const Hello = () => {
  return (
    <>
      <div>测试</div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
