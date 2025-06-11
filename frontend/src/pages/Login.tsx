import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css';
import { login } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { token, user } = await login(username, password);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Mostrar feedback de éxito
      setLoginSuccess(true);
      
      // Esperar 1.5 segundos antes de redirigir
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/home');
        } else if (user.role === 'door') {
          navigate('/door/home');
        }
      }, 1500);
      
    } catch (error) {
      console.log('Credenciales incorrectas: ', error);
      setError('Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        
        {/* Mensaje de error */}
        {error && <p className={styles.error}>{error}</p>}
        
        {/* Mensaje de éxito */}
        {loginSuccess && (
          <div className={styles.successMessage}>
            <p>✓ Login correcto</p>
            <p>Redirigiendo...</p>
          </div>
        )}

        <input
          type="text"
          placeholder="Usuario"
          className={styles.input}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          disabled={isLoading || loginSuccess}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={isLoading || loginSuccess}
        />

        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoading || loginSuccess}
        >
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}