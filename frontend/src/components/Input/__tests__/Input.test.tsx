import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
    test('renders input with label', () => {
        render(<Input type="text" label="Name" />);
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    test('renders correct suggestion for text input', () => {
        render(<Input type="text" label="Name" />);
        expect(screen.getByText('Inserisci solo lettere')).toBeInTheDocument();
    });

    test('renders correct suggestion for email input', () => {
        render(<Input type="email" label="Email" />);
        expect(screen.getByText("Inserisci un'email valida")).toBeInTheDocument();
    });

    test('renders correct suggestion for tel input', () => {
        render(<Input type="tel" label="Phone" />);
        expect(screen.getByText('Inserisci un numero di telefono valido, avente almeno 8 caratteri')).toBeInTheDocument();
    });

    test('renders correct suggestion for date input', () => {
        render(<Input type="date" label="Date" />);
        expect(screen.getByText('Inserisci una data valida')).toBeInTheDocument();
    });

    test('renders correct suggestion for number input', () => {
        render(<Input type="number" label="Number" />);
        expect(screen.getByText('Inserisci solo cifre numeriche')).toBeInTheDocument();
    });

    test('renders correct suggestion for password input', () => {
        render(<Input type="password" label="Password" />);
        expect(screen.getByText('Inserisci una password valida')).toBeInTheDocument();
    });

    test('does not render suggestion when hidden is true', () => {
        render(<Input type="text" label="Name" hidden />);
        expect(screen.queryByText('Inserisci solo lettere')).not.toBeInTheDocument();
    });
});