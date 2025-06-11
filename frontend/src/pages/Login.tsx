import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css';
import { login } from '../services/authService';  // Importa la función login

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usamos la función login del servicio, que usa el axios con baseURL correcta
      const { token, user } = await login(username, password);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/home');
      } else if (user.role === 'door') {
        navigate('/door/home');
      }
    } catch (error) {
      console.log('Credenciales incorrectas: ', error);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          className={styles.input}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  );
}
