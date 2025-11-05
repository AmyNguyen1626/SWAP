<img src="frontend/public/assets/logo.png" alt="Swap Logo" width="150" height="auto"/>

# Swap
From Swapping to Shopping - Find Your Next Ride

## Overview

Swap is an online marketplace that revolutionises the way people buy and sell vehicles by introducing a unique **vehicle exchange feature**. Unlike traditional car selling platforms that only facilitate purchases, Swap enables users to propose direct vehicle trades, eliminating the need to sell first before buying another car. This peer-to-peer platform combines the convenience of modern marketplaces with the flexibility of direct vehicle swapping.

### Target Users

- **Car enthusiasts** looking to trade vehicles without the hassle of selling first
- **Budget-conscious buyers** who want to exchange their current car for something different
- **Private sellers** seeking a direct, peer-to-peer marketplace without dealer fees
- **Collectors** interested in unique vehicle exchanges and finding rare models

### Key Features

**Listing Management**
- Create detailed vehicle listings with a wide range of specifications (year, make, model, odometer, drivetrain, engine, badge, transmission, fuel type, condition, location, and asking price)
- Upload and rearrange multiple images per listing
- Edit or delete existing listings
- View all personal listings in one dashboard

**Marketplace Interaction**
- Browse all available vehicle listings
- Save listings to a personal wishlist
- Make offers to buy vehicles with cash
- Propose vehicle swaps using currently listed vehicles

**Communication & Notifications**
- Real-time messaging system between users
- Exchange contact information
- Notification system for new messages, incoming offers, and offer status updates (accepted/declined)

**Offer Management**
- Track all sent offers (both purchase and swap requests)
- View incoming offers on personal listings
- Accept or decline offers with real-time updates

**Safety & Moderation**
- User reporting system
- Admin dashboard for reviewing and removing fraudulent listings (should be added later due to the timeline for this project)
- Support ticket system via swap.support@gmail.com

### Stack

- **Frontend**: React
- **Backend**: Express
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Image Storage**: Cloudinary
- **Email service**: SMTP
- **Hosting**: Render
- **Additional Libraries**: nodemailer

### Data Sources

- **User-Generated Content**: All vehicle listings, images, and offers are created and managed by registered users
- **Cloud Firestore**: Real-time database storing user profiles, listings, offers, messages, reports, notifications and wishlists
- **Cloudinary**: Cloud-based image storage and management for listing photos
- **Firebase Authentication**: User account management and security
- **Gmail**: Support ticket system for user reports and moderation requests

## What We've Achieved - MVP Implementation 
This section outlines the key milestones and features successfully implemented in our Minimum Viable Product (MVP). Our team worked collaboratively to deliver a fully functional vehicle marketplace with unique swap capabilities.

### Core Infrastructure & Setup

- **Firebase Integration**: Established complete Firebase backend infrastructure including Firestore database configuration with security rules balancing accessibility and data protection
- **Authentication System**: Implemented user registration, login, and session management using Firebase Authentication
- **Database Architecture**: Designed normalised database structure to handle complex relationships between users, listings, offers, and messages
- **Project Management**: Created thorough issue tracking system on GitHub to coordinate team efforts and prevent work duplication

### Navigation & User Interface

- **Global Navigation Bar**: Developed responsive navigation component providing seamless access to all major pages (Home, Browse, About Us, Profile, Chat, Create Listing, Register, Login, Logout)
- **Consistent Design System**: Maintained cohesive styling across the entire application, ensuring all buttons, fonts, and UI elements follow a unified aesthetic

### Listing Management System

- **Browse Page**: Created main marketplace view displaying all available listings with database connectivity
- **Create Listing Page**: Developed detailed form with structured inputs for vehicle specifications:
  - Year, make, model, badge
  - Odometer, drivetrain, engine, transmission, fuel type,
  - Condition, price, location, description
  - Multiple image upload with ordering capability via Cloudinary integration
- **Listing Details Page**: Built dedicated view displaying full listing information when users click on browse entries
- **Edit Functionality**: Enabled users to modify existing listings
- **Delete Capability**: Allowed users to remove their own listings

### Advanced Filter System

