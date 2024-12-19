import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../Form';
import { formatDate } from '../../../utils';

describe('Form Component', () => {
    const mockOnSubmit = jest.fn();
    const defaultValues = {
        date: '2023-10-10',
        peopleNum: 2,
        name: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        expId: 1
    };

    it('renders form with default values', () => {
        render(<Form onSubmit={mockOnSubmit} defaultValues={defaultValues} />);

        expect(screen.getByLabelText('Giorno')).toHaveValue(defaultValues.date);
        expect(screen.getByLabelText('Numero di persone')).toHaveValue(defaultValues.peopleNum);
        expect(screen.getByLabelText('Nome')).toHaveValue(defaultValues.name);
        expect(screen.getByLabelText('Cognome')).toHaveValue(defaultValues.lastname);
        expect(screen.getByLabelText('Email')).toHaveValue(defaultValues.email);
        expect(screen.getByLabelText('Telefono')).toHaveValue(defaultValues.phone);
    });

    it('calls onSubmit with form data when submitted', async () => {
        render(<Form onSubmit={mockOnSubmit} defaultValues={defaultValues} />);

        fireEvent.submit(screen.getByRole('form'));

        expect(mockOnSubmit).toHaveBeenCalledWith({
            date: defaultValues.date,
            peopleNum: defaultValues.peopleNum.toString(),
            name: defaultValues.name,
            lastname: defaultValues.lastname,
            email: defaultValues.email,
            phone: defaultValues.phone,
            expId: defaultValues.expId.toString()
        });
    });

    it('renders form with today\'s date if no default value is provided', () => {
        const today = formatDate(new Date());
        render(<Form onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText('Giorno')).toHaveValue(today);
    });

    it('validates required fields', () => {
        render(<Form onSubmit={mockOnSubmit} />);

        fireEvent.submit(screen.getByRole('form'));

        expect(screen.getByLabelText('Giorno')).toBeValid();
        expect(screen.getByLabelText('Numero di persone')).toBeValid();
        expect(screen.getByLabelText('Nome')).toBeInvalid();
        expect(screen.getByLabelText('Cognome')).toBeInvalid();
        expect(screen.getByLabelText('Email')).toBeInvalid();
        expect(screen.getByLabelText('Telefono')).toBeInvalid();
    });
});
