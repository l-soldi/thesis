import React from 'react';
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from '../Error';

describe('ErrorPage', () => {
    it('should display the error message', () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );
        expect(screen.getByText('404 - Pagina Non Trovata')).toBeInTheDocument();
        expect(screen.getByText('Spiacenti, la pagina che stai cercando non esiste.')).toBeInTheDocument();
    });

    it('should display GoBack button', () => {
        render(
            <MemoryRouter initialEntries={['/error']} >
                <ErrorPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('< Torna indietro'));
    });
});