- **Database-Driven Options**: Developed method to dynamically generate filter options (e.g., available car makes) by querying the database
- **Enhanced Search**: Improved user ability to find specific vehicles based on multiple criteria

### Profile & Request Management

- **Profile Tabs**: Comprehensive profile section with multiple management views:
  - My Listings: View and manage all personal listings
  - Requests Received: Track incoming buy/swap offers
  - Sent Requests: Monitor outgoing offers and their status
  - Wishlist: Saved listings for later viewing
- **Swap Request Modal System**: Developed sophisticated system tracking multiple interaction states (pending, accepted, declined) across users and listings
- **Offer Types**: Implemented dual offer system supporting both cash purchases and vehicle swap proposals

### Real-Time Features

- **Notification System**: Created real-time notification functionality alerting users to:
  - New chat messages
  - Incoming offers on their listings
  - Offer status updates (accepted/declined)
  - New swap requests
- **Live Updates**: Ensured notifications appear without page refresh

### [Chat & Messaging System]
- Real-time messaging between users
- Contact information exchange
- Report users system

### [Image Upload & Management]
- Cloudinary integration for image storage
- Multiple image upload per listing
- Image reordering functionality

### [User Safety & Moderation]
- User reporting system
- Email integration with swap.support@gmail.com
- Fraudulent listing removal capability

### [Design & Wireframes]
- Figma mockups and design system
- UI/UX planning
- Visual identity and branding
 [ put screenshot of designs here ]

---
### Milestone Summary

✅ **User Authentication** - Complete registration, login, and session management  
✅ **Listing Creation** - Detailed vehicle listing with 10+ specification fields  
✅ **Browse & Search** - Full marketplace view with dynamic filtering  
✅ **Offer System** - Dual offer types (buy and swap) with request management  
✅ **Profile Management** - Multi-tab interface for listings, offers, and wishlist  
✅ **Real-Time Notifications** - Alerts for messages and offer updates  
✅ **Image Management** - Multi-image upload and ordering via Cloudinary  
✅ **Chat System** - Real-time messaging between users  
✅ **Moderation Tools** - User reports suspicious accounts  
✅ **Professional UI/UX** - Consistent, modern design across all pages

### Technical Achievements
- Successfully implemented complex state management for swap request tracking across multiple users
- Achieved real-time data synchronisation using Firestore
- Built scalable database architecture supporting future feature expansion
- Maintained code quality and consistency across team contributions
- Created comprehensive documentation and issue tracking system

## Project Source Code Guide

This section provides a roadmap to navigate our codebase and understand where key features are implemented.

