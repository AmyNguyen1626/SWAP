import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import ListingCard from "../components/ListingCard";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function Home() {
    const mockListings = [
        {
            image: "/assets/ford-mustang.png",
            name: "Ford Mustang Coupe",
            condition: "Very Good",
            location: "Melbourne, VIC",
            price: "26400"
        },
        {
            image: "/assets/hyundai-santafe.png",
            name: "Hyundai Santa Fe",
            condition: "Excellent",
            location: "Brisbane, QLD",
            price: "32100"
        },
        {
            image: "/assets/jeep-wrangler.png",
            name: "Jeep Wrangler",
            condition: "Good",
            location: "Adelaide, SA",
            price: "49000"
        },
        {
            image: "/assets/mitsubishi-evo.png",
            name: "Mitsubishi Lancer Evo",
            condition: "Very Good",
            location: "Sydney, NSW",
            price: "28400"
        },
        {
            image: "/assets/nissan-silvia.png",
            name: "Nissan Silvia S15",
            condition: "Excellent",
            location: "Perth, WA",
            price: "36000"
        },
        {
            image: "/assets/toyota-trueno.png",
            name: "Toyota AE86 Trueno",
            condition: "Fair",
            location: "Canberra, ACT",
            price: "14000"
        },
    ];

    const navigate = useNavigate();

    return (
        // changed from 150 to 0
        <div style={{marginTop: "0px"}}>
            <Swiper
                modules={[EffectCoverflow, Autoplay]}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                spaceBetween={50}
                effect={"coverflow"}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 50,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                }}
            >
                {mockListings.map((listing, index) => (
                    <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center", paddingBottom: "30px", paddingTop: "30px" }}>
                        <ListingCard {...listing} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div>
                <h2 style={{ letterSpacing: "2px", marginTop: "40px" }}>Swap What You Have. Find What You Want.</h2>
                <button onClick={() => navigate("/browse")}>
                    Start Browsing
                </button>
            </div>
        </div>
    );
}
