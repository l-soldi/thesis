import React, { useEffect, useState } from 'react';
import './style.css';

interface CardProps {
    title: string;
    description: string;
    benefits: string[];
    price: number;
}

const Card: React.FC<CardProps> = ({ title, description, benefits, price }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('https://api.example.com/image'); //TODO: Replace with unsplash API
                const data = await response.json();
                setImageUrl(data.url);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []);

    return (
        <div className="card">
            {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>
            <ul className="card-benefits">
                {benefits.map((benefit, index) => (
                    <li key={`benefit ${index}`}>{benefit}</li>
                ))}
            </ul>
            <p className="card-price">${price.toFixed(2)}</p>
        </div>
    );
};

export default Card;