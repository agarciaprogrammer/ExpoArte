import globalStyles from './styles/Global.module.css';
import Navbar from '../components/Navbar';
//import styles from './styles/Entradas.module.css';

export default function Entradas() {
  return (
    <>
    <Navbar/>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Entradas - Preventa</h2>
        <p className={globalStyles.text}>Lista de participantes con entrada anticipada.</p>
      </div>
    </>
  );
}