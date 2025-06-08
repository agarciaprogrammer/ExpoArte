// services/pdfService.js
const PDFDocument = require('pdfkit');
const { Expense, DoorSale, Preorder } = require('../models');

const generateEventReport = async () => {
  const expenses = await Expense.findAll();
  const doorSales = await DoorSale.findAll();
  const preSales = await Preorder.findAll();

  const doc = new PDFDocument();
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(18).text('Reporte del Evento', { align: 'center' });
  doc.moveDown();

  doc.fontSize(14).text('Gastos');
  expenses.forEach((g) => {
    doc.fontSize(12).text(`- ${g.description}: $${g.amount}`);
  });

  doc.moveDown();
  doc.fontSize(14).text('Entradas - Preventa');
  preSales.forEach((p) => {
    doc.fontSize(12).text(`- ${p.fullName} x${p.quantity}: $${p.finalPrice}`);
  });

  doc.moveDown();
  doc.fontSize(14).text('Entradas - Puerta');
  doorSales.forEach((d) => {
    doc.fontSize(12).text(`- ${d.fullName} x${d.quantity}: $${d.finalPrice}`);
  });

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
