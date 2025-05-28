import globalStyles from './styles/Global.module.css';
import Navbar from '../components/Navbar';
//import styles from './styles/Ingresos.module.css';

export default function Ingresos() {
  return (
    <>
    <Navbar />
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Gestión de Ingresos</h2>
        <p className={globalStyles.text}>Aquí se mostrarán los ingresos registrados.</p>
        <button className={globalStyles.button}>Agregar Ingreso</button>
      </div>
    </>
  );
}