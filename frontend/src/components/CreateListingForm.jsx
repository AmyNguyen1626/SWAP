import { useState } from "react";

export default function CreateListingForm() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        condition: "",
        category: "",
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
        <div>
            <h2>Create New Listing</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Listing Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </label>

                <label>
                    Condition:
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
                    Category:
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required />
                </label>

                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </label>

                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
                </label>

                <label>
                    Upload Images (3-4):
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                </label>

                <button type="submit">Submit Listing</button>
            </form>
        </div>
    );
}
