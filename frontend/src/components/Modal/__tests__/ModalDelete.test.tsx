import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';
import { ModalTypes } from '../types';
import { ModalContext } from '@state/Modal';

const mockCloseModal = jest.fn();
const mockShowModal = jest.fn();
const mockCta = jest.fn();

const renderModal = (type: ModalTypes | null) => {
    return render(
        <ModalContext.Provider value={{ show: true, closeModal: mockCloseModal, showModal: mockShowModal }}>
            <Modal type={type} cta={mockCta} />
        </ModalContext.Provider>
    );
};

describe('Modal Delete', () => {
    it('should not render modal when show is false', () => {
        render(
            <ModalContext.Provider value={{ show: false, closeModal: mockCloseModal, showModal: mockShowModal }}>
                <Modal type={ModalTypes.DELETE} cta={mockCta} />
            </ModalContext.Provider>
        );
        expect(screen.queryByText('Annulla')).not.toBeInTheDocument();
        expect(screen.queryByText('Conferma')).not.toBeInTheDocument();
    });

    it('should render delete modal correctly', () => {
        renderModal(ModalTypes.DELETE);
        expect(screen.getByText('Annulla')).toBeInTheDocument();
        expect(screen.getByText('Conferma')).toBeInTheDocument();
    });

    it('should call closeModal when cancel button is clicked', () => {
        renderModal(ModalTypes.DELETE);
        fireEvent.click(screen.getByText('Annulla'));
        expect(mockCloseModal).toHaveBeenCalled();
    });

    it('should call cta and closeModal when confirm button is clicked', () => {
        renderModal(ModalTypes.DELETE);
        fireEvent.click(screen.getByText('Conferma'));
        expect(mockCta).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
    });

});