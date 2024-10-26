import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/map" activeClassName="active">Map</NavLink></li>
                <li><NavLink to="/shelter-finder" activeClassName="active">Shelter Finder</NavLink></li>
                <li><NavLink to="/alerts" activeClassName="active">Alerts</NavLink></li>
            </ul>
        </nav>
    );
}
