const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");
const { getFirestore } = require("firebase-admin/firestore");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();
const db = getFirestore();

// Configure Cloudinary from env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer - store files on disk temporarily
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
});

// Upload single file to Cloudinary, returns secure_url
function uploadToCloudinary(filePath) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, { folder: "swap-listings" }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
        });
    });
}

// POST /api/listings
// Protected route: verifyToken middleware ensures req.user exists
router.post("/", verifyToken, upload.array("images", 10), async (req, res) => {
    // req.user populated by verifyToken middleware (decoded token)
    try {
        const { listingName, price, condition, location, description } = req.body;
        const category = req.body.category ? JSON.parse(req.body.category) : null;

        // Check required fields
        if (!listingName || !price || !condition || !location) {
            req.files?.forEach(f => fs.unlinkSync(f.path));
            return res.status(400).json({ error: "Missing required fields (listingName, price, condition, location)" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        // Upload files to Cloudinary in parallel
        const uploadPromises = req.files.map(file => uploadToCloudinary(file.path));
        const imageUrls = await Promise.all(uploadPromises);

        // Remove temp files
        req.files.forEach(f => {
            fs.unlink(f.path, (err) => {
                if (err) console.warn("Failed to delete temp file", f.path, err);
            });
        });

        // Build listing object
        const listing = {
            listingName,
            price: Number(price),
            condition,
            location,
            description: description || "",
            category: category || {},
            images: imageUrls,
            status: "active",
            userId: req.user.uid || req.user.claims?.user_id || req.user.user_id, // whichever decoded token exposes
            createdAt: new Date().toISOString(),
        };

        // Save to Firestore (collection: listings)
        const docRef = await db.collection("listings").add(listing);

        return res.status(201).json({ id: docRef.id, ...listing });
    } catch (err) {
        // cleanup temp files on error if exist
        if (req.files) {
            req.files.forEach(f => {
                try { fs.unlinkSync(f.path); } catch (e) { }
            });
        }
        console.error("Error in /api/listings:", err);
        return res.status(500).json({ error: "Failed to create listing", details: err.message });
    }
});

// GET all listings
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("listings").orderBy("createdAt", "desc").get();
    const listings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(listings);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

module.exports = router;
