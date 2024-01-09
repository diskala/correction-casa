import './style.scss'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <header class="header">
                <img src="/logo.svg" alt="Logo" />
                <div>
                    <NavLink to="/">Accueil</NavLink>
                    <NavLink to="/a-propos">A propos</NavLink>
                </div>
            </header>
        </>
    );
}