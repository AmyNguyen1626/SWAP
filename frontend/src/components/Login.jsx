import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            // Map Firebase error codes to friendly messages
            switch (err.code) {
                case "auth/user-disabled":
                    setError("This account has been suspended. Please contact support.");
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password. Please try again.");
                    break;
                case "auth/user-not-found":
                    setError("No account found with this email.");
                    break;
                case "auth/invalid-email":
                    setError("Please enter a valid email address.");
                    break;
                default:
                    setError("Login failed. Please try again later.");
                    console.error(err);
            }
        }
    };

    return (
        <div className="login-container">
            <img src="/assets/logo.png" alt="Swap logo" className="login-logo" />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" onClick={handleSubmit}>Login</button>

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

            <span className="signup-link">
                New to Swap? <a href="/register">Create an Account Here</a>
            </span>
        </div>
    );
}