import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import "./Navbar.css";

export default function Navbar() {
    const { currentUser } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                {currentUser && (
                    <span className="user-email">({currentUser.email})</span>
                )}
            </div>
        </nav>
    );
}