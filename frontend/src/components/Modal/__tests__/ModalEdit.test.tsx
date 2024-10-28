import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import { ModalContext } from '@state/Modal';
import Modal from '../Modal';
import { ModalTypes } from '../types';

const mockCloseModal = jest.fn();
const mockShowModal = jest.fn();
const mockCta = jest.fn();

const renderModal = () => {
    return render(
        <ModalContext.Provider value={{ show: true, closeModal: mockCloseModal, showModal: mockShowModal }}>
            <Modal type={ModalTypes.EDIT} cta={mockCta} />
        </ModalContext.Provider>
    );
};

describe('Modal Edit', () => {
    it('should not render modal when show is false', () => {
        render(
            <ModalContext.Provider value={{ show: false, closeModal: mockCloseModal, showModal: mockShowModal }}>
                <Modal type={ModalTypes.EDIT} cta={mockCta} />
            </ModalContext.Provider>
        );
        expect(screen.queryByText('Annulla')).not.toBeInTheDocument();
        expect(screen.queryByText('Conferma')).not.toBeInTheDocument();
    });

    it('should render edit modal correctly', () => {
        renderModal();

        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(screen.getByText('Annulla')).toBeInTheDocument();
        expect(screen.getByText('Conferma')).toBeInTheDocument();
    });


    it('should call closeModal when cancel button is clicked', () => {
        const contextValue = {
            show: true,
            closeModal: mockCloseModal,
            showModal: mockShowModal
        };

        render(
            <ModalContext.Provider value={contextValue}>
                <Modal type={ModalTypes.EDIT} />
            </ModalContext.Provider>
        );

        fireEvent.click(screen.getByText('Annulla'));
        expect(contextValue.closeModal).toHaveBeenCalled();
    });
});