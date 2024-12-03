import React from 'react'
import './style.css'

interface TableProps {
    rows: string[][];
    columns: string[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

const Table = ({ rows, columns, onEdit, onDelete }: TableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th className='cell' key={`col-${index}`}>{col}</th>
                    ))}
                    <th className='cell sticky'></th>
                    <th className='cell sticky'></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={`row-${index}`}>
                        {Object.values(row).map((value, i) => (
                            <td className='cell' key={`data-${i}`}>{value}</td>
                        ))}
                        <td className='cell sticky'>
                            <button onClick={() => onEdit(index)}>Modifica</button>
                        </td>
                        <td className='cell sticky'>
                            <button onClick={() => onDelete(index)}>Elimina</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;