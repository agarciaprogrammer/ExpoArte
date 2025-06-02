import globalStyles from './styles/Global.module.css';

export default function Home() {
  return (
    <>
      
      <div className={globalStyles.container}>
        <h1 className={globalStyles.title}>Bienvenido/a al panel de administración</h1>
        <p className={globalStyles.text}>Seleccioná una sección desde la barra superior.</p>
      </div>
    </>
  );
}
