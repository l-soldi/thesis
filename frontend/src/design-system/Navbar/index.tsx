import { useState } from 'react';
import './style.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                MockExperiences
            </div>
            <button className="navbar-toggle" onClick={onToggleMenu}>
                <span className="navbar-toggle-icon">
                    {isOpen ? '✖' : '☰'}
                </span>
            </button>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <a href="prenota">Prenota</a>
                </li>
                <li className="navbar-item">
                    <a href="gestisci">Gestisci</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;