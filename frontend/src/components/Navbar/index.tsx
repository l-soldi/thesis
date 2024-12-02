import { useEffect, useMemo } from 'react';
import { getUserIdFromLocalStorage } from '../../localStorage/utils';
import './style.css';

const Navbar = () => {
    // TODO: fix routes
    const location = window.location.pathname;
    const id = getUserIdFromLocalStorage();

    const routes = useMemo(() => [
        { path: ["/", "/prenota"], href: "/prenota", label: "Prenota" },
        { path: ["/gestisci","/gestisci/:id"], href: "/gestisci", label: "Gestisci" },
        ...(id ? [{ path: ["/login"], href: "/login", label: "Logout" }] : [])
    ], [id])

    useEffect(() => {
        if (!id && location !== '/login') {
            window.location.href = '/login';
        }
    }, [id, location]);

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">
                MockExperiences
            </h1>
            <ul className="navbar-menu">
                {routes.map((route, index) => (
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