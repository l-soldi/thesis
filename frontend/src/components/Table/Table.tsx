import React from 'react';
import Pagination, { PaginationProps } from './Pagination';
import './style.css'

interface TableProps {
    rows: string[][];
    columns: string[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

type Props = TableProps & PaginationProps

const Table = ({ rows, columns, onEdit, onDelete, ...pagination }: Props) => {

    if(!rows.length) return <p>Non ci sono dati</p>
    return (
        <>
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
            <Pagination {...pagination} />
        </>
    );
};

export default Table;