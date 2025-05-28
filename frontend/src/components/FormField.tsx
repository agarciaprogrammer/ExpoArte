import styles from './FormField.module.css';

export interface FormFieldProps {
  label: string;
  name: string;
  type: string; // obligatorio
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[];
}

export default function FormField({ label, type, name, value, onChange, options }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      {type === 'select' && options ? (
        <select name={name} value={value} onChange={onChange}>
          <option value="">Seleccionar</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} />
      )}
    </div>
  );
}
