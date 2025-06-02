import { Link } from 'react-router-dom';
import globalStyles from '../components/Navbar.module.css';

export default function NavbarEncargado() {
  return (
    <nav className={globalStyles.navbar}>
      <ul className={globalStyles.navList}>
        <li><Link to="/encargado/home" className={globalStyles.link}>Inicio</Link></li>
        <li><Link to="/encargado/preventa" className={globalStyles.link}>Participantes Preventa</Link></li>
        <li><Link to="/encargado/puerta" className={globalStyles.link}>Venta en Puerta</Link></li>
      </ul>
    </nav>
  );
}
