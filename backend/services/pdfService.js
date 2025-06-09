// services/pdfService.js
const PDFDocument = require('pdfkit');
const { Expense, DoorSale, Preorder } = require('../models');

const generateEventReport = async () => {
  const expenses = await Expense.findAll();
  const doorSales = await DoorSale.findAll();
  const preSales = await Preorder.findAll();

  const totalGastos = expenses.reduce((sum, g) => sum + Number(g.amount), 0);
  const totalPreventa = preSales.reduce((sum, p) => sum + p.finalPrice, 0);
  const totalPuerta = doorSales.reduce((sum, p) => sum + p.finalPrice, 0);
  const totalEntradasPreventa = preSales.reduce((sum, p) => sum + p.quantity, 0);
  const totalEntradasPuerta = doorSales.reduce((sum, p) => sum + p.quantity, 0);

  const todasEntradas = [...doorSales, ...preSales];
  const totalEfectivo = todasEntradas
    .filter(e => e.paymentMethod === 'Efectivo')
    .reduce((sum, e) => sum + e.finalPrice, 0);
  const totalMercadoPago = todasEntradas
    .filter(e => e.paymentMethod === 'MercadoPago')
    .reduce((sum, e) => sum + e.finalPrice, 0);
  const totalIngresos = totalEfectivo + totalMercadoPago;
  const ganancia = totalIngresos - totalGastos;

  const gastoIara = expenses.filter(g => g.organizer === 'Iara').reduce((sum, g) => sum + Number(g.amount), 0);
  const gastoKate = expenses.filter(g => g.organizer === 'Kate').reduce((sum, g) => sum + Number(g.amount), 0);

  const gananciaRestante = (ganancia * 0.95) - gastoIara - gastoKate;
  const mitadRestante = gananciaRestante / 2;
  const gananciaIara = gastoIara + mitadRestante;
  const gananciaKate = gastoKate + mitadRestante;

  const totalAsistieron = preSales.reduce((acc, p) => acc + (p.checkedInCount ?? 0), 0);
  const totalNoAsistieron = totalEntradasPreventa - totalAsistieron;

  const doc = new PDFDocument();
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(18).text('Reporte del Evento', { align: 'center' }).moveDown(2);

  // Resumen financiero
  doc.fontSize(14).text('Resumen General', { underline: true }).moveDown(0.5);
  doc.fontSize(12).list([
    `Gastos Totales: $${totalGastos.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `Ingresos Preventa: $${totalPreventa.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `Ingresos Puerta: $${totalPuerta.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `Total Ingresos: $${totalIngresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `Ganancia Total: $${ganancia.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  ]);
  doc.moveDown();

  // Ingresos por método de pago
  doc.fontSize(14).text('Ingresos por Método de Pago', { underline: true }).moveDown(0.5);
  doc.fontSize(12).list([
    `Efectivo: $${totalEfectivo.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `MercadoPago: $${totalMercadoPago.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  ]);
  doc.moveDown();

  // Reparto de Ganancias
  doc.fontSize(14).text('Reparto de Ganancias', { underline: true }).moveDown(0.5);
  doc.fontSize(12).list([
    `Gastos Iara: $${gastoIara.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `Gastos Kate: $${gastoKate.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `Ganancia Iara: $${gananciaIara.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    `Ganancia Kate: $${gananciaKate.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  ]);
  doc.moveDown();

  // Asistencia
  doc.fontSize(14).text('Asistencia Preventa', { underline: true }).moveDown(0.5);
  doc.fontSize(12).list([
    `Entradas Vendidas: ${totalEntradasPreventa}`,
    `Asistieron: ${totalAsistieron}`,
    `No Asistieron: ${totalNoAsistieron}`
  ]);

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on('error', reject);
  });
};

module.exports = { generateEventReport };
