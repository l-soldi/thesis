import './style.css';

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                MockExperiences
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <a href="/prenota">Prenota</a>
                </li>
                <li className="navbar-item">
                    <a href="/gestisci">Gestisci</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;