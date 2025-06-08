import { useEffect, useState } from 'react';
import globalStyles from './styles/Global.module.css';
import { getEntryPrices, updateEntryPrices, downloadPDFReport } from '../services/configService';

export default function Configuracion() {
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [doorSalePrice, setDoorSalePrice] = useState<number>(0);
  //const [currentPassword, setCurrentPassword] = useState('');
  //const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    async function fetchPrices() {
      const { ticketPrice, doorSalePrice } = await getEntryPrices();
      setTicketPrice(ticketPrice);
      setDoorSalePrice(doorSalePrice);
    }
    fetchPrices();
  }, []);

  const handleSavePrices = async () => {
    await updateEntryPrices({ ticketPrice, doorSalePrice });
    alert('Precios actualizados correctamente');
  };

  {/* Cambiar precios
    
    const handleChangePassword = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      alert('Contraseña cambiada con éxito');
    } catch {
      alert('Error al cambiar la contraseña');
    }
  };
  */}
  

  const handleDownloadReport = async () => {
    const blob = await downloadPDFReport();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporte_evento.pdf';
    link.click();
  };

  return (
    <div className={globalStyles.container}>
      <h2 className={globalStyles.title}>Configuración del Sistema</h2>

      {/* Cambiar precios */}
      <section>
        <h3 className={globalStyles.subtitle}>Precio de Entradas</h3>
        <label>Preventa: <input className={globalStyles.input} type="number" value={ticketPrice} onChange={e => setTicketPrice(Number(e.target.value))} /></label> <br /> <br />
        <label>Puerta: <input className={globalStyles.input} type="number" value={doorSalePrice} onChange={e => setDoorSalePrice(Number(e.target.value))} /></label>
        <br /> <br /><button onClick={handleSavePrices} className={globalStyles.button}>Guardar Precios</button>
      </section>

      {/* Cambiar contraseña 

        <section style={{ marginTop: '2rem' }}>
        <h3 className={globalStyles.subtitle}>Cambiar Contraseña</h3>
        <input className={globalStyles.input} type="password" placeholder="Contraseña actual" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
        <input className={globalStyles.input} type="password" placeholder="Nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        <br /><br /><button onClick={handleChangePassword} className={globalStyles.button}>Cambiar Contraseña</button>
      </section>
      
      
      */}
      

      {/* Descargar reporte */}
      <section style={{ marginTop: '2rem' }}>
        <h3 className={globalStyles.subtitle}>Reportes</h3>
        <button onClick={handleDownloadReport} className={globalStyles.button}>Descargar Reporte en PDF</button>
      </section>
    </div>
  );
}
