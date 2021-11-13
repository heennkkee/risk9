import { faAirFreshener, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import './sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    console.log(location);
    return (
        <Nav variant="pills" className="d-flex flex-column flex-shrink-0 text-center border-end sidebar bg-light">
            <Nav.Item>
                <Link to="/" className={`nav-link px-3 ${location.pathname === '/' ? 'active' : ''}`}><FontAwesomeIcon icon={faHome} size="2x" /></Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/test" className={`nav-link px-3 ${location.pathname === '/test' ? 'active' : ''}`}><FontAwesomeIcon icon={faAirFreshener} size="2x" /></Link>
            </Nav.Item>
        </Nav>
    )
}

export default Sidebar;