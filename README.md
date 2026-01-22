# 🏠 Property Selling Website

> A modern, full-stack real estate platform built with cutting-edge web technologies. Find your dream home with an intuitive interface and powerful search capabilities.

[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-green?logo=mongodb)](https://www.mongodb.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow?logo=firebase)](https://firebase.google.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [API Endpoints](#-api-endpoints)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

- **Property Listings** - Browse hundreds of properties with detailed information
- **Advanced Search & Filters** - Filter by price, location, property type, amenities
- **Property Details** - View comprehensive property information with image gallery
- **Appointment Booking** - Schedule property viewings with agents
- **User Profiles** - Manage your profile, favorites, and booking history
- **Agency Profiles** - Browse agencies and their property listings
- **Review System** - Read and write reviews for properties
- **Responsive Design** - Fully responsive UI for all devices

### 🔐 Authentication & Security

- **Firebase Authentication** - Secure user authentication (Email/Password)
- **JWT Token Security** - Secure API endpoints with JWT
- **Role-Based Access Control** - Different user roles (Admin, Agent, Buyer)
- **Private Routes** - Protected dashboard and user-specific pages

### 📊 Admin Dashboard

- **Property Management** - Add, edit, delete properties
- **User Management** - Manage user accounts and roles
- **Appointment Management** - Track and manage property viewings
- **Analytics Dashboard** - View property statistics and trends
- **Review Moderation** - Manage and approve reviews

### 📱 User Features

- **Favorites** - Save favorite properties for later
- **Search History** - Quick access to previous searches
- **Appointment History** - View all scheduled appointments
- **Property Alerts** - Get notified about new matching properties

---

## 🛠 Tech Stack

### **Frontend**

| Technology            | Version | Purpose                    |
| --------------------- | ------- | -------------------------- |
| **React**             | 19.2.0  | UI Library                 |
| **React Router**      | 7.10.1  | Client-side routing        |
| **Vite**              | 7.2.5   | Build tool & dev server    |
| **Tailwind CSS**      | 4.1.17  | Utility-first CSS          |
| **DaisyUI**           | 5.5.8   | Tailwind component library |
| **Material-UI (MUI)** | 7.3.6   | Advanced UI components     |
| **React Icons**       | 5.5.0   | Icon library               |
| **Firebase**          | 12.7.0  | Authentication             |

### **Backend**

| Technology     | Version | Purpose               |
| -------------- | ------- | --------------------- |
| **Node.js**    | Latest  | Runtime               |
| **Express.js** | 5.2.1   | REST API framework    |
| **MongoDB**    | 7.0.0   | NoSQL database        |
| **JWT**        | 9.0.3   | Token authentication  |
| **CORS**       | 2.8.5   | Cross-origin requests |
| **Dotenv**     | 17.2.3  | Environment variables |

### **Data & State Management**

- **Axios** - HTTP client for API calls
- **React Query (TanStack)** - Server state management
- **React Hook Form** - Form state management

### **UI/UX Enhancements**

- **Lottie Animations** - Interactive animations
- **Swiper** - Touch-enabled slider
- **React Hot Toast** - Notification system
- **SweetAlert2** - Beautiful alerts & modals
- **Google Maps API** - Interactive location display
- **Light Gallery** - Image gallery component
- **Recharts** - Data visualization

### **Development Tools**

- **ESLint** - Code linting
- **Nodemon** - Auto-reload server changes
- **Vercel** - Frontend deployment

---

## 📁 Project Structure

```
propertysellingwebsite/
│
├── client/                              # Frontend Application
│   ├── src/
│   │   ├── pages/                       # Page components
│   │   │   ├── home/                    # Home page
│   │   │   ├── all-property/            # Property listings
│   │   │   ├── property-details/        # Single property details
│   │   │   ├── all-agency/              # Agency listings
│   │   │   ├── agency-profile/          # Agency profiles
│   │   │   ├── contact/                 # Contact page
│   │   │   ├── blog/                    # Blog page
│   │   │   ├── dashboard/               # Admin dashboard
│   │   │   ├── profile/                 # User profile
│   │   │   ├── login/                   # Authentication pages
│   │   │   └── register/
│   │   ├── components/                  # Reusable components
│   │   │   ├── navbar/                  # Navigation bar
│   │   │   ├── footer/                  # Footer
│   │   │   ├── loading/                 # Loading spinner
│   │   │   ├── breadcrumb/              # Breadcrumb navigation
│   │   │   ├── title/                   # Page titles
│   │   │   └── property-details-modal/
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── useProperties.js         # Fetch properties
│   │   │   ├── usePropertyById.js
│   │   │   ├── useAllProperties.js
│   │   │   ├── useAgencies.js
│   │   │   ├── useFavourites.js
│   │   │   ├── useAppointmentsByBuyerEmail.js
│   │   │   ├── useAdmin.js
│   │   │   └── ... (other hooks)
│   │   ├── api/                         # API integration files
│   │   │   ├── properties.api.js        # Property endpoints
│   │   │   ├── user.api.js              # User endpoints
│   │   │   ├── appointment.api.js       # Appointment endpoints
│   │   │   ├── agency.api.js            # Agency endpoints
│   │   │   └── reviews.api.js           # Review endpoints
│   │   ├── axios/                       # Axios configuration
│   │   │   ├── axiosPublic.js           # Public API client
│   │   │   └── axiosSecure.js           # Secure API client
│   │   ├── firebase/                    # Firebase config
│   │   │   └── firebase.init.js
│   │   ├── provider/                    # Context providers
│   │   │   └── AuthProvider.jsx         # Authentication context
│   │   ├── router/                      # Route configuration
│   │   │   ├── Router.jsx               # Main routes
│   │   │   ├── PrivateRoute.jsx         # Protected routes
│   │   │   └── AdminRoute.jsx           # Admin-only routes
│   │   ├── layout/                      # Layout components
│   │   │   ├── MainLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── utils/                       # Utility functions
│   │   │   └── toastUtils.jsx           # Toast notifications
│   │   ├── assets/                      # Static assets
│   │   ├── index.css                    # Global styles
│   │   └── main.jsx                     # Entry point
│   ├── public/                          # Public static files
│   │   └── lotties/                     # Lottie animation files
│   ├── .env.example                     # Environment template
│   ├── vite.config.js                   # Vite configuration
│   ├── eslint.config.js                 # ESLint configuration
│   ├── tailwind.config.js               # Tailwind configuration
│   ├── package.json
│   ├── index.html                       # HTML entry point
│   └── README.md
│
└── property-seling-website-server/      # Backend API
    ├── index.js                         # Server entry point
    ├── .env.example                     # Environment template
    ├── package.json
    └── (routes and controllers)         # API route handlers
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v16+ and **npm** v8+
- **MongoDB** instance (local or cloud)
- **Firebase Account** for authentication
- **Git** for version control

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/propertysellingwebsite.git
cd propertysellingwebsite
```

### Step 2: Frontend Setup

```bash
cd client
npm install
```

### Step 3: Backend Setup

```bash
cd property-seling-website-server
npm install
```

### Step 4: Environment Configuration

Create `.env` files with required variables (see [Environment Variables](#-environment-variables))

### Step 5: Start Development Servers

**Frontend** (from `client/` directory):

```bash
npm run dev
# Opens at http://localhost:5173
```

**Backend** (from `property-seling-website-server/` directory):

```bash
npm run dev
# Runs on http://localhost:5000
```

---

## 🔐 Environment Variables

### Frontend `.env` (client directory)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend `.env` (server directory)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/property-db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Cors Configuration
CORS_ORIGIN=http://localhost:5173

# Firebase Admin (optional)
FIREBASE_PROJECT_ID=your_project_id
```

---

## 📖 Usage Guide

### For Users (Buyers/Renters)

1. **Sign Up/Login**
   - Click "Register" to create an account
   - Use Firebase email/password authentication
   - Verify your email address

2. **Browse Properties**
   - Go to "All Properties"
   - Use filters (price, location, type)
   - Click property card to view details

3. **Save Favorites**
   - Click heart icon on properties
   - Access from user dashboard

4. **Book Appointments**
   - Open property details
   - Click "Schedule Viewing"
   - Select date and time
   - Submit appointment request

5. **View Reviews**
   - Check reviews on property details page
   - Leave your own review after visiting

### For Agents/Agencies

1. **Login to Dashboard**
   - Access at `/dashboard`
   - View your properties and appointments

2. **Add New Property**
   - Click "Add Property"
   - Fill details and upload images
   - Publish to make visible

3. **Manage Appointments**
   - View all appointment requests
   - Accept/reject bookings

4. **Track Performance**
   - View property statistics
   - Monitor listing performance

### For Admins

1. **User Management**
   - View all users
   - Manage roles and permissions
   - Ban/unban users if needed

2. **Property Moderation**
   - Review pending properties
   - Approve/reject listings
   - Remove inappropriate content

3. **Dispute Resolution**
   - Handle user complaints
   - Manage reviews

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Authentication

```
POST   /auth/register          # User registration
POST   /auth/login             # User login
POST   /auth/logout            # User logout
GET    /auth/me                # Get current user (Protected)
```

### Properties

```
GET    /properties             # Get all properties
GET    /properties/:id         # Get property by ID
POST   /properties             # Create property (Protected)
PUT    /properties/:id         # Update property (Protected)
DELETE /properties/:id         # Delete property (Protected)
GET    /properties/agency/:id  # Get properties by agency
```

### Users

```
GET    /users                  # Get all users (Admin)
GET    /users/:id              # Get user by ID (Protected)
PUT    /users/:id              # Update user (Protected)
DELETE /users/:id              # Delete user (Admin)
GET    /users/role/:role       # Get users by role (Admin)
```

### Appointments

```
GET    /appointments           # Get all appointments (Protected)
POST   /appointments           # Create appointment (Protected)
GET    /appointments/:id       # Get appointment by ID
PUT    /appointments/:id       # Update appointment status
DELETE /appointments/:id       # Cancel appointment
```

### Reviews

```
GET    /reviews                # Get all reviews
GET    /reviews/property/:id   # Get reviews for property
POST   /reviews                # Create review (Protected)
PUT    /reviews/:id            # Update review (Protected)
DELETE /reviews/:id            # Delete review (Protected)
```

### Agencies

```
GET    /agencies               # Get all agencies
GET    /agencies/:id           # Get agency details
POST   /agencies               # Create agency (Protected)
PUT    /agencies/:id           # Update agency (Protected)
```

---

## 📦 Scripts

### Frontend Scripts (client/)

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint checks
```

### Backend Scripts (property-seling-website-server/)

```bash
npm run start      # Start production server
npm run dev        # Start with nodemon (auto-reload)
```

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**

```bash
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy automatically on push

3. **Configure vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend Deployment

**Option 1: Render**

- Connect GitHub repository
- Set environment variables
- Deploy automatically

**Option 2: Railway**

- Connect GitHub repository
- Select Node.js environment
- Configure MongoDB connection
- Deploy

**Option 3: Heroku Alternative (Fly.io)**

- Install Fly CLI
- Run `flyctl launch`
- Configure environment
- Deploy with `flyctl deploy`

### Database Deployment

**MongoDB Atlas** (Recommended)

1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Add to `.env` as `MONGO_URI`

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the Repository**

```bash
git clone https://github.com/yourusername/propertysellingwebsite.git
```

2. **Create Feature Branch**

```bash
git checkout -b feature/AmazingFeature
```

3. **Commit Changes**

```bash
git commit -m 'Add some AmazingFeature'
```

4. **Push to Branch**

```bash
git push origin feature/AmazingFeature
```

5. **Open Pull Request**
   - Describe your changes clearly
   - Reference related issues

### Code Style Guidelines

- Use consistent naming conventions
- Write meaningful commit messages
- Add comments for complex logic
- Follow ESLint rules
- Test your changes before submitting

---

## 📄 License

This project is licensed under the **ISC License**. See [LICENSE](LICENSE) file for details.

---

## 💬 Support & Contact

- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/issues)
- **Discussions**: Join our community discussions
- **Email**: contact@propertysellingwebsite.com

---

## 🙏 Acknowledgments

- **React Team** - For the amazing JavaScript library
- **Tailwind CSS** - For utility-first CSS framework
- **Firebase** - For authentication services
- **MongoDB** - For robust database solutions
- **Community Contributors** - For valuable feedback and contributions

---

## 📈 Project Stats

- **Total Pages**: 10+
- **Components**: 25+
- **API Endpoints**: 25+
- **Database Collections**: 6
- **Lines of Code**: 5000+

---

## 🎯 Roadmap

- [ ] Mobile App (React Native)
- [ ] Virtual Property Tours (3D)
- [ ] AI Property Recommendations
- [ ] Multilingual Support
- [ ] Payment Integration
- [ ] Advanced Analytics Dashboard
- [ ] Video Conferencing for Appointments

---

<div align="center">

**Built with ❤️ for real estate enthusiasts**

[⬆ Back to Top](#-property-selling-website)

</div>
