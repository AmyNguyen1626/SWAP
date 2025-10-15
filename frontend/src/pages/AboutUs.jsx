export default function AboutUs() {
    return (
        <div>
            <h2 style={{ textAlign: "left" }}>About Us</h2>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "40px" }}>
                <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: "bolder" }}>Welcome to swap - the modern way to trade vehicles with people who share your passion for the open road!</p>
                    <p>Swap What You Have. Find What You Want. Our motto. Captures the heart of what we do, we believe that everyone deserves the freedom to drive what they love without being constricted by traditional buying and selling.</p>
                    <p>‘swap’ was created to make vehicle trading fair, simple and fun - Whether your looking to trade in your daily driver for a weekend toy or swap your project car for something new. Our platform connects you directly with other’s who are ready to trade!</p>
                    <p>We’re driven by trust, transparency and community. With easy to use tools, verified listing and secure communication. With ‘swap’ you’re in charge of your own vehicle journey - <em>helping you to move on from what you have, to what you want faster than ever before.</em></p>
                    <p>Join the community.</p>
                    <p>Discover a smarter way to swap.</p>
                    <p>swap - <strong>Swap What You Have. Find What You Want.</strong></p>
                </div>

                <div style={{ flex: 1, textAlign: "center", marginRight: "40px" }}>
                    <img
                        src="/assets/about-us.png"
                        alt="About Us"
                        style={{ maxWidth: "90%", borderRadius: "12px" }}
                    />
                </div>
            </div>

            <h2 style={{ textAlign: "right" }}>Contact Us</h2>
        </div>
    );
}