import React from 'react';
import globalStyles from '../styles/Global.module.css';

export default function DoorHome() {
  return (
    <>
    <div className={globalStyles.container}>
      <h1 className={globalStyles.title}>Panel del Encargado</h1>
      <p>Bienvenido. Usa las pestañas para gestionar la entrada de visitantes.</p>
    </div>
    </>
  );
}