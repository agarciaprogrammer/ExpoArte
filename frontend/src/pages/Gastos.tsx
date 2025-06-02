import globalStyles from './styles/Global.module.css';
import Table from '../components/Table';
import FormField from '../components/FormField';
import Modal from '../components/Modal';
import type { Expense } from '../types';
import { useState, useEffect } from 'react';
import { getExpenses, createExpense, deleteExpense, updateExpense } from '../services/expenseService.ts';


export default function Gastos() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    description: '',
    amount: 0,
    date: '',
    organizer: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    console.log("Datos de gastos recibidos:", data);
    setExpenses(data);
  }

  const handleAddExpense = () => {
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      await updateExpense(editingId, form);
    } else {
      await createExpense(form);
    }
    fetchExpenses();
    setShowForm(false);
    setEditingId(null);
    setForm({ description: '', amount: 0, date: '', organizer: '' });
  };

  const handleRowClick = (expense: Expense) => {
    setForm({
      description: expense.description,
      amount: Number(expense.amount),
      date: expense.date,
      organizer: expense.organizer,
    });
    setEditingId(expense.id);
    setShowForm(true); 
  }

  const handleDelete = async (id: number ) => {
    const confirmDelete = window.confirm("Estas segura de eliminar este gasto?");
    if(!confirmDelete) return;

    await deleteExpense(id);
    fetchExpenses();
  };

  const totalGeneral = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);

  const totalesPorOrganizadora: { [key: string]: number } = expenses.reduce(
    (acc: { [key: string]: number }, exp) => {
      if (!acc[exp.organizer]) acc[exp.organizer] = 0;
      acc[exp.organizer] += Number(exp.amount);
      return acc;
    },
    {}
  );

  return (
    <>
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
          headers={['Descripción', 'Organizadora',  'Monto', 'Fecha', '']}
          rows={expenses.map(exp => [
            exp.description,
            exp.organizer,
            `$${Number(exp.amount).toFixed(2)}`,
            exp.date,
            <button className={globalStyles.buttonDelete} onClick={(e) => {
              e.stopPropagation();
              handleDelete(exp.id);
            }}>Eliminar</button>
          ])}
          onRowClick={(index) => handleRowClick(expenses[index])}
        />
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Agregar Gasto">
        <form onSubmit={handleSubmit}>
          <FormField label="Descripción" name="description" type="text" value={form.description} onChange={handleChange} />
          <FormField label="Monto" name="amount" type="number" value={form.amount} onChange={handleChange} />
          <FormField label="Fecha" name="date" type="date" value={form.date} onChange={handleChange} />
          <FormField
            label="Organizadora"
            name="organizer"
            type="select"
            value={form.organizer}
            onChange={handleChange}
            options={['Iara', 'Kate']}
          />
          <button type="submit" className={globalStyles.button}>Guardar</button>
        </form>
      </Modal>
    </>
  );
}