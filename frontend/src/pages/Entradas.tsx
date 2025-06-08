import globalStyles from './styles/Global.module.css';
import Table from '../components/Table';
import FormField from '../components/FormField';
import Modal from '../components/Modal';
import type { PreSale } from '../types';
import { useState, useEffect } from 'react';
import { getPreSales, createPreSale, deletePreSale, updatePreSale } from '../services/presaleService.ts';
import { getEntryPrices } from '../services/configService.ts';
import { FaTrashAlt } from "react-icons/fa";

export default function Preventa() {
  const [showForm, setShowForm] = useState(false);
  const [preSales, setPreSales] = useState<PreSale[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{ index: number; direction: 'asc' | 'desc' } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [originalPreSales, setOriginalPreSales] = useState<PreSale[]>([]);
  const [filters, setFilters] = useState({
    paymentMethod: '',
    fromDate: '',
    toDate: ''
  });
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [form, setForm] = useState({
    fullName: '',
    quantity: 0,
    finalPrice: 0,
    paymentMethod: '', // valor por defecto
    date: '',
  });
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchPreSales();
    fetchTicketPrice();
  }, []);

  const fetchPreSales = async () => {
    try {
      const data = await getPreSales();
      const sorted = data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPreSales(sorted);
      setOriginalPreSales(sorted);
    } catch (error) {
      console.error('Error al obtener preventas:', error);
      alert('Ocurrió un error al cargar las preventas.');
    }
  };

  const fetchTicketPrice = async () => {
    try {
      const config = await getEntryPrices();
      setTicketPrice(config.ticketPrice);
    } catch (error) {
      console.error('Error al obtener el precio de la entrada:', error);
      alert('No se pudo cargar el precio de la entrada.');
    }
  };

  
  const handleSort = (index: number) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.index === index && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...preSales].sort((a, b) => {
      const aVal = Object.values(a)[index];
      const bVal = Object.values(b)[index];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setPreSales(sorted);
    setSortConfig({ index, direction });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      const quantity = parseInt(value) || 1;
      setForm((prev) => ({
        ...prev,
        quantity,
        finalPrice: quantity * ticketPrice
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
      finalPrice: 1 * ticketPrice,
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

  const filteredPreSales = preSales.filter(p =>
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.title}>Entradas: Preventa</h2>
        {ticketPrice === 0 ? (
        <p>Cargando precio de entrada...</p>
          ) : (
            <button className={globalStyles.button} onClick={() => setShowForm(true)}>Agregar Preventa</button>
          )}

        <br />
        <br />
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className={globalStyles.input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className={globalStyles.buttonFilter} onClick={() => setShowFilters(true)}>Filtros</button>

        <Table
          headers={['Comprador', 'Cantidad', 'Precio total', 'Método de Pago', 'Fecha', '']}
          rows={filteredPreSales.map(p => [
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
            ><FaTrashAlt size={15} /></button>
          ])}
          onRowClick={(index) => handleRowClick(filteredPreSales[index])}
          onSort={handleSort}
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
            options={['MercadoPago', 'Efectivo']}
          />

          <p className={globalStyles.text}><strong>Total calculado:</strong> ${form.finalPrice}</p>

          <button type="submit" className={globalStyles.button}>Guardar</button>
        </form>
      </Modal>

      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title="Filtrar preventas">
        <form onSubmit={(e) => {
          e.preventDefault();

          let filtered = [...originalPreSales];
          if (filters.paymentMethod) {
            filtered = filtered.filter(p => p.paymentMethod === filters.paymentMethod);
          }
          if (filters.fromDate) {
            filtered = filtered.filter(p => new Date(p.date) >= new Date(filters.fromDate));
          }
          if (filters.toDate) {
            filtered = filtered.filter(p => new Date(p.date) <= new Date(filters.toDate));
          }

          setPreSales(filtered);
          setShowFilters(false);
        }}>
          <FormField
            label="Método de Pago"
            name="paymentMethod"
            type="select"
            value={filters.paymentMethod}
            onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
            options={['MercadoPago', 'Efectivo']}
          />
          <button type="submit" className={globalStyles.button}>Aplicar Filtros</button>
        </form>
      </Modal>
    </>
  );
}
