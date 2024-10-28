import React from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import useToast from '../useToast';
import { ToastVariants } from '../../Toast/enum';

const TestComponent = ({ callback }: { callback: () => any }) => {
    callback();
    return null;
};

describe('useToast', () => {
    it('should initialize with default values', () => {
        let result: any;
        render(<TestComponent callback={() => { result = useToast(); }} />);

        expect(result.show).toBe(false);
        expect(result.variant).toBe(ToastVariants.SUCCESS);
        expect(result.message).toBe('');
    });

    it('should show success toast', () => {
        let result: any;
        render(<TestComponent callback={() => { result = useToast(); }} />);

        act(() => {
            result.showSuccessToast();
        });

        expect(result.show).toBe(true);
        expect(result.variant).toBe(ToastVariants.SUCCESS);
        expect(result.message).toBe('Operazione avvenuta con successo.');
    });

    it('should show error toast with default message', () => {
        let result: any;
        render(<TestComponent callback={() => { result = useToast(); }} />);

        act(() => {
            result.showErrorToast();
        });

        expect(result.show).toBe(true);
        expect(result.variant).toBe(ToastVariants.ERROR);
        expect(result.message).toBe('Qualcosa e` andato storto, riprova.');
    });

    it('should show error toast with custom message', () => {
        let result: any;
        const customMessage = 'Custom error message';
        render(<TestComponent callback={() => { result = useToast(); }} />);

        act(() => {
            result.showErrorToast(customMessage);
        });

        expect(result.show).toBe(true);
        expect(result.variant).toBe(ToastVariants.ERROR);
        expect(result.message).toBe(customMessage);
    });

    it('should close toast', () => {
        let result: any;
        render(<TestComponent callback={() => { result = useToast(); }} />);

        act(() => {
            result.showSuccessToast();
        });

        act(() => {
            result.closeToast();
        });

        expect(result.show).toBe(false);
    });
});