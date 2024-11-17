import Card from '../Card';
import './style.css';

type Card = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

type Props = {
    handleClick: (id: number) => void;
    idChosen: number;
    data: Card[]
}

const CardCarousel = ({ handleClick, idChosen, data } : Props) => {
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
