import globalStyles from './styles/Global.module.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Table from '../components/Table';
import FormField from '../components/FormField';
import Modal from '../components/Modal';
import { getExpenses, createExpense } from '../services/expenseService.ts';

export default function Gastos() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    fecha: '',
    organizadora: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);


  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  }

  const handleAddExpense = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpense(form);
    fetchExpenses();
    setShowForm(false);
    setForm({ descripcion: '', monto: '', fecha: '', organizadora: '' });
  };

  const totalGeneral = expenses.reduce((acc, exp) => acc + Number(exp.monto), 0);

  const totalesPorOrganizadora = expenses.reduce((acc, exp) => {
    if (!acc[exp.organizadora]) acc[exp.organizadora] = 0;
    acc[exp.organizadora] += Number(exp.monto);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Gestión de Gastos</h2>

        <button className={globalStyles.button} onClick={handleAddExpense}>
          Agregar Gasto
        </button>

        <p className={globalStyles.text}><strong>Total general:</strong> ${totalGeneral.toFixed(2)}</p>

        {Object.entries(totalesPorOrganizadora).map(([organizer, total]) => (
          <p key={organizer} className={globalStyles.text}>
            <strong>{organizer}:</strong> ${total.toFixed(2)}
          </p>
        ))}

        <Table
          headers={['Descripción', 'Monto', 'Fecha', 'Organizadora']}
          rows={expenses.map(exp => [
            exp.descripcion,
            `$${Number(exp.monto).toFixed(2)}`,
            exp.fecha,
            exp.organizadora
          ])}
        />
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} title="Agregar Gasto">
        <form onSubmit={handleSubmit}>
          <FormField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} />
          <FormField label="Monto" name="monto" type="number" value={form.monto} onChange={handleChange} />
          <FormField label="Fecha" name="fecha" type="date" value={form.fecha} onChange={handleChange} />
          <FormField label="Organizadora" name="organizadora" value={form.organizadora} onChange={handleChange} />
          <button type="submit" className={globalStyles.button}>Guardar</button>
        </form>
      </Modal>
    </>
  );

}