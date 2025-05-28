import globalStyles from './styles/Global.module.css';
import Navbar from '../components/Navbar';
import styles from './styles/Dashboard.module.css';

export default function Dashboard() {
  return (
    <>
    <Navbar/>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Resumen del Evento</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.card}><h3>Ingresos Totales</h3><p>$0</p></div>
          <div className={styles.card}><h3>Gastos Totales</h3><p>$0</p></div>
          <div className={styles.card}><h3>Ganancia Neta</h3><p>$0</p></div>
          <div className={styles.card}><h3>Entradas Vendidas</h3><p>0</p></div>
        </div>
      </div>
    </>
  );
}