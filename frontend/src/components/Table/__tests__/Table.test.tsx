import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../Table';

jest.mock('../Pagination', () => jest.fn(() => <div>Mocked Pagination</div>));

describe('Table Component', () => {
    const columns = ['Name', 'Age', 'Address'];
    const rows = [
        ['John Doe', '30', '123 Main St'],
        ['Jane Smith', '25', '456 Oak St']
    ];
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const paginationProps = {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 50,
        onPageChange: jest.fn(),
        onItemsPerPageChange: jest.fn(),
    };

    it('renders table with data', () => {
        render(<Table rows={rows} columns={columns} onEdit={onEdit} onDelete={onDelete} {...paginationProps} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Mocked Pagination')).toBeInTheDocument();
    });

    it('renders no data message when rows are empty', () => {
        render(<Table rows={[]} columns={columns} onEdit={onEdit} onDelete={onDelete} {...paginationProps} />);
        
        expect(screen.getByText('Non ci sono dati')).toBeInTheDocument();
    });

    it('calls onEdit when edit button is clicked', () => {
        render(<Table rows={rows} columns={columns} onEdit={onEdit} onDelete={onDelete} {...paginationProps} />);
        
        fireEvent.click(screen.getAllByText('Modifica')[0]);
        expect(onEdit).toHaveBeenCalledWith(0);
    });

    it('calls onDelete when delete button is clicked', () => {
        render(<Table rows={rows} columns={columns} onEdit={onEdit} onDelete={onDelete} {...paginationProps} />);
        
        fireEvent.click(screen.getAllByText('Elimina')[0]);
        expect(onDelete).toHaveBeenCalledWith(0);
    });
});
