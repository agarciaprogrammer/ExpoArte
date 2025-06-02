import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Gastos from './pages/Gastos';
import Dashboard from './pages/Dashboard';
import Entradas from './pages/Entradas';
import Configuracion from './pages/Configuracion';
import AdminLayout from './layouts/AdminLayout';
import DoorHome from './pages/door/HomeEncargado';
import PreSaleList from './pages/door/Preventa';
import DoorSale from './pages/door/VentaPuerta';
import EncargadoLayout from './layouts/EncargadoLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Route>

        {/* Rutas ENCARGADO */}
        <Route element={<EncargadoLayout />}>
          <Route path="/encargado/home" element={<DoorHome />} />
          <Route path="/encargado/preventa" element={<PreSaleList />} />
          <Route path="/encargado/puerta" element={<DoorSale />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