### Project Structure
```
swap/
├── .github/
│   ├── workflows/                      # GitHub Actions workflow for Continuous Integration
│   │   └── ci.yml                      # Runs automated tests on push and pull requests and ensures code passes linting and unit tests
├── frontend/
│   ├── public/
│   │   └── assets/                      # Logo and static assets
│   │   └── favicon.png                  # Favicon for the browser tab
│   │
│   ├── src/
│   │   ├── components/                  # Reusable React components
│   │   │   ├── ConversationList.jsx    # List of conversations component for the logged-in user
│   │   │   ├── ConversationList.css    # CSS styles for the conversation list layout
│   │   │   ├── CreateListingForm.jsx   # Form component allowing users to create a new car listing with fields
│   │   │   ├── CreateListingForm.css   # CSS styles for create new listing form
│   │   │   ├── EditListingForm.jsx     # Form component for editing an existing listing
│   │   │   ├── Filter.jsx              # Filter component for marketplace to filter listings by price, condition, etc.
│   │   │   ├── ListingCard.jsx         # Listing card component for display listing information (image, title, price)
│   │   │   ├── ListingCard.css         # CSS styles for the listing card
│   │   │   ├── Login.jsx               # Login form component to authenticate user with email/password
│   │   │   ├── Login.css               # CSS styles for login form
│   │   │   ├── Message.jsx             # Message component to handles sending and receiving messages for a specific conversation, integrates with ConversationList 
│   │   │   ├── Message.css             # CSS styles for messages, input, and button
│   │   │   ├── Navbar.jsx              # Navigation bar component links to Home, Browse, About Us, Profile, Chat, Create Listing, with email display, and authentication action buttons
│   │   │   ├── Navbar.css              # CSS styles for navigaion bar
│   │   │   ├── NotificationBadge.jsx   # Notification badge component showing count of unread messages or requests
│   │   │   ├── NotificationBadge.css   # CSS styles for notification badge
│   │   │   ├── ProtectedRoute.jsx      # Wrapper component for protecting routes from unauthenticated access
│   │   │   ├── Register.jsx            # Registration form component for creating a new user account
│   │   │   ├── Register.css            # CSS styles for registration form
│   │   │   ├── ReportModal.jsx         # Report modal component allowing users to submit reports users through chat message
│   │   │   ├── ReportModal.css         # CSS styles for report modal
│   │   │   └── SwapRequestModal.jsx    # Request modal to view and send to swap requests for the user’s listings
│   │   │   └── SwapRequestModal.css    # CSS styles for request modal
│   │   │
│   │   ├── contexts/                    # React Context for state management
│   │   │   ├── AuthContext.jsx         # Provides authentication state 
│   │   │   ├── NotificationContext.jsx # Fetches and stores notification counts and custom hool to access in functional components
│   │   │   └── useAuth.js              # Custom hook to access AuthContext in functional components
│   │   │
│   │   ├── pages/                       # Main page components
│   │   │   ├── AboutUs.jsx             # Static page describing the platform, team, and contact info
│   │   │   ├── Browse.jsx              # Marketplace listing page allows filtering, searching, and viewing listings
│   │   │   ├── Browse.css              # CSS styles for Browse page
│   │   │   ├── ChatPage.jsx            # Messaging system page showing conversation list and real-time chat
│   │   │   ├── ChatPage.css            # CSS styles for Chat page
│   │   │   ├── CreateListingPage.jsx   # Page containing CreateListingForm or EditListingForm for managing user listings
│   │   │   ├── Home.jsx                # Landing page for users
│   │   │   ├── ListingDetail.jsx       # Detailed view of a single listing with images, description, and swap/buy options
│   │   │   ├── ListingDetail.css       # CSS styles for Listing Details page
│   │   │   └── Profile.jsx             # User profile page with listings manage tabs
│   │   │   └── Profile.css             # CSS styles for Profile page
│   │   │
│   │   ├── services/                    # Firebase service functions for backend integration
│   │   │   ├── listingService.js       # Create, fetch, update, delete listings
│   │   │   ├── messageService.js       # Create and fetch messages and conversations between users
│   │   │   ├── notificationService.js  # Fetch, mark as viewed, and manage notifications
│   │   │   ├── profileService.js       # Fetch user profile
│   │   │   ├── reportService.js        # Create a report
│   │   │   ├── swapRequestService.js   # Create, fetch, accept, reject, and cancel swap requests
│   │   │   └── wishlistService.js      # Fetch, add/remove, listings from wishlist
│   │   │
│   │   ├── App.jsx                      # Main app component that sets up routes and wraps components with context providers
│   │   ├── index.css                    # Global styling used throughout the application
│   │   └── main.jsx                     # Entry point to render <App /> into the DOM with necessary providers
│   │
│   └── package.json                     # Frontend dependencies and scripts
│
├── backend/
│   ├── __mocks__/
│   │   └── firebase.js                  # Mock Firebase services (Auth, Firestore) for Jest tests (swapRequests and wishlist)
│   │
│   ├── bin/
│   │   └── www                          # Server startup script (entry point for running the Express server)
│   │
│   ├── middleware/                      # Express middleware
│   │   └── authMiddleware.js            # Verifies authentication tokens and user access rights
│   │
│   ├── routes/                          # Express route handlers (API endpoints)
│   │   ├── conversations.js            # Chat/messaging endpoints
│   │   ├── index.js                    # Root routes
│   │   ├── listings.js                 # Listing CRUD operations
│   │   ├── notifications.js            # Notification management
│   │   ├── reports.js                  # User reporting system
│   │   ├── swapRequests.js             # Offer/swap request handling
│   │   ├── users.js                    # User profile management
│   │   └── wishlist.js                 # Wishlist operations
│   │
│   ├── tests/                           # Automated test suite
│   │   ├── middleware/
│   │   │   └── authMiddleware.test.js   # Tests for authentication middleware
│   │   ├── routes/                      # Tests for route handlers (API endpoints)
│   │   │   ├── conversations.test.js
│   │   │   ├── index.test.js
│   │   │   ├── listings.test.js
│   │   │   ├── reports.test.js
│   │   │   ├── swapRequests.test.js
│   │   │   ├── users.test.js
│   │   │   └── wishlist.test.js
│   │   └── utils/
│   │       ├── cloudinaryUploader.test.js # Tests Cloudinary upload helper
│   │       └── email.test.js              # Tests email helper functions
│   │
│   ├── utils/                           # Utility/Helper functions
│   │   ├── cloudinaryUploader.js       # Image upload to Cloudinary
│   │   └── email.js                    # Sending emails service for reports
│   │
│   ├── app.js                           # Sets up Express app, middlewares, and routes
│   ├── firebase.js                      # Firebase Admin SDK configuration
│   ├── jest.config.js                   # Jest configuration for backend tests
│   └── package.json                     # Backend dependencies and scripts
│
├── SCREENSHOTS/                         # Application screenshots
├── README.md                            # This file
└── DEPLOYMENT.md                        # Deployment instructions
```
## Future Outlook

