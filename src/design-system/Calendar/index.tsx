import React, { useState } from 'react';
import './style.css';

interface DateRange {
    from: string;
    to: string;
}

const Calendar: React.FC = () => {
    const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' });

    const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({ ...dateRange, from: event.target.value });
    };

    const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({ ...dateRange, to: event.target.value });
    };

    return (
        <div>
            <label>
                Da:
                <input type="date" value={dateRange.from} onChange={handleFromDateChange} />
            </label>
            <label>
                A:
                <input type="date" value={dateRange.to} onChange={handleToDateChange} />
            </label>
        </div>
    );
};

export default Calendar;