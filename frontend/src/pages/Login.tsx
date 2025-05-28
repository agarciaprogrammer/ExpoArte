// import { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de login sin backend
    // Aquí en el futuro se hará la validación
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Iniciar Sesión</h2>

        {/* Comentado: manejo de errores */}
        {/* {error && <p className={styles.error}>{error}</p>} */}

        <input
          type="email"
          placeholder="Correo"
          className={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  );
}
