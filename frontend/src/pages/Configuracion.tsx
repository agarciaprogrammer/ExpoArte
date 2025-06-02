import globalStyles from './styles/Global.module.css';
//import styles from './styles/Configuracion.module.css';

export default function Configuracion() {
  return (
    <>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Configuración del Sistema</h2>
        <p className={globalStyles.text}>Ajustes generales y permisos.</p>
        <button className={globalStyles.button}>Guardar Cambios</button>
      </div>
    </>
  );
}