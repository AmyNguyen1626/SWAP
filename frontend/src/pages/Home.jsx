import { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            if (!currentUser) return;

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

    if (!currentUser) {
        return <p>Please login to see your profile.</p>;
    }

    return (
        <div>
            <h1>Home Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {profile ? (
                <p>Hello, {profile.email}!</p>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}
