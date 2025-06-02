import { useEffect, useState } from 'react';
import { getPreSales, updatePreSale } from '../../services/presaleService';
import type { PreSale } from '../../types';
import styles from '../styles/Global.module.css';
import tableStyles from '../../components/Table.module.css';

export default function PreSaleList() {
  const [entries, setEntries] = useState<PreSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await getPreSales();
      setEntries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando preventas: ', error);
    }
  };

  const handleCheckInChange = async (id: number, newCount: number) => {
    const item = entries.find(p => p.id === id);
    if (!item || newCount < 0 || newCount > item.quantity) return;

    try {
      const updated = await updatePreSale(id, { ...item, checkedInCount: newCount });
      setEntries(prev => prev.map(p => (p.id === id ? updated : p)));
    } catch (error) {
      console.error('Error actualizando check-in:', error);
    }
  };

  if (loading) return <p className={styles.loading}>Cargando datos...</p>;

  const filteredEntries = [...entries]
    .sort((a, b) => {
      const aComplete = (a.quantity - (a.checkedInCount ?? 0)) === 0;
      const bComplete = (b.quantity - (b.checkedInCount ?? 0)) === 0;
      if (aComplete !== bComplete) return aComplete ? 1 : -1;
      return a.fullName.localeCompare(b.fullName);
    })
    .filter(p =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Entradas Preventa</h1>
      <p className={styles.subtitle}>
        Control de ingreso de personas que compraron entrada anticipada.
      </p>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        className={styles.inputSearch}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
            {filteredEntries.map(p => {
              const remaining = p.quantity - (p.checkedInCount ?? 0);
              const isComplete = remaining === 0;
              return (
                <tr
                  key={p.id}
                  className={isComplete ? tableStyles.completeRow : ''}
                >
                  <td>{p.fullName}</td>
                  <td>{p.quantity}</td>
                  <td>{p.checkedInCount ?? 0}</td>
                  <td>{remaining}</td>
                  <td>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
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
  );
}
