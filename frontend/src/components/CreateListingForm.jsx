import { useState } from "react";
import "./CreateListingForm.css"

export default function CreateListingForm() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        condition: "",
        category: "", // (??)
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
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                </label>
                {/* engine, make, model, type, year */}

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
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                </label>

                <button type="submit">Submit Listing</button>
            </form>
        </div>
    );
}