While our MVP successfully delivers core marketplace and swap functionality, we've identified several enhancements that would significantly improve the user experience and platform capabilities:

### Location-Based Features
- **Geographic Filtering**: Implement location-based search allowing users to find listings within a specified radius of their location
- **Distance Calculation**: Display distance from user's location to each listing
- **Location-Based Sorting**: Enable users to sort listings by proximity
- **Geo-Targeted Notifications**: Alert users when new listings appear near their location

### Enhanced Notification System
- **Email Notifications**: Send email alerts for important events (new offers, messages, offer status changes) so users don't need to be actively on the platform
- **Push Notifications**: Implement browser push notifications for real-time alerts
- **Notification Preferences**: Allow users to customise which events trigger notifications

### Advanced Search & Discovery
- **Saved Searches**: Let users save filter combinations and receive alerts for matching new listings
- **Price History**: Track and display price changes over time for listings
- **Similar Listings**: Recommend similar vehicles based on user browsing history
- **Advanced Filters**: Add more filtering options (color, number of owners, service history, etc.)

### User Experience & Interface Enhancements
- **Replace Browser Prompts**: Eliminate all native browser alerts, confirms, and prompts with custom-designed modal dialogs
  - Custom confirmation modals for delete actions (e.g., "Are you sure you want to delete this listing?")
  - Styled success/error notifications instead of alert() popups

### Trust & Safety Enhancements
- **User Verification**: Implement identity verification system for enhanced trust
- **Rating System**: Allow users to rate and review completed transactions
- **Transaction History**: Display user's transaction count and feedback
- **Vehicle History Reports**: Integration with services for listing authenticity
- **Admin Dashboard**: Develop a dedicated admin dashboard to manage reports, flagged users, and suspicious listings efficiently.
- **User Roles & Permissions**: Introduce tiered access (Admin, Verified User, Regular User) to improve platform governance and reporting workflows.

### Social & Community Features
- **User Profiles**: Enhanced profiles with bio, preferences, and transaction history
- **Follow System**: Allow users to follow others and get notified of their new listings
- **Community Forums**: Discussion boards for car enthusiasts
- **Swap Stories**: Feature successful swaps with user testimonials

### Mobile Application
- **Native Mobile Apps**: Develop iOS and Android applications for better mobile experience
- **Camera Integration**: Allow direct photo capture for listing creation
- **Mobile-Optimised Messaging**: Enhanced chat experience for mobile users

### Analytics & Insights
- **Market Insights**: Show average prices, popular makes/models, trending listings
- **Listing Performance**: Provide sellers with view counts, interest metrics
- **Price Recommendations**: Suggest optimal pricing based on market data

