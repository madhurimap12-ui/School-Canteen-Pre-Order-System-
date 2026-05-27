# 📋 Phase 1 - Visual Overview & Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   SMART CANTEEN SYSTEM                  │
└─────────────────────────────────────────────────────────┘

                        USERS
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌─────────┐  ┌──────────────┐  ┌──────────┐
    │ BROWSER │  │  STUDENT APP │  │ ADMIN UI │
    │(React)  │  │  (React)     │  │ (React)  │
    └────┬────┘  └──────┬───────┘  └─────┬────┘
         │               │                │
         └───────────────┼────────────────┘
                         │
                    HTTP/HTTPS
                         │
         ┌───────────────────────────────────┐
         │   EXPRESS.JS API SERVER           │
         │   (Port 5000)                     │
         │                                   │
         │  Routes:                          │
         │  • /api/auth    (Login/Signup)   │
         │  • /api/menu    (Products)       │
         │  • /api/orders  (Orders)         │
         │  • /api/admin   (Admin Panel)    │
         └───────────────┬───────────────────┘
                         │
                    Database
                         │
         ┌───────────────────────────────────┐
         │      MySQL DATABASE               │
         │   (Port 3306)                     │
         │                                   │
         │  Tables:                          │
         │  ├─ users                         │
         │  ├─ categories                    │
         │  ├─ menu_items                    │
         │  ├─ orders                        │
         │  ├─ order_items                   │
         │  ├─ carts                         │
         │  ├─ daily_menu                    │
         │  └─ audit_logs                    │
         └───────────────────────────────────┘
```

---

## Data Flow Diagram

### Typical User Journey

```
STUDENT
  │
  ├─→ Opens App (React on Port 3000)
  │
  ├─→ Login/Signup
  │    └─→ POST /api/auth/login
  │        └─→ MySQL: Check user credentials
  │        └─→ Returns: JWT Token
  │
  ├─→ Browses Menu
  │    └─→ GET /api/menu/items
  │        └─→ MySQL: Fetch menu items
  │        └─→ Returns: Menu list
  │
  ├─→ Adds to Cart
  │    └─→ Cart stored in localStorage (frontend)
  │
  ├─→ Checkout
  │    └─→ POST /api/orders/create
  │        └─→ MySQL: Create order record
  │        └─→ MySQL: Create order_items
  │        └─→ Returns: Order ID + QR Code
  │
  └─→ Collects Order
       └─→ Show QR Code at Counter
           └─→ Staff scans QR → Updates order status
```

---

## Database Schema Overview

```
┌──────────────────────────────────────────────────────────┐
│                    DATABASE TABLES                       │
└──────────────────────────────────────────────────────────┘

users ─────┬─────────────────────────────────────────────┐
           │                                             │
    PK: id │                                             │
    Fields:│ • email, password_hash, first_name,        │
           │ • role (student/admin), created_at         │
           │                                             │
           └─ Used by: auth, orders, carts, audit_logs  │


categories ────────────────────────────────────────────────┐
    PK: id │                                             │
    Fields:│ • name, description, is_active             │
           │                                             │
           └─ Referenced by: menu_items                 │


menu_items ◄───┬──────────────────────────────────────────┐
    PK: id    │                                           │
    Fields:   │ • name, price, category_id (FK)          │
    FK: cat.. │ • dietary flags (vegan, gluten_free)     │
              │ • available_quantity, is_available       │
              │                                           │
              └─ Referenced by: order_items, carts       │


orders ◄────┬─────────────────────────────────────────────┐
    PK: id │                                              │
    FK: ui │ • user_id (FK), total_amount, status        │
           │ • payment_status, qr_code_data              │
           │ • order_date, estimated_ready_time          │
           │                                              │
           └─ Referenced by: order_items, audit_logs     │


order_items ◄──┐─────────────────────────────────────────┐
    PK: id     │                                         │
    FK: oi     │ • order_id (FK), menu_item_id (FK)      │
    FK: mi     │ • quantity, price_at_purchase           │
               │ (Stores price at time of order)         │
               │                                         │
               └─ Contains items in each order           │


carts ◄────┬────────────────────────────────────────────────┐
    PK: id │                                                │
    FK: ui │ • user_id (FK) - One cart per user             │
           │ • created_at, updated_at                       │
           │                                                │
           └─ Temporary shopping carts                      │


cart_items ◄────┬──────────────────────────────────────────┐
    PK: id     │                                           │
    FK: ci     │ • cart_id (FK), menu_item_id (FK)         │
    FK: mi     │ • quantity (how many of this item)        │
               │                                           │
               └─ Items in carts (many-to-many)           │


daily_menu ─────────────────────────────────────────────────┐
    PK: id  │ • Tracks daily availability of items         │
    FK: mi  │ • menu_item_id (FK), menu_date, quantity    │
            │ • Prevents overselling                       │


audit_logs ──────────────────────────────────────────────────┐
    PK: id  │ • user_id (FK), action, entity_type         │
    FK: ui  │ • old_data (JSON), new_data (JSON)          │
            │ • Track all important changes               │
```

---

## Folder Structure After Setup

```
e:\Student Canteen-Pre Order System\
│
├─ ROOT LEVEL
│  ├─ package.json              (Concurrent dev runner)
│  ├─ setup.bat                 (Automated setup)
│  ├─ QUICK_START.md            (This quick reference)
│  ├─ SETUP_INSTRUCTIONS.md     (Detailed guide)
│  ├─ DATABASE_SCHEMA.sql       (MySQL schema)
│  ├─ PHASE1_SUMMARY.md         (Phase 1 overview)
│  ├─ README.md                 (Original project readme)
│  └─ .gitignore                (Don't commit: node_modules, .env)
│
├─ server/                      (Backend - Port 5000)
│  ├─ src/
│  │  ├─ index.js              (Main app entry)
│  │  ├─ config/
│  │  │  └─ database.js        (Sequelize config)
│  │  ├─ models/
│  │  │  ├─ User.js
│  │  │  ├─ MenuItem.js
│  │  │  ├─ Order.js
│  │  │  └─ OrderItem.js
│  │  ├─ routes/
│  │  │  ├─ auth.js            (Login/Signup)
│  │  │  ├─ menu.js            (Menu items)
│  │  │  ├─ orders.js          (Orders)
│  │  │  └─ admin.js           (Admin panel)
│  │  ├─ middleware/
│  │  │  └─ auth.js            (JWT verification)
│  │  └─ utils/
│  │     └─ qrcode.js          (QR generation)
│  ├─ node_modules/            (Dependencies)
│  ├─ package.json
│  ├─ package-lock.json
│  └─ .env                      (Database credentials)
│
├─ client/                      (Frontend - Port 3000)
│  ├─ src/
│  │  ├─ index.js              (React entry)
│  │  ├─ App.js                (Main component)
│  │  ├─ pages/
│  │  │  ├─ LoginPage.jsx
│  │  │  ├─ MenuPage.jsx
│  │  │  ├─ CartPage.jsx
│  │  │  ├─ CheckoutPage.jsx
│  │  │  ├─ OrderHistoryPage.jsx
│  │  │  └─ AdminPage.jsx
│  │  ├─ components/
│  │  │  ├─ MenuCard.jsx
│  │  │  ├─ CartItem.jsx
│  │  │  └─ OrderCard.jsx
│  │  ├─ services/
│  │  │  └─ api.js             (Axios instance)
│  │  └─ context/
│  │     └─ AuthContext.js     (Auth state)
│  ├─ public/                   (Static files)
│  ├─ node_modules/            (Dependencies)
│  ├─ package.json
│  ├─ package-lock.json
│  └─ .env                      (API URL)
│
└─ database/
   └─ canteen_db               (MySQL database)
      ├─ users
      ├─ categories
      ├─ menu_items
      ├─ orders
      ├─ order_items
      ├─ carts
      ├─ cart_items
      ├─ daily_menu
      └─ audit_logs
```

---

## Technology Stack Summary

```
FRONTEND (Client)
├─ React.js 18         → UI Framework
├─ React Router        → Navigation between pages
├─ Axios              → HTTP client for API calls
├─ QRCode.react       → Display QR codes
└─ Tailwind/CSS       → Styling

BACKEND (Server)
├─ Node.js            → Runtime
├─ Express.js         → Web framework
├─ Sequelize          → ORM (Object-Relational Mapping)
├─ MySQL2            → MySQL connector
├─ JWT               → Token-based auth
├─ bcryptjs          → Password hashing
└─ QRCode            → Generate QR codes

DATABASE
└─ MySQL 8.0+        → Relational database

TOOLS
├─ npm               → Package manager
├─ nodemon           → Auto-restart on changes
└─ concurrently      → Run backend+frontend together
```

---

## Key Concepts Explained

### JWT (JSON Web Tokens)
- User logs in → Server generates token
- Token stored in frontend (localStorage)
- Every API request includes token in header
- Server verifies token, grants access

### QR Codes
- Generated when order is placed
- Contains order ID encoded
- Student shows at counter → Staff scans
- Prevents order mix-ups

### Sequelize ORM
- Converts JavaScript objects to SQL queries
- Define models as classes
- Automatically creates SQL statements
- Easier than writing raw SQL

### Cart System (MVP Approach)
- Cart stored in localStorage (frontend)
- Simple & fast for MVP
- Later can move to backend/database if needed

---

## API Endpoints (To Be Created in Phase 2+)

### Authentication
```
POST   /api/auth/signup          Create new account
POST   /api/auth/login           Login & get token
POST   /api/auth/logout          Logout
GET    /api/auth/profile         Get current user
```

### Menu
```
GET    /api/menu/categories      Get all categories
GET    /api/menu/items           Get menu items
GET    /api/menu/items/:id       Get item details
```

### Orders
```
POST   /api/orders/create        Place new order
GET    /api/orders/history       Get user's orders
GET    /api/orders/:id           Get order details
POST   /api/orders/:id/cancel    Cancel order
```

### Admin
```
GET    /api/admin/orders         All orders (admin only)
PATCH  /api/admin/orders/:id     Update order status
POST   /api/admin/menu/items     Add menu item
DELETE /api/admin/menu/items/:id Delete menu item
```

---

## Environment Variables

### server/.env
```
PORT=5000                    # API server port
NODE_ENV=development         # Environment mode
DB_HOST=localhost           # Database host
DB_USER=canteen_user        # Database user
DB_PASSWORD=...             # Database password
DB_NAME=canteen_db          # Database name
DB_PORT=3306                # Database port
JWT_SECRET=...              # Secret for JWT tokens
```

### client/.env
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Development Mode (Both Backend + Frontend)
```bash
npm run dev
# Runs:
#   - Backend: npm run dev:server → nodemon src/index.js
#   - Frontend: npm run dev:client → react-scripts start
# Both auto-reload on file changes
```

### Production Mode
```bash
# Build frontend
npm run build

# Start backend only (frontend served as static files)
npm start
```

---

**Phase 1 Complete! Ready to start Phase 2: Authentication** 🚀

