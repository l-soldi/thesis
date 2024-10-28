import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, act } from '@testing-library/react';
import useModal from '../useModal';

const TestComponent = () => {
    const { show, showModal, closeModal } = useModal();
    return (
        <div>
            <span data-testid="modal-state">{show.toString()}</span>
            <button onClick={showModal}>Show Modal</button>
            <button onClick={closeModal}>Close Modal</button>
        </div>
    );
};

describe('useModal hook', () => {
    it('should initialize with show as false', () => {
        render(<TestComponent />);
        expect(screen.getByTestId('modal-state').textContent).toBe('false');
    });

    it('should set show to true when showModal is called', async () => {
        render(<TestComponent />);
        const showButton = screen.getByText('Show Modal');
        fireEvent.click(showButton);

        await act(async () => {
            expect(screen.getByTestId('modal-state').textContent).toBe('true');
        })
    });

    it('should set show to false when closeModal is called', async () => {
        render(<TestComponent />);
        const showButton = screen.getByText('Show Modal');
        const closeButton = screen.getByText('Close Modal');
        fireEvent.click(showButton);
        fireEvent.click(closeButton);
        await act(async () => {
            expect(screen.getByTestId('modal-state').textContent).toBe('false');
        })
    });
});