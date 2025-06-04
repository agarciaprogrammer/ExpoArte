// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { logout } from '../services/authService';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Iniciando logout");
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link to="/home" className={styles.link}>Inicio</Link></li>
        <li><Link to="/gastos" className={styles.link}>Gastos</Link></li>
        <li><Link to="/entradas" className={styles.link}>Preventa</Link></li>
        <li><Link to="/dashboard" className={styles.link}>Dashboard</Link></li>
        <li><Link to="/configuracion" className={styles.link}>Configuración</Link></li>
        <li><button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button></li>
      </ul>
    </nav>
  );
}