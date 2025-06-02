import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/views/Login/Login';
import Home from '@/views/Home/Home';
import NotFound from './views/NotFound/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
