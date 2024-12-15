import { useMemo } from 'react';
import { getUserIdFromLocalStorage } from '@localStorage/utils';
import { useLocation } from 'react-router-dom';
import './style.css';

const Navbar = () => {
    const id = getUserIdFromLocalStorage();
    const {pathname: location} = useLocation();

    const routes = useMemo(() => {
        if (id) return [
        { path: ["/prenota"], href: "/prenota", label: "Prenota" },
        { path: ["/gestisci"], href: "/gestisci", label: "Gestisci" },
        { path: ["/login"], href: "/login", label: "Logout" }
    ]}, [id])

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">
                MockExperiences
            </h1>
            <ul className="navbar-menu">
                {routes?.map((route, index) => (
                    <li key={`route-${index}`} className="navbar-item">
                        <a href={route.href} 
                            className={route.path.includes(location) ? "selected" : ""}
                        >{route.label}</a>
                    </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Navbar;