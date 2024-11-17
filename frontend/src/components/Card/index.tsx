import { MouseEvent } from 'react';
import './style.css';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
    isChosen: boolean
}

const Card = ({ title, description, imageUrl, price, handleClick, isChosen } : CardProps) => {
    return (
        <div className="card" onClick={handleClick}>
            <img src={imageUrl} alt={title} className="card-image" />
            <div className='card-content'>
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <div className='card-foot'>
                    <p className="card-price">€ {price.toFixed(2)}</p>
                    <button onClick={handleClick} disabled={isChosen}>
                        {isChosen ? 'Selezionato' : 'Scegli'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;