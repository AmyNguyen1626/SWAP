import { useState } from "react";
import "./CreateListingForm.css"

export default function CreateListingForm() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        condition: "",
        category: {
            engine: "",
            make: "",
            model: "",
            type: "",
            year: "",
        },
        location: "",
        description: "",
        images: [], // 3-4 images (?)
    });

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image uploads
    const handleImageChange = (e) => {
        setFormData({ ...formData, images: [...e.target.files] });
    };

    // Handle form submission
    // TODO: Backend integration to save to database, POST request
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted:", formData);
    };

    return (
        <div className="create-listing-container">
            <h2>Create New Listing</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Listing Name:</p>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    <p>Price:</p>
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                </label>

                <label>
                    <p>Condition:</p>
                    <select name="condition" value={formData.condition} onChange={handleChange} required>
                        <option value="">Select condition</option>
                        <option value="New">New</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                    </select>
                </label>

                <label>
                    <p>Category:</p>
                </label>

                <div className="category-fields">
                    <label>
                        <p>Engine:</p>
                        <input type="text" name="engine" placeholder="Engine" value={formData.category.engine} onChange={handleChange} required />
                    </label>

                    <label>
                        <p>Make:</p>
                        <input type="text" name="make" placeholder="Make" value={formData.category.make} onChange={handleChange} required />
                    </label>

                    <label>
                        <p>Model:</p>
                        <input type="text" name="model" placeholder="Model" value={formData.category.model} onChange={handleChange} required />
                    </label>

                    <label>
                        <p>Type:</p>
                        <input type="text" name="type" placeholder="Type" value={formData.category.type} onChange={handleChange} required />
                    </label>

                    <label>
                        <p>Year:</p>
                        <input type="number" name="year" placeholder="Year" value={formData.category.year} onChange={handleChange} required />
                    </label>
                </div>

                <label>
                    <p>Location:</p>
                    <input type="text" name="location" placeholder="Swap Location" value={formData.location} onChange={handleChange} required />
                </label>

                <label>
                    <p>Description:</p>
                    <textarea name="description" placeholder="Car Description" value={formData.description} onChange={handleChange} rows="4" />
                </label>

                <label>
                    <p>Upload Images (3-4):</p>
                    <div className="file-upload-container">
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />

                        {/* Display either "No file uploaded" or thumbnails */}
                        {formData.images.length === 0 ? (
                            <p className="no-image-text">No image uploaded</p>
                        ) : (
                            <div className="image-previews">
                                {Array.from(formData.images).map((file, index) => {
                                    const url = URL.createObjectURL(file);
                                    return (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`preview-${index}`}
                                            className="thumbnail"
                                        />
                                    );
                                })}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            Upload Images
                        </button>
                    </div>
                </label>

                <button type="submit">Submit Listing</button>
            </form>
        </div>
    );
}
