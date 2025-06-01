import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
//import Card from '../components/Card';
import globalStyles from './styles/Global.module.css';
import styles from './styles/Dashboard.module.css';
import { getExpenses } from '../services/expenseService';
import { getPreSales } from '../services/presaleService';
import type { Expense } from '../types';
import type { PreSale } from '../types';


export default function Dashboard() {
  const [gastos, setGastos] = useState<Expense[]>([]);
  const [preventas, setPreventas] = useState<PreSale[]>([]);
  // const [puerta, setPuerta] = useState<Ingreso[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const gastosData = await getExpenses();
      const preventaData = await getPreSales();
      //const puertaData = await getPuertas();

      setGastos(gastosData);
      setPreventas(preventaData);
    };
    fetchData();
  }, []);

  // CALCULOS
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
  const totalGastos = gastos.reduce((acc, exp) => acc + Number(exp.amount), 0);
  const totalGastosOrganizadora = (organizadora: string) =>
    gastos
      .filter(g => g.organizer === organizadora)
      .reduce((sum, g) => sum + Number(g.amount), 0);
  const totalPreventa = preventas.reduce((sum, p) => sum + p.finalPrice, 0);
  // const totalPuerta = puerta.reduce((sum, p) => sum + p.finalPrice, 0);
  const totalEntradasPreventa = preventas.reduce((acc, p) => acc + p.quantity, 0);

  const totalEfectivo = preventas
  .filter(p => p.paymentMethod === 'Efectivo')
  .reduce((sum, p) => sum + p.finalPrice, 0);

  const totalMercadoPago = preventas
  .filter(p => p.paymentMethod === 'MercadoPago')
  .reduce((sum, p) => sum + p.finalPrice, 0);

  /* 
    const totalEfectivo = [...preventas, ...puerta]
      .filter(p => p.paymentMethod === 'Efectivo')
      .reduce((sum, p) => sum + p.finalPrice, 0);

    const totalMercadoPago = [...preventas, ...puerta]
      .filter(p => p.paymentMethod === 'MercadoPago')
      .reduce((sum, p) => sum + p.finalPrice, 0);

  */

  const ganancia = totalPreventa - totalGastos;

  const cards = [
    { title: 'Gastos Totales', value: formatCurrency(totalGastos), cardClass: '', valueClass: '', },
    { title: 'Gastos - Iara', value: formatCurrency(totalGastosOrganizadora('Iara')), cardClass: styles.iaraCard, valueClass: '', },
    { title: 'Gastos - Kate', value: formatCurrency(totalGastosOrganizadora('Kate')), cardClass: styles.kateCard, valueClass: '', },
    { title: 'Ingresos Preventa', value: formatCurrency(totalPreventa), cardClass: '', valueClass: '', },
    { title: 'Entradas Preventa', value: totalEntradasPreventa, cardClass: '', valueClass: '', },
    {
      title: 'Preventa en Efectivo',
      value: formatCurrency(totalEfectivo),
      cardClass: '',
      valueClass: '',
    },
    {
      title: 'Preventa en MercadoPago',
      value: formatCurrency(totalMercadoPago),
      cardClass: '',
      valueClass: '',
    },
    {
      title: 'Ganancia Total',
      value: formatCurrency(ganancia),
      cardClass: '',
      valueClass: ganancia >= 0 ? styles.positiveText : styles.negativeText,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={globalStyles.container}>
        <h1 className={globalStyles.title}>Dashboard</h1>
        <div className={styles.cardsContainer}>
          {cards.map((item, index) => (
            <div className={`${styles.card} ${item.cardClass}`} style={{ '--i': index } as React.CSSProperties} key={index}>
              <div className={styles.cardTitle}>{item.title}</div>
              <div className={`${styles.cardValue} ${item.valueClass}`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );


}