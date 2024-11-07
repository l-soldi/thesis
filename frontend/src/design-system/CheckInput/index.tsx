import React, { useState } from 'react';

interface CheckInputProps {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const CheckInput: React.FC<CheckInputProps> = ({ label, checked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label>
            <input type="checkbox" checked={isChecked} onChange={handleChange} />
            {label}
        </label>
    );
};

export default CheckInput;