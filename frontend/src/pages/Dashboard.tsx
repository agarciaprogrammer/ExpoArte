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
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { processCheckInsByHour } from '../utils/processCheckInsByHour';


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

  const totalIngresos = totalEfectivo + totalMercadoPago;

  const ganancia = (totalPreventa + totalPuerta) - totalGastos;

  Chart.register(ArcElement, Tooltip, Legend);
  // Ganancias repartidas
  const gastoIara = totalGastosOrganizadora('Iara');
  const gastoKate = totalGastosOrganizadora('Kate');

  const gananciaRestante = (ganancia * 0.95) - gastoIara - gastoKate;
  const mitadRestante = gananciaRestante / 2;

  const gananciaIara = gastoIara + mitadRestante;
  const gananciaKate = gastoKate + mitadRestante;

  const dataByHour = processCheckInsByHour(preventas);

  const cardsGastos = [
    { title: 'Gastos - Iara', value: formatCurrency(totalGastosOrganizadora('Iara')), cardClass: styles.iaraCard, valueClass: '', },
    { title: 'Gastos - Kate', value: formatCurrency(totalGastosOrganizadora('Kate')), cardClass: styles.kateCard, valueClass: '', },
  ];

  const cardsIngresos = [
    { title: 'Ingresos Preventa', value: formatCurrency(totalPreventa), cardClass: '', valueClass: '', },
    { title: 'Ingresos Puerta', value: formatCurrency(totalPuerta), cardClass: '', valueClass: '', },
    { title: 'Entradas en Efectivo', value: formatCurrency(totalEfectivo), cardClass: '', valueClass: '', },
    { title: 'Entradas Preventa', value: totalEntradasPreventa, cardClass: '', valueClass: '', },
    { title: 'Entradas Puerta', value: totalEntradasPuerta, cardClass: '', valueClass: '', },
  
    { title: 'Entradas en MercadoPago', value: formatCurrency(totalMercadoPago), cardClass: '', valueClass: '', },
  ];

  const cardsTotales = [
    { title: 'Gastos Totales', value: formatCurrency(totalGastos), cardClass: '', valueClass: '', },
    { title: 'Ingresos Totales', value: formatCurrency(totalIngresos), cardClass: '', valueClass: '', },
    {
      title: 'Ganancia Total',
      value: formatCurrency(ganancia),
      cardClass: '',
      valueClass: ganancia >= 0 ? styles.positiveText : styles.negativeText,
    },
  ];

  const cardsGananciasRepartidas = [
    { title: 'Ganancias - Iara', value: formatCurrency(gananciaIara), cardClass: styles.iaraCard, valueClass: '', },
    { title: 'Ganancias - Kate', value: formatCurrency(gananciaKate), cardClass: styles.kateCard, valueClass: '', },
  ];

  // Gráfico 1 - Dinero preventa vs puerta
  const pieDataMoney = {
    labels: ['Preventa', 'Puerta'],
    datasets: [
      {
        label: 'Ingresos',
        data: [totalPreventa, totalPuerta],
        backgroundColor: ['#4e73df', '#1cc88a'],
        hoverOffset: 20,
      },
    ],
  };

  // Gráfico 2 - Asistencia preventa (Ingresaron, No asistieron)
  const totalEntradasPreventaCantidad = preventas.reduce((acc, p) => acc + p.quantity, 0);
  const totalAsistieron = preventas.reduce((acc, p) => acc + (p.checkedInCount ?? 0), 0);
  const totalNoAsistieron = totalEntradasPreventaCantidad - totalAsistieron;

  const pieDataAttendance = {
    labels: ['Asistieron', 'No asistieron'],
    datasets: [
      {
        label: 'Personas',
        data: [totalAsistieron, totalNoAsistieron],
        backgroundColor: ['#36a2eb', '#ff6384'],
        hoverOffset: 20,
      },
    ],
  };

  return (
    <>
      <div className={globalStyles.container}>
        <h1 className={globalStyles.title}>Dashboard</h1>

        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Gastos</h2>
          <div className={styles.cardsContainer}>
            {cardsGastos.map((item, index) => (
              <div className={`${styles.card} ${item.cardClass}`} style={{ '--i': index } as React.CSSProperties} key={index}>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={`${styles.cardValue} ${item.valueClass}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Ingresos</h2>
          <div className={styles.cardsContainer}>
            {cardsIngresos.map((item, index) => (
              <div className={`${styles.card} ${item.cardClass}`} style={{ '--i': index } as React.CSSProperties} key={index}>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={`${styles.cardValue} ${item.valueClass}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Totales</h2>
          <div className={styles.cardsContainer}>
            {cardsTotales.map((item, index) => (
              <div className={`${styles.card} ${item.cardClass}`} style={{ '--i': index } as React.CSSProperties} key={index}>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={`${styles.cardValue} ${item.valueClass}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Ganancias repartidas</h2>
          <div className={styles.cardsContainer}>
            {cardsGananciasRepartidas.map((item, index) => (
              <div className={`${styles.card} ${item.cardClass}`} style={{ '--i': index } as React.CSSProperties} key={index}>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={`${styles.cardValue} ${item.valueClass}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Gráficos</h2>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Ingresos Preventa vs Puerta</div>
              <div style={{ height: '250px' }}>
                <Pie data={pieDataMoney} />
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Asistencia Preventa</div>
              <div style={{ height: '250px' }}>
                <Pie data={pieDataAttendance} />
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Asistencia Preventa</div>
              <div style={{ height: '250px' }}>
                <Pie data={pieDataAttendance} />
              </div>
            </div>    
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <div className={styles.card} style={{ minHeight: '350px' }}>
            <div className={styles.cardTitle}>Check-ins por hora</div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataByHour}>
                  <XAxis dataKey="hour" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="people" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
          </div>             
        </section>

      </div>
    </>
  );
}