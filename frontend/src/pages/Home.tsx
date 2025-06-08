import globalStyles from './styles/Global.module.css';
import styles from './styles/Home.module.css';

export default function Home() {
  return (
    <div className={`${globalStyles.container} ${styles.homeWrapper}`}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.title}>Bienvenida al Panel de Administración</h1>
        <p className={styles.subtitle}>Este es tu espacio para gestionar la exposición de forma ordenada.</p>
        <ul className={styles.featureList}>
          <li>Visualizá los ingresos y gastos</li>
          <li>Registrá ventas y asistencia</li>
          <li>Configurá precios y usuarios</li>
        </ul>
        <p className={styles.cta}>Usá el menú superior para comenzar</p>
      </div>
    </div>
  );
}
