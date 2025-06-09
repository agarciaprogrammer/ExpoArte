import React from 'react'; // ahora sí se usa
import styles from './Table.module.css';

export interface TableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
  onRowClick?: (index: number) => void;
  onSort?: (index: number) => void;
}

export default function Table({ headers, rows, onRowClick, onSort }: TableProps) {
  if (!rows) return null;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} onClick={() => onSort?.(i)} style={{ cursor: 'pointer' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} onClick={() => onRowClick?.(i)} style={{ cursor: 'pointer' }}>
            {row.map((cell: React.ReactNode, j: number) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
