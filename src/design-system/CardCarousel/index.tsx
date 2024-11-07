import { experiences as data } from './data';
import Card from '../Card';
import './style.css';

const CardCarousel = ({handleClick, idChosen} : {handleClick: (id: number) => void, idChosen: number}) => {
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
                    isChosen={card.id === idChosen}
                />
            ))}
        </div>
    );
};

export default CardCarousel;
