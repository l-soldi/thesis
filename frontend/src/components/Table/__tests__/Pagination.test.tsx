import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination, { PaginationProps } from '../Pagination';

const renderPagination = (props: Partial<PaginationProps> = {}) => {
    const defaultProps: PaginationProps = {
        currentPage: 1,
        itemsPerPage: 5,
        onPageChange: jest.fn(),
        onItemsPerPageChange: jest.fn(),
        totalItems: 50,
    };
    render(<Pagination {...defaultProps} {...props} />);
};

describe('Pagination', () => {
    it('renders correctly', () => {
        renderPagination();
    });

    it('displays the correct number of pages', () => {
        renderPagination({ totalItems: 25, itemsPerPage: 5 });
        expect(screen.getByText('1', { selector: 'button' })).toBeInTheDocument();
        expect(screen.getByText('2', { selector: 'button' })).toBeInTheDocument();
        expect(screen.getByText('...')).toBeInTheDocument();
        expect(screen.getByText('5', { selector: 'button' })).toBeInTheDocument();
    });

    it('calls onPageChange when a page number is clicked', () => {
        const onPageChange = jest.fn();
        renderPagination({ onPageChange });
        const button = screen.getByText('2', { selector: 'button' });
        fireEvent.click(button);
        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onItemsPerPageChange when items per page is changed', () => {
        const onItemsPerPageChange = jest.fn();
        renderPagination({ onItemsPerPageChange });
        fireEvent.change(screen.getByLabelText('Elementi per pagina:'), { target: { value: '10' } });
        expect(onItemsPerPageChange).toHaveBeenCalledWith(10);
    });

    it('disables the previous button on the first page', () => {
        renderPagination({ currentPage: 1 });
        expect(screen.getByText('Precedente')).toBeDisabled();
    });

    it('disables the next button on the last page', () => {
        renderPagination({ currentPage: 10, totalItems: 50, itemsPerPage: 5 });
        expect(screen.getByText('Successivo')).toBeDisabled();
    });

    it('renders ellipsis correctly', () => {
        renderPagination({ currentPage: 5, totalItems: 100, itemsPerPage: 5 });
        screen.getAllByText('...').forEach(elem =>expect(elem).toBeInTheDocument());
    }); 
});