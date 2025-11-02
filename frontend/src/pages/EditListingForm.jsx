import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { editListing } from "../services/listingService";
//import "./ListingDetail.css";
import"../components/CreateListingForm.css"

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
            try {
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
                alert("Error Loading Listing: " + err.message);
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

            <h2>Edit Your Listing</h2>

                <form className="create-listing-form" onSubmit={handleSubmit}>
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
                        name="badge"
                        value={formData.badge}
                        onChange={handleChange}
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
                        <select
                        name="bodyType"
                        value={formData.bodyType}
                        onChange={handleChange}
                        required
                        >
                            <option value=""> Select Body Type</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                        </select>
                    </label>

                    <label>
                        Transmission:
                        <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                        >
                           <option value="">Select Transmission</option> 
                           <option value="Automatic">Automatic</option> 
                           <option value="Manual">Manual</option>
                           <option value="Semi-Auto">Semi-Auto</option>
                        </select>
                        
                    </label>

                    <label>
                        Drive Type:
                        <select
                        name="driveType"
                        value={formData.driveType}
                        onChange={handleChange}
                        required
                        >
                            <option value="">Select Drive Type</option>
                            <option value="FWD">FWD</option>
                            <option value="RWD">RWD</option>
                            <option value="AWD">AWD</option>
                        </select>
    
                    </label>

                    <label>
                        Fuel Type:
                        <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                        >
                            <option value="">Select Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Electric">Electric</option>
                            <option value="LPG">LPG</option>
                        </select>
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
                        <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                        >
                            <option value="">Select Condition</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Very Good">Very Good</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                        </select>
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

                    <div className="form-section">
                        <label>Images:</label>
                        <input
                        type= "file"
                        multiple
                        accept="image/*" 
                        onChange={handleImageChange}
                        disabled={uploading}
                        />
                        <div className="preview-images">
                            {formData.images.length > 0 ? (
                                formData.images.map((img, idx) => (
                                <img key ={idx} src= {img} alt={`Listing Image ${idx + 1}`} className="preview-thumbnail" />
                             ))
                             ):(
                             <p> No Images Available!</p>
                              )}
                        </div>
                    </div>

                    <div className= "action-buttons" style={{ marginTop: "1rem"}}>
                        <button type="submit" className="primary" disabled={uploading}>
                            {uploading ? "Saving..." : "Save Changes"} 
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(`/listing/${id}`)}
                            disabled={uploading}
                            style={{ marginTop: "1rem"}}
                            >Back To Listing</button>
                    </div>

                </form>
            
        </div>
    )

}