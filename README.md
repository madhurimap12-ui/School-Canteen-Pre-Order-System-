# Smart Canteen Pre-Order Web Application

A comprehensive solution to eliminate long queues in college canteens during break periods.

## Problem Statement
Students face long queues during breaks, making it difficult to purchase food within limited break time. The current single-counter bottleneck prevents efficient service.

## Solution
A pre-order web application enabling students to:
- Browse daily menu
- Filter items by dietary preferences
- Add items to cart
- Complete payment
- Generate unique QR code for collection

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Real-time**: Socket.io (for notifications)
- **Authentication**: JWT

## Project Structure

```
canteen-pre-order-system/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API calls
│   │   ├── store/            # State management (Redux)
│   │   ├── utils/            # Utility functions
│   │   ├── styles/           # CSS modules
│   │   └── App.js
│   ├── public/
│   └── package.json
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── config/           # Configuration files
│   │   ├── utils/            # Utility functions
│   │   └── server.js
│   ├── migrations/           # Database migrations
│   ├── seeds/                # Database seeders
│   ├── .env.example
│   └── package.json
├── docs/                      # Documentation
├── package.json              # Root package.json
└── README.md
```

## Features

### For Students
- 🍽️ **Menu Browsing**: View daily menu with images and descriptions
- 🏷️ **Dietary Filters**: Filter by vegetarian, vegan, gluten-free, etc.
- 🛒 **Cart System**: Add/remove items, adjust quantities
- 💳 **Mock Payment**: Simulate payment processing
- 📱 **QR Code**: Unique code for order collection
- 📋 **Order History**: View past orders
- ⭐ **Feedback**: Rate and review orders

### For Canteen Staff (Admin)
- 📊 **Admin Dashboard**: Monitor active orders
- ➕ **Menu Management**: Add/edit/delete menu items
- 👁️ **Order Tracking**: View order status
- 📈 **Reports**: Sales and traffic analytics
- 📥 **Data Export**: Export orders and analytics

### General Features
- 🔔 **Real-time Notifications**: Order status updates
- 🔐 **Authentication**: Secure login with JWT
- 📱 **Responsive Design**: Mobile-friendly interface

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MySQL (v5.7+)

### Setup

1. Clone the repository
2. Install root dependencies:
   ```bash
   npm install
   ```

3. Setup frontend:
   ```bash
   cd client
   npm install
   ```

4. Setup backend:
   ```bash
   cd server
   npm install
   ```

5. Configure environment variables (see `.env.example`)

6. Run migrations and seeders

## Running the Application

### Development
```bash
npm run dev
```
This runs both client (port 3000) and server (port 5000) concurrently.

### Production
```bash
npm run build
npm start
```

## API Documentation
See `/docs/API.md` for detailed API documentation.

## Database Schema
See `/docs/DATABASE.md` for database structure.

## Contributing
Please follow the existing code style and commit conventions.

## License
ISC
