// seedListings.js - Run this script ONCE to populate your database with test data
// Place this file in: src/utils/seedListings.js

import { createListing } from "../services/firestoreService";

const testListings = [
  {
    userId: "test-user-123", // Replace with a real user ID after registering
    listingName: "2002 Nissan Silvia S15",
    price: 35000,
    location: "Orange, NSW",
    condition: "Very Good",
    description: "Clean JDM import. Spec-R model with original SR20DET engine. Well maintained, full service history. Recent paint job and new coilovers installed.",
    category: {
      make: "Nissan",
      model: "Silvia S15",
      year: 2002,
      type: "Coupe",
      engine: "2.0L SR20DET Turbo"
    },
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
      "https://images.unsplash.com/photo-1552519507-cf0d4c0fef04?w=800"
    ]
  },
  {
    userId: "test-user-123",
    listingName: "2020 Ford Mustang GT Coupe",
    price: 62000,
    location: "Glebe, NSW",
    condition: "Excellent",
    description: "2020 Mustang GT with performance package. 5.0L V8, 460hp. Barely driven, garage kept. Full dealer service history.",
    category: {
      make: "Ford",
      model: "Mustang GT",
      year: 2020,
      type: "Coupe",
      engine: "5.0L V8"
    },
    images: [
      "https://images.unsplash.com/photo-1584345604476-8ec5f5e8e2c1?w=800",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800"
    ]
  },
  {
    userId: "test-user-456",
    listingName: "2013 Jeep Wrangler Unlimited",
    price: 38000,
    location: "Paddington, NSW",
    condition: "Good",
    description: "Lifted Wrangler with 35-inch tires. 3.6L V6, automatic transmission. Perfect for off-roading. Some cosmetic wear but mechanically solid.",
    category: {
      make: "Jeep",
      model: "Wrangler Unlimited",
      year: 2013,
      type: "SUV",
      engine: "3.6L V6"
    },
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"
    ]
  },
  {
    userId: "test-user-456",
    listingName: "1996 Toyota AE86 Trueno",
    price: 28000,
    location: "Macquarie Park, NSW",
    condition: "Good",
    description: "Classic AE86 Trueno. Original 4A-GE engine, 5-speed manual. Some rust but runs great. Drift-ready suspension setup.",
    category: {
      make: "Toyota",
      model: "AE86 Trueno",
      year: 1996,
      type: "Coupe",
      engine: "1.6L 4A-GE"
    },
    images: [
      "https://images.unsplash.com/photo-1552519507-cf0d4c0fef04?w=800",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800"
    ]
  },
  {
    userId: "test-user-789",
    listingName: "2021 Hyundai Santa Fe",
    price: 45000,
    location: "Brisbane, QLD",
    condition: "Excellent",
    description: "Like new Santa Fe with all the features. Leather seats, panoramic sunroof, advanced safety features. Only 15,000 km.",
    category: {
      make: "Hyundai",
      model: "Santa Fe",
      year: 2021,
      type: "SUV",
      engine: "2.5L Turbo"
    },
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"
    ]
  },
  {
    userId: "test-user-789",
    listingName: "2008 Mitsubishi Lancer Evolution X",
    price: 42000,
    location: "Sydney, NSW",
    condition: "Very Good",
    description: "Final generation Evo X. 2.0L turbo, AWD. Stage 2 tune, upgraded intercooler and exhaust. Track-proven performance.",
    category: {
      make: "Mitsubishi",
      model: "Lancer Evolution X",
      year: 2008,
      type: "Sedan",
      engine: "2.0L Turbo I4"
    },
    images: [
      "https://images.unsplash.com/photo-1552519507-cf0d4c0fef04?w=800",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800"
    ]
  },
  {
    userId: "test-user-101",
    listingName: "2019 Nissan GT-R Premium",
    price: 125000,
    location: "Melbourne, VIC",
    condition: "Excellent",
    description: "Pristine GT-R with low kilometers. 3.8L twin-turbo V6, 565hp. Carbon fiber interior trim, launch control. Never tracked.",
    category: {
      make: "Nissan",
      model: "GT-R Premium",
      year: 2019,
      type: "Coupe",
      engine: "3.8L Twin-Turbo V6"
    },
    images: [
      "https://images.unsplash.com/photo-1552519507-cf0d4c0fef04?w=800"
    ]
  },
  {
    userId: "test-user-101",
    listingName: "2017 Dodge Challenger SRT Hellcat",
    price: 75000,
    location: "Adelaide, SA",
    condition: "Very Good",
    description: "Supercharged 6.2L HEMI V8, 707hp. Manual transmission. Red with black stripes. Complete service history.",
    category: {
      make: "Dodge",
      model: "Challenger SRT Hellcat",
      year: 2017,
      type: "Coupe",
      engine: "6.2L Supercharged V8"
    },
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800"
    ]
  }
];

// Function to seed the database
export async function seedDatabase() {
  console.log("Starting to seed database...");
  
  for (const listing of testListings) {
    const result = await createListing(listing);
    if (result.success) {
      console.log(`✅ Created listing: ${listing.listingName}`);
    } else {
      console.error(`❌ Failed to create listing: ${listing.listingName}`, result.error);
    }
  }
  
  console.log("Database seeding complete!");
}

// Uncomment the line below and run this file to seed your database
seedDatabase();