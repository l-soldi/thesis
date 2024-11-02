import React from 'react';

interface DateInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label>
                {label}
                <input type="date" value={value} onChange={handleChange} />
            </label>
        </div>
    );
};

export default DateInput;