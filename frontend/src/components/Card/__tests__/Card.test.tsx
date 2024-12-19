import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    imageUrl: 'https://via.placeholder.com/150',
    price: 100,
    handleClick: jest.fn(),
    isChosen: false
};

describe('Card Component', () => {

    it('renders Card component with props', () => {
        render(<Card {...mockProps} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByAltText('Test Title')).toHaveAttribute('src', 'https://via.placeholder.com/150');
        expect(screen.getByText('€ 100.00')).toBeInTheDocument();
        expect(screen.getByText('Scegli')).toBeInTheDocument();
    });

    it('calls handleClick when card is clicked', () => {
        render(<Card {...mockProps} />);

        fireEvent.click(screen.getByRole('button'));
        expect(mockProps.handleClick).toHaveBeenCalled();
    });

    it('button displays "Selezionato" when isChosen is true', () => {
        render(<Card {...mockProps} isChosen={true} />);

        expect(screen.getByText('Selezionato')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('button displays "Scegli" when isChosen is false', () => {
        render(<Card {...mockProps} isChosen={false} />);

        expect(screen.getByText('Scegli')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeEnabled();
    });
});