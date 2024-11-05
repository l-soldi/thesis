import { experiences as data } from './data';
import Card from '../Card';
import './style.css';

const CardCarousel = () => {
    return (
        <div className="card-carousel">
            {data.map(card => (
                <Card key={card.id} title={card.title} description={card.description} price={card.price} imageUrl={card.imageUrl}/>
            ))}
        </div>
    );
};

export default CardCarousel;
