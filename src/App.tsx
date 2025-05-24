import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
