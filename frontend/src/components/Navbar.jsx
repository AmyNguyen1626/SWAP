import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/useAuth";
import { auth } from "../firebase";
import "./Navbar.css";

export default function Navbar() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo/Brand */}
                <Link to="/" className="nav-brand">
                    <img src="/assets/logo.png" alt="Swap logo" className="nav-logo" />
                </Link>

                {/* Navigation Links */}
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/browse">Browse</Link>
                    <Link to="/about">About Us</Link>

                    {/* Show different links based on auth state */}
                    {currentUser ? (
                        <>
                            <Link to="/profile">Profile</Link>
                            <Link to="/create-listing">Create Listing</Link>
                            <span className="user-email">({currentUser.email})</span>
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}