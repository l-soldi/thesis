import React from 'react';
import './style.css';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, price }) => {

    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="card-image" />
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>
            <p className="card-price">${price.toFixed(2)}</p>
        </div>
    );
};

export default Card;