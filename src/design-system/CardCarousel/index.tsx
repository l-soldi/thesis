import React from 'react';
import { roomsData as data } from './data';
import Card from '../Card';
import './style.css';

const CardCarousel = () => {
    return (
        <div className="card-carousel">
            {data.map(card => (
                <Card key={card.id} title={card.title} description={card.description} benefits={card.benefits} price={card.price} />
            ))}
        </div>
    );
};

export default CardCarousel;
