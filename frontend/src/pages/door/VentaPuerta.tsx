import React, { useState, useEffect } from 'react';
import { createDoorSale, getDoorSales } from '../../services/doorSaleService';
import type { DoorSale } from '../../types';
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';
import styles from '../styles/Global.module.css';
import Table from '../../components/Table';

export default function DoorSale() {
  const [doorSales, setDoorSales] = useState<DoorSale[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const ENTRADA_PUERTA = 4000;

  const fetchDoorSales = async () => {
    try {
      const data = await getDoorSales();
      const sortedData = data.sort((a, b) => b.date.localeCompare(a.date));
      setDoorSales(sortedData);

      // Cálculo del total recaudado
      const total = sortedData.reduce((acc, sale) => acc + sale.finalPrice, 0);
      console.log('Total recaudado en puerta:', total);
    } catch (error) {
      console.error('Error obteniendo ventas en puerta: ', error);
    }
  };

  useEffect(() => {
    fetchDoorSales();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || quantity < 1 || !paymentMethod) return;

    const newSale: Omit<DoorSale, 'id'> = {
      fullName,
      quantity,
      finalPrice: quantity * ENTRADA_PUERTA,
      paymentMethod,
      date: new Date().toISOString(),
    };

    try {
      await createDoorSale(newSale);
      setSuccessMessage('Entrada registrada correctamente');
      setFullName('');
      setQuantity(1);
      setPaymentMethod('');
      setShowModal(false);
      fetchDoorSales();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error registrando una entrada: ', error);
    }
  };

  

return (
    <div className={styles.container}>
      <h1 className={styles.title}>Venta en Puerta</h1>
      <p className={styles.subtitle}>Registro de entradas vendidas en el momento del evento.</p>

      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <button className={styles.button} onClick={() => setShowModal(true)}>Agregar entrada</button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Agregar entrada">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nombre completo"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <FormField
            label="Cantidad"
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />

          <FormField
            label="Método de pago"
            name="paymentMethod"
            type="select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            options={['Efectivo', 'MercadoPago']}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </Modal>

      <h2 className={styles.subtitle}>Entradas vendidas en puerta</h2>
      <Table
        headers={['Comprador', 'Cantidad', 'Método de Pago', 'Fecha']}
        rows={doorSales.map((d) => [
          d.fullName,
          d.quantity,
          d.paymentMethod || '-',
          d.date,
        ])}
      />
    </div>
  );
}
