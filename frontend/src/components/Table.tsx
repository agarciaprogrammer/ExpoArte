import styles from './Table.module.css';

export interface TableProps {
  headers: string[];
  rows: (string | number)[][];
}

export default function Table({ headers, rows }: TableProps) {
  if (!rows) return null; // O algún spinner de carga

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
