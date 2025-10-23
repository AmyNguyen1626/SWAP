import { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";
import { useAuth } from "../contexts/useAuth";
import { auth } from "../firebase";  

export default function Profile() {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                // Get Firebase ID token
                const token = await getIdToken(currentUser);

                // Fetch protected profile route from backend
                const res = await fetch("http://localhost:3000/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch profile");

                const data = await res.json();
                setProfile(data.user); // user object from backend
            } catch (err) {
                setError(err.message);
            }
        }

        fetchProfile();
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/login"); // redirect to login page
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {profile ? (
                <p>Hello, {profile.email}!</p>
            ) : (
                <p>Loading profile...</p>
            )}
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}
