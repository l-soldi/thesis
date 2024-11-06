import { MouseEvent } from 'react';
import './style.css';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Card = ({ title, description, imageUrl, price, handleClick } : CardProps) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className='card-content'>
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <div className='card-foot'>
                    <p className="card-price">€ {price.toFixed(2)}</p>
                    <button className="card-cta" onClick={handleClick}>Scegli</button>
                </div>
            </div>
        </div>
    );
};

export default Card;