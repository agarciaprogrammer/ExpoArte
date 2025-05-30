import styles from './FormField.module.css';
export interface FormFieldProps {
  label: string;
  name: string;
  type: string; // obligatorio
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[];
  required?: boolean;
}

export default function FormField({ label, type, name, value, onChange, options, required }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      {type === 'select' && options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.select}
          required={required}
        >
          <option value="">Seleccionar</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.input}
          required
        />
      )}
    </div>
  );
}
