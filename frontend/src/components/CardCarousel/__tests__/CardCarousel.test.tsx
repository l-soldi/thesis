import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import CardCarousel from '../CardCarousel';

const mockData = [
    { id: 1, title: 'Card 1', description: 'Description 1', price: 10, imageUrl: 'image1.jpg' },
    { id: 2, title: 'Card 2', description: 'Description 2', price: 20, imageUrl: 'image2.jpg' },
    { id: 3, title: 'Card 3', description: 'Description 3', price: 30, imageUrl: 'image3.jpg' },
];

describe('CardCarousel', () => {
    const handleClick = jest.fn();

    beforeEach(() => {
        render(<CardCarousel handleClick={handleClick} idChosen={1} data={mockData} />);
    });

    it('renders all cards', () => {
        const cards = screen.getAllByRole('button');
        expect(cards).toHaveLength(mockData.length);
    });

    it('pre-selects the first card', () => {
        const cardsBtns = screen.getAllByRole('button');

        expect(cardsBtns).toHaveLength(mockData.length);
        expect(cardsBtns[0]).toBeDisabled();
        expect(cardsBtns[1]).toBeEnabled();
        expect(cardsBtns[2]).toBeEnabled();
    });

    it('calls handleClick when a card is clicked', () => {
        const cardBtn = screen.getAllByText('Scegli', { selector: 'button' });
        fireEvent.click(cardBtn[0]); //click sulla prima card avente btn text "Scegli"
        // di default la prima card ha id 1 ed è pre-selezionata
        expect(handleClick).toHaveBeenCalledWith(2);
    });
});