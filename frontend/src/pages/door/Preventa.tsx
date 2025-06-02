import {useEffect, useState} from 'react';
import { getPreSales, updatePreSale } from '../../services/presaleService';
import type { PreSale } from '../../types';
import styles from '../styles/Global.module.css';
import tableStyles from '../../components/Table.module.css';

export default function PreSaleList() {
    const [entries, setEntries] = useState<PreSale[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const data = await getPreSales();
            setEntries(data);
            setLoading(false);
        } catch (error) { console.error('Error cargando preventas: ', error);}
    };

    const handleCheckInChange = async (id: number, newCount: number) => {
        const item = entries.find(p => p.id === id);
        if(!item || newCount < 0 || newCount > item.quantity) return;

        try {
            const updated = await updatePreSale(id, { ...item, checkedInCount: newCount });
            setEntries(prev =>
                prev.map(p => (p.id === id ? updated : p))
            );
        } catch (error) {
             console.error('Error actualizando check-in:', error);
        }
    };

    if (loading) return <p className='{styles.loading}'>Cargando datos...</p>

  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>Entradas Preventa</h1>
      <p className={styles.subtitle}>
        Control de ingreso de personas que compraron entrada anticipada.
      </p>
      <div className={styles.tableContainer}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad Total</th>
              <th>Ingresaron</th>
              <th>Faltan</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(p => {
              const remaining = p.quantity - (p.checkedInCount ?? 0);
              return (
                <tr key={p.id}>
                  <td>{p.fullName}</td>
                  <td>{p.quantity}</td>
                  <td>{p.checkedInCount ?? 0}</td>
                  <td>{remaining}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      max={p.quantity}
                      value={p.checkedInCount ?? 0}
                      onChange={e =>
                        handleCheckInChange(p.id, Number(e.target.value))
                      }
                      className={tableStyles.smallInput}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}