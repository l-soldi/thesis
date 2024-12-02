import React from 'react'

interface TableProps {
    rows: string[][];
    columns: string[];
}

const Table = ({ rows, columns }: TableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={`col-${index}`}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={`row-${index}`}>
                        {Object.values(row).map((value, i) => (
                            <td key={`data-${i}`}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;