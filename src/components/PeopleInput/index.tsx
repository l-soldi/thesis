import React, { useState } from 'react';
import './style.css';

const PeopleInput: React.FC = () => {
    const [numberOfPeople, setNumberOfPeople] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfPeople(Number(event.target.value));
    };

    return (
        <div>
            <label htmlFor="people-input">Numero di persone:</label>
            <input
                id="people-input"
                type="number"
                value={numberOfPeople}
                onChange={handleChange}
                min="0"
            />
        </div>
    );
};

export default PeopleInput;