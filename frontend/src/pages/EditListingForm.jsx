import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { editListing } from "../services/listingService";
import "./ListingDetail.css";

export default function EditListingForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        listingName: "",
        year: "",
        make: "",
        model: "",
        badge: "",
        price: "",
        odometer: "",
        bodyType: "",
        transmission: "",
        driveType: "",
        fuelType: "",
        engine: "",
        condition: "",
        location: "",
        description: "",
        images: [],
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // fetch listing details
    useEffect(() => {
        async function fetchListing (){
            try{
                const res = await fetch(`http://localhost:3000/api/listings/${id}`);
                if (!res.ok) throw new Error("Failed To Fetch Listing");
                const data = await res.json();

                setFormData({
                    listingName: data.listingName || "",
                     year: data.category?.year || "",
                     make: data.category?.make || "",
                     model: data.category?.model ||"",
                     badge: data.category?.badge || "",
                     price: data.price|| "",
                     odometer: data.category?.odometer || "",
                     bodyType: data.category?.bodyType || "",
                     transmission: data.category?.transmission || "",
                     driveType: data.category?.driveType || "",
                     fuelType: data.category?.fuelType || "",
                     engine: data.category?.engine || "",
                     condition: data.condition || "",
                     location: data.location || "",
                     description: data.description || "",
                     images: data.images || [],
                });
            } catch (err){
                alert("error Loading Listing: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchListing();
    }, [id]);

    // for handling input changes
    function handleChange(e){
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    }

    // for handling image uploads
    function handleImageChange(e) {
        const files = Array.from(e.target.files);
        setImageFiles(files);

        // show previews for new uploads
        const urls = files.mao((file) => URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    }

    // handling for form submission
    async function handleSubmit(e){
        e.preventDefault();
        setUploading(true);

        try{
            const token = await currentUser.getIdToken();
            const data = new FormData();

            data.append("listingName", formData.listingName);
            data.append("price", formData.price);
            data.append("condition", formData.condition);
            data.append("location", formData.location);
            data.append("description", formData.description);
            data.append(
                "category",
                JSON.stringify({
                    year: formData.year,
                    make: formData.make,
                    model: formData.model,
                    badge: formData.badge,
                    odometer: formData.odometer,
                    bodyType: formData.bodyType,
                    transmission: formData.transmission,
                    driveType: formData.driveType,
                    fuelType: formData.fuelType,
                    engine: formData.engine,
                })
            );

            imageFiles.forEach((file) => data.append("images", file));

            await editListing(id, data, token);

            alert("Listing Update Successfully!");
            navigate(`/listing/${id}`);
        } catch (err){
            console.error("Error Uploading Listing: ", err);
            alert("Error Updating Listing: " + err.message);
        } finally {
            setUploading(false);
        }
    }
    if (loading) {
        return <div className="create-listing-container"> <p> Loading Listing...</p></div>;
    }

    return(
        <div className="listing-detail-containter">
            <button className= "back-button" onClick={() => navigate("/browse")}>
                ← Back to Browse
            </button>
            <div className="listing-images-section">
                {formData.images.length > 0 ? (
                    formData.images.map((img, idx) => (
                        <img key ={idx} src= {img} alt={`Listing Image ${idx + 1}`} className="thumbnail" />
                    ))
                ):(
                    <p> No Images Available!</p>
                )}
                <input
                type= "file"
                multiple
                accept="image/*" 
                onChange={handleImageChange}
                disabled={uploading}
                style={{ marginTop: "1rem"}}
                />
            </div>

            <div className="listing-info-section">
                <h2>Edit Your Listing</h2>

                <form onSubmit={handleSubmit} className="create-listing-form">
                    <label>
                        Listing Name:
                        <input
                        type="text"
                        name="listingName"
                        value={formData.listingName}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Year:
                        <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Make:
                        <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Model:
                        <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Badge:
                        <input
                        type="text"
                        name="ybadgeear"
                        value={formData.bade}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Price:
                        <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Odometer:
                        <input
                        type="number"
                        name="odometer"
                        value={formData.odometer}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Body Type:
                        <input
                        type="text"
                        name="bodyType"
                        value={formData.bodyType}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Transmission:
                        <input
                        type="text"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Drive Type:
                        <input
                        type="text"
                        name="driveType"
                        value={formData.driveType}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Fuel Type:
                        <input
                        type="text"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Engine:
                        <input
                        type="text"
                        name="engine"
                        value={formData.engine}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Condition:
                        <input
                        type="text"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Location:
                        <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>
                        Description:
                        <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <div className= "action-buttons" style={{ marginTop: "1rem"}}>
                        <button type="submit" className="primary" disabled={uploading}>
                            {uploading ? "Saving..." : "Save Changes"} 
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(`/listing/${id}`)}
                            disabled={uploading}
                            style={{ marginTop: "1rem"}}
                            ></button>
                    </div>

                </form>
            </div>
        </div>
    )

}