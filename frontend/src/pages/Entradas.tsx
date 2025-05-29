import globalStyles from './styles/Global.module.css';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import FormField from '../components/FormField';
import Modal from '../components/Modal';
import type { PreSale } from '../types';
import { useState, useEffect } from 'react';
import { getPreSales, createPreSale, deletePreSale, updatePreSale } from '../services/presaleService.ts';

export default function Preventa() {
  const [showForm, setShowForm] = useState(false);
  const [preSales, setPreSales] = useState<PreSale[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const ENTRADA_UNITARIA = 3000; // Precio fijo temporal

  const [form, setForm] = useState({
  fullName: '',
  quantity: 0,
  finalPrice: ENTRADA_UNITARIA,
  paymentMethod: '', // valor por defecto
  date: '',
});


  useEffect(() => {
    fetchPreSales();
  }, []);

  const fetchPreSales = async () => {
    try {
      const data = await getPreSales();
      setPreSales(data);
    } catch (error) {
      console.error('Error al obtener preventas:', error);
      alert('Ocurrió un error al cargar las preventas.');
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      const quantity = parseInt(value) || 1;
      setForm((prev) => ({
        ...prev,
        quantity,
        finalPrice: quantity * ENTRADA_UNITARIA
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updatePreSale(editingId, form);
      } else {
        await createPreSale(form);
      }

      fetchPreSales();
      setShowForm(false);
      setEditingId(null);
      resetForm();
    } catch (error) {
      console.error('Error al guardar preventa:', error);
      alert('No se pudo guardar la preventa.');
    }
  };


  const resetForm = () => {
    setForm({
      fullName: '',
      quantity: 1,
      finalPrice: ENTRADA_UNITARIA,
      paymentMethod: '',
      date: '',
    });
  };

  const handleRowClick = (preSale: PreSale) => {
    setForm({
      fullName: preSale.fullName,
      quantity: preSale.quantity,
      finalPrice: preSale.finalPrice,
      paymentMethod: preSale.paymentMethod,
      date: preSale.date
    });
    setEditingId(preSale.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás segura de eliminar esta preventa?");
    if (!confirmDelete) return;

    await deletePreSale(id);
    fetchPreSales();
  };

  const totalGeneral = preSales.reduce((acc, p) => acc + p.finalPrice, 0);

  return (
    <>
      <Navbar />
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Entradas: Preventa</h2>
        <button className={globalStyles.button} onClick={() => setShowForm(true)}>Agregar Preventa</button>

        <p className={globalStyles.text}><strong>Total general:</strong> ${totalGeneral.toFixed(2)}</p>

        <Table
          headers={['Comprador', 'Cantidad', 'Precio total', 'Método de Pago', 'Fecha', '']}
          rows={preSales.map(p => [
            p.fullName,
            p.quantity,
            `$${p.finalPrice}`,
            p.paymentMethod,
            p.date,
            <button
              className={globalStyles.buttonDelete}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(p.id);
              }}
            >Eliminar</button>
          ])}
          onRowClick={(index) => handleRowClick(preSales[index])}
        />
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Agregar Preventa">
        <form onSubmit={handleSubmit}>
          <FormField label="Comprador" name="fullName" type="text" value={form.fullName} onChange={handleChange} />
          <FormField label="Cantidad" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
          <FormField label="Fecha" name="date" type="date" value={form.date} onChange={handleChange} />
          
          <FormField
            label="Método de Pago"
            name="paymentMethod"
            type="select"
            value={form.paymentMethod}
            onChange={handleChange}
            options={['Transferencia', 'MercadoPago', 'Efectivo']}
          />

          <p className={globalStyles.text}><strong>Total calculado:</strong> ${form.finalPrice}</p>

          <button type="submit" className={globalStyles.button}>Guardar</button>
        </form>
      </Modal>
    </>
  );
}
