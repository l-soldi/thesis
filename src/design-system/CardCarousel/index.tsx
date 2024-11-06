import { experiences as data } from './data';
import Card from '../Card';
import './style.css';

const CardCarousel = ({handleClick} : {handleClick: (id: number) => void}) => {
    return (
        <div className="card-carousel">
            {data.map(card => (
                <Card
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    price={card.price}
                    imageUrl={card.imageUrl}
                    handleClick={() => handleClick(card.id)}
                />
            ))}
        </div>
    );
};

export default CardCarousel;
