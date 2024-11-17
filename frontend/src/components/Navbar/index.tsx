import { routes } from '../../router/routes';
import './style.css';

const Navbar = () => {
    const location = window.location.pathname;

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">
                MockExperiences
            </h1>
            <ul className="navbar-menu">
                {routes.map((route, index) => (
                    <li key={index} className={"navbar-item"}>
                        <a href={route.href} className={route.path.includes(location) ? "selected" : ""}>{route.label}</a>
                    </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Navbar;