### Technical Improvements
- **Image Optimisation**: Implement automatic image compression and optimisation
- **Caching Strategy**: Add caching to improve page load times
- **Role-Based Access Control (RBAC)**: Enforce backend-level access permissions for admins and users.
- **Monitoring & Logging**: Integrate tools like Sentry or Firebase Crashlytics for error tracking and uptime monitoring.

## Team Contributions
Our team successfully collaborated to deliver a comprehensive vehicle marketplace platform through structured project management and clear communication channels.

### Communication & Project Management

**GitHub Project Board**
- Utilised GitHub Projects to create a Kanban-style board tracking all tasks from backlog to completion
- Organised work into clear columns: To Do, In Progress, Review, and Done

**GitHub Issues**
- Created detailed issues for each feature and bug with clear acceptance criteria
- Assigned team members to specific issues to prevent duplication

**Weekly Team Meetings**
- Held regular meetings to discuss progress, blockers, and next steps
- Reviewed upcoming milestones and adjusted priorities as needed
- Conducted code reviews and provided constructive feedback
- Planned sprint goals and distributed workload fairly

**Team Contract**
- Established clear expectations for communication response times
- Defined roles and responsibilities for each team member
- Set coding standards and style guidelines
- Agreed on conflict resolution processes

### Individual Contributions

**Amy Nguyen - RoleFull-Stack & DevOps**
- Set up the project structure with Express backend and React frontend.
- Integrated Firebase Authentication and configured backend user management.
- Created Authentication pages.
- Created Home page.
- Created About Us page (based on Figma design).
- Created Create listing page with rough design.
- Implemented Chat page with conversations list and messages sent and received in realtime.
- Created Report modal in chat box to report suspicious accounts.
- Created Frontend service components for API communication.
- Configured CI/CD pipeline, resolved pipeline issues, handled environment secrets, and updated timeouts to support backend testing.
- Wrote Jest tests for backend endpoints, middleware, and utilities.
- Refactored frontend for better code readability and added comments.
- Helped with project documentation and GitHub issues.

**Hartley Bergan - Full-Stack Developer & Database Architect**
- Firestore database setup and security configuration
- Navigation bar component and routing
- Browse page with dynamic filtering system
- Create listing page with comprehensive specifications
- Listing details page
- Profile management system with multiple tabs
- Swap request modal and offer management system
- Notification system implementation
- UI consistency and styling refinement
- Project documentation and GitHub issue management

**Charlene Ramos - [Role]**
- [To be filled in]
- [Specific features implemented]
- [Components created]
- [Contributions to project]

**Ahnaf Samin - [Role]**
- [To be filled in]
- [Specific features implemented]
- [Components created]
- [Contributions to project]

### Collaboration Highlights

- **Code Reviews**: All pull requests underwent peer review before merging
- **Knowledge Sharing**: Regular discussions about technical decisions and best practices
- **Problem Solving**: Collaborative debugging sessions when encountering challenging issues
- **Design Consistency**: Continuous communication to maintain unified UI/UX across features

### Challenges Overcome

- **Coordination**: Successfully managed dependencies between features to prevent blocking
- **Communication**: Adapted our stand-ups and meetings when coordination issues arose
- **Technical Complexity**: Worked through challenging implementations such as chat systems and swap requests
- **Time Management**: Balanced academic workload with project deadlines effectively

## Test Account
For evaluation and testing purposes, please use the following credentials:

**Username**: test@swap.com  
**Password**: TestSwap2025

This test account has:
- Pre-populated listings
- Sample offers and messages
- Wishlist items
- Various notification states

Feel free to create additional listings, send offers, and test all platform features.

A second account to test communication between users:

**Username**: try@swap.com
**Password**: TrySwap2025

**Reporting Feature Testing**: To test the reporting and moderation functionality:
- Create a new account using a real email address.
- Create a new listing.
- Use one of the above test accounts (test@swap.com or try@swap.com) to send a request for the listing you just created.
- Go to the Chat page, select the conversation with your real email address.
- Send a report against your newly created account.
- Once reported, your account will be automatically suspended, and an email notification will be sent to inform you of the suspension.
- If you create an account with a non-existent email, no email will be received. However, the account will still be deactivated in the system.