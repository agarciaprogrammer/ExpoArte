import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Gastos from './pages/Gastos';
import Dashboard from './pages/Dashboard';
import Entradas from './pages/Entradas';
import Configuracion from './pages/Configuracion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/dashboard" element={<Dashboard />} />      
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  );
}

export default App;
