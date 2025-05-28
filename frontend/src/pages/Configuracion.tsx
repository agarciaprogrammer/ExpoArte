import globalStyles from './styles/Global.module.css';
import Navbar from '../components/Navbar';
//import styles from './styles/Configuracion.module.css';

export default function Configuracion() {
  return (
    <>
    <Navbar/>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Configuración del Sistema</h2>
        <p className={globalStyles.text}>Ajustes generales y permisos.</p>
        <button className={globalStyles.button}>Guardar Cambios</button>
      </div>
    </>
  );
}