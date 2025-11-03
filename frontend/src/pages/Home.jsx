import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import ListingCard from "../components/ListingCard";
import { fetchListings } from "../services/listingService";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function Home() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function getAllListings() {
            setLoading(true);
            try{
                const result = await fetchListings();

                const activeListings = result.filter(listing => 
                listing.status === "active" || !listing.status
            ); 
            // shows only the first 6 active listings
            setListings(activeListings.slice(0,6));
            } catch (err){
                setError(err.message);
            } finally{
                setLoading(false);
            }
        }

        getAllListings();
    }, []
);

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
                {listings.map((listing) => (
                    <SwiperSlide 
                    key={listing.id} 
                    style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        paddingBottom: "30px", 
                        paddingTop: "30px" 
                        }}>
                        <ListingCard 
                        id={listing.id}
                        image ={
                            listing.images && listing.images[0]
                            ? listing.images [0]
                            :"/assets/hyundai-santefe.png" // image for now as a placeholder
                        } 
                        name={listing.listingName}
                        location={listing.location}
                        price={listing.price}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div>
                <h2 style={{ letterSpacing: "2px", marginTop: "40px" }}>From Swapping to Shopping - Find Your Next Ride</h2>
                <button onClick={() => navigate("/browse")}>
                    Start Browsing
                </button>
            </div>
        </div>
    );
}
