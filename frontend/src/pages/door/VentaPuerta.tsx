import React, { useState, useEffect } from 'react';
import { createDoorSale, getDoorSales, updateDoorSale, deleteDoorSale } from '../../services/doorSaleService';
import type { DoorSale } from '../../types';
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';
import styles from '../styles/Global.module.css';
import Table from '../../components/Table';

export default function DoorSale() {
  const [doorSales, setDoorSales] = useState<DoorSale[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    quantity: 0,
    paymentMethod: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'quantity' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSale: Omit<DoorSale, 'id'> = {
      fullName: form.fullName,
      quantity: form.quantity,
      finalPrice: form.quantity * ENTRADA_PUERTA,
      paymentMethod: form.paymentMethod,
      date: new Date().toISOString(),
    };

    try {
      if (editingId !== null) {
        await updateDoorSale(editingId, newSale);
        setSuccessMessage('Entrada actualizada correctamente');
      } else {
        await createDoorSale(newSale);
        setSuccessMessage('Entrada registrada correctamente');
      }

      fetchDoorSales();
      setForm({ fullName: '', quantity: 1, paymentMethod: '' });
      setEditingId(null);
      setShowModal(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error guardando entrada: ', error);
    }
  };

  const handleRowClick = (sale: DoorSale) => {
    setForm({
      fullName: sale.fullName,
      quantity: sale.quantity,
      paymentMethod: sale.paymentMethod,
    });
    setEditingId(sale.id);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta entrada?");
    if (!confirmDelete) return;

    try {
      await deleteDoorSale(id);
      fetchDoorSales();
    } catch (error) {
      console.error("Error eliminando la entrada: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Venta en Puerta</h1>
      <p className={styles.subtitle}>Registro de entradas vendidas en el momento del evento.</p>

      <button className={styles.button} onClick={() => {
        setForm({ fullName: '', quantity: 1, paymentMethod: '' });
        setEditingId(null);
        setShowModal(true);
      }}>Agregar entrada</button>

      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? "Editar entrada" : "Agregar entrada"}>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nombre completo"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <FormField
            label="Cantidad"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <FormField
            label="Método de pago"
            name="paymentMethod"
            type="select"
            value={form.paymentMethod}
            onChange={handleChange}
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
        headers={['Comprador', 'Cantidad', 'Método de Pago', 'Fecha', '']}
        rows={doorSales.map((d) => [
          d.fullName,
          d.quantity,
          d.paymentMethod || '-',
          d.date,
          <button className={styles.buttonDelete} onClick={(e) => {
            e.stopPropagation();
            handleDelete(d.id);
          }}>Eliminar</button>
        ])}
        onRowClick={(index) => handleRowClick(doorSales[index])}
      />
    </div>
  );
}
