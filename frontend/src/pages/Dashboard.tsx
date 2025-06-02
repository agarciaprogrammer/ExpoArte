import { useEffect, useState } from "react";
//import Card from '../components/Card';
import globalStyles from './styles/Global.module.css';
import styles from './styles/Dashboard.module.css';
import { getExpenses } from '../services/expenseService';
import { getPreSales } from '../services/presaleService';
import { getDoorSales } from '../services/doorSaleService';
import type { Expense } from '../types';
import type { PreSale } from '../types';
import type { DoorSale } from '../types';


export default function Dashboard() {
  const [gastos, setGastos] = useState<Expense[]>([]);
  const [preventas, setPreventas] = useState<PreSale[]>([]);
  const [puertas, setPuertas] = useState<DoorSale[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const gastosData = await getExpenses();
      const preventaData = await getPreSales();
      const puertaData = await getDoorSales();

      setGastos(gastosData);
      setPreventas(preventaData);
      setPuertas(puertaData);
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
  const totalPuerta = puertas.reduce((sum, p) => sum + p.finalPrice, 0);
  const totalEntradasPreventa = preventas.reduce((acc, p) => acc + p.quantity, 0);
  const totalEntradasPuerta = puertas.reduce((acc, p) => acc + p.quantity, 0);
  
  const todasEntradas = [...puertas, ...preventas];
  const totalEfectivo = todasEntradas
    .filter(e => e.paymentMethod === 'Efectivo')
    .reduce((sum, e) => sum + e.finalPrice, 0);

  const totalMercadoPago = todasEntradas
    .filter(e => e.paymentMethod === 'MercadoPago')
    .reduce((sum, e) => sum + e.finalPrice, 0);  

  const ganancia = (totalPreventa + totalPuerta) - totalGastos;

  const cards = [
    { title: 'Gastos Totales', value: formatCurrency(totalGastos), cardClass: '', valueClass: '', },
    { title: 'Gastos - Iara', value: formatCurrency(totalGastosOrganizadora('Iara')), cardClass: styles.iaraCard, valueClass: '', },
    { title: 'Gastos - Kate', value: formatCurrency(totalGastosOrganizadora('Kate')), cardClass: styles.kateCard, valueClass: '', },
    { title: 'Ingresos Preventa', value: formatCurrency(totalPreventa), cardClass: '', valueClass: '', },
    { title: 'Ingresos Puerta', value: formatCurrency(totalPuerta), cardClass: '', valueClass: '', },
    { title: 'Entradas Preventa', value: totalEntradasPreventa, cardClass: '', valueClass: '', },
    { title: 'Entradas Puerta', value: totalEntradasPuerta, cardClass: '', valueClass: '', },
    {
      title: 'Entradas en Efectivo',
      value: formatCurrency(totalEfectivo),
      cardClass: '',
      valueClass: '',
    },
    {
      title: 'Entradas en MercadoPago',
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