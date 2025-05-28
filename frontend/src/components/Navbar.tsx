// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link to="/home" className={styles.link}>Inicio</Link></li>
        <li><Link to="/gastos" className={styles.link}>Gastos</Link></li>
        <li><Link to="/ingresos" className={styles.link}>Ingresos</Link></li>
        <li><Link to="/dashboard" className={styles.link}>Dashboard</Link></li>
        <li><Link to="/entradas" className={styles.link}>Entradas</Link></li>
        <li><Link to="/configuracion" className={styles.link}>Configuración</Link></li>
      </ul>
    </nav>
  );
}