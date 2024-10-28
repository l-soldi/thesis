import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { ToastContext } from '@state/Toast';
import Toast from '../Toast';
import { ToastVariants } from '../enum';

describe('Toast Component', () => {
    const closeToast = jest.fn();
    const showSuccessToast = jest.fn();
    const showErrorToast = jest.fn();

    const renderToast = (show: boolean, message: string, variant: ToastVariants) => {
        return render(
            <ToastContext.Provider value={{ closeToast, show, showSuccessToast, showErrorToast }}>
                <Toast show={show} message={message} variant={variant} />
            </ToastContext.Provider>
        );
    };

    it('should render the toast with the correct message and variant', () => {
        renderToast(true, 'Test Message', ToastVariants.SUCCESS);
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('should call closeToast after 3 seconds', () => {
        jest.useFakeTimers();
        renderToast(true, 'Test Message', ToastVariants.SUCCESS);
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(closeToast).toHaveBeenCalled();
        jest.useRealTimers();
    });

    it('should clear timeout on unmount', () => {
        jest.useFakeTimers();
        const { unmount } = renderToast(true, 'Test Message', ToastVariants.SUCCESS);
        unmount();
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(closeToast).not.toHaveBeenCalled();
        jest.useRealTimers();
    });
});