import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { DataContext } from '../../context/DataContext'; //TODO: create Context

const DataForm: React.FC<DataFormProps> = () => {
    const { initialCheckInDate, initialCheckOutDate, initialRoomType } = useContext(DataContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        checkInDate: initialCheckInDate,
        checkOutDate: initialCheckOutDate,
        roomType: initialRoomType,
    });

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            checkInDate: initialCheckInDate,
            checkOutDate: initialCheckOutDate,
            roomType: initialRoomType,
        }));
    }, [initialCheckInDate, initialCheckOutDate, initialRoomType]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: add validation logic
        console.log('Form data submitted:', formData);
        // TODO: Add form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirm-email">Conferma email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} //TODO: add email confirmation logic
                    required
                />
            </div>
            <div>
                <label htmlFor="checkInDate">Check-in Date:</label>
                <input
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="checkOutDate">Check-out Date:</label>
                <input
                    type="date"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="privacyPolicy">
                    <input
                        type="checkbox"
                        id="privacyPolicy"
                        name="privacyPolicy"
                        checked={formData.privacyPolicy || false}
                        onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.checked })}
                        required
                    />
                    Accetto l'informativa sulla privacy
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DataForm;