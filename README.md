# 🎨 Sistema de Gestión para Exposiciones de Arte

Este proyecto es una aplicación web Full Stack pensada para ayudar a organizar y administrar exposiciones de arte. El sistema está orientado a pequeñas productoras o grupos organizadores, permitiendo llevar registro de gastos, ingresos, ventas de entradas (preventa y taquilla), control de asistencia y distribución de ganancias.

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Base de datos:** PostgreSQL con Sequelize ORM
- **Autenticación:** JWT
- **Control de Acceso:** Roles `admin` y `encargado`
- **Despliegue sugerido:** Railway / Render / Vercel

---

## 👥 Roles

- **Admin:** Acceso total al sistema
- **Encargado de puerta:** Solo puede acceder a preventa y venta en taquilla (sin acceso a montos)

---

## 🧪 User Stories

### Login
- Como **usuario**, quiero loguearme con email y contraseña.
- Como **sistema**, debo redirigir al usuario a la vista según su rol.

### Gastos (`/home/expenses`)
- Como **admin**, quiero cargar un nuevo gasto (con descripción, monto, fecha y persona).
- Como **admin**, quiero ver una tabla con los gastos detallados.
- Como **admin**, quiero ver el **total de gastos general** y **por cada organizadora**.

### Entradas: Preventa (`/home/preorders`)
- Como **admin**, quiero registrar entradas vendidas en preventa con datos del comprador.
- Como **admin**, quiero editar o eliminar registros de preventa si es necesario.
- Como **admin**, quiero ver una lista de preventas ordenadas por fecha o nombre.

### Ingresos (`/home/income`)
- Como **admin**, quiero ver una tabla de ingresos (preventa + taquilla).
- Como **admin**, quiero ver el total recaudado y el desglose por método de pago y origen (preventa o taquilla).

### Dashboard (`/home/dashboard`)
- Como **admin**, quiero ver un resumen general con:
  - Total de ingresos
  - Total de gastos
  - Ganancia neta
  - Distribución de ganancia entre organizadoras
  - Gráficos con información relevante
- Como **admin**, quiero poder hacer clic en cada tarjeta resumen para ir al detalle.

### Configuración (`/home/settings`)
- Como **admin**, quiero modificar el precio de la entrada.
- Como **admin**, quiero definir valores por defecto del sistema.

---

### Participantes preventa (`/staff/preorders`)
- Como **encargado**, quiero buscar una persona que haya comprado entradas en preventa.
- Como **encargado**, quiero marcar cuántas personas entraron de su grupo.
- Como **encargado**, no debo ver totales ni números del sistema.

### Venta en taquilla (`/staff/tickets`)
- Como **encargado**, quiero registrar ventas en puerta (nombre, cantidad, método).
- Como **encargado**, quiero registrar si ya entraron al evento.
- Como **encargado**, no debo ver totales ni números del sistema.
---

## 📄 Pantallas y Funcionalidades

| Pantalla                | Ruta                | Rol       | Funcionalidades                                                                 |
|-------------------------|---------------------|-----------|---------------------------------------------------------------------------------|
| Login                   | `/login`            | Todos     | Ingreso con credenciales, redirección por rol                                   |
| Home Admin              | `/home`             | Admin     | Navegación general                                                              |
| Gastos                  | `/home/expenses`    | Admin     | Ver, cargar, filtrar gastos + totales generales y por organizadora              |
| Ingresos                | `/home/income`      | Admin     | Ver ingresos de preventa y taquilla, ver totales                                |
| Entradas (Preventa)     | `/home/preorders`   | Admin     | Alta de entradas anticipadas, edición, listado completo                         |
| Dashboard               | `/home/dashboard`   | Admin     | Resumen de ingresos, gastos, ganancias y repartos                               |
| Configuración           | `/home/settings`    | Admin     | Modificación de precio de entrada y parámetros                                  |
| Home Encargado          | `/staff`            | Encargado | Navegación limitada                                                             |
| Participantes preventa  | `/staff/preorders`  | Encargado | Búsqueda, control de asistencia por grupo                                       |
| Venta en taquilla       | `/staff/tickets`    | Encargado | Registro de ventas en puerta, sin acceso a dinero                               |

