# Smart Canteen Pre-Order System - Complete Development Guide

Welcome! This guide will help you set up and develop the Smart Canteen Pre-Order System from scratch.

## 📚 Documentation Index

Start with these files in order:

1. **QUICK_START.md** ← **START HERE** (5 min read)
   - Quick action checklist
   - Step-by-step instructions
   - Common fixes

2. **SETUP_INSTRUCTIONS.md** (10 min read)
   - Detailed setup options
   - Manual vs automated setup
   - Troubleshooting guide

3. **DATABASE_SCHEMA.sql**
   - SQL to create all 9 tables
   - Sample data included
   - Copy-paste into MySQL console

4. **ARCHITECTURE_OVERVIEW.md** (15 min read)
   - System architecture diagrams
   - Data flow explanations
   - Technology stack overview

5. **PHASE1_SUMMARY.md** (10 min read)
   - Phase 1 complete overview
   - Verification checklist
   - What's included in Phase 1

6. **plan.md** (Session workspace)
   - Complete development roadmap
   - All 7 phases described
   - Success criteria defined

---

## 🎯 What This Project Does

**Problem:** Students in college canteens face long queues during breaks, preventing them from getting food before classes resume.

**Solution:** A web app that lets students:
1. Browse menu from their phone/laptop
2. Add items to cart
3. Pay online
4. Get a unique QR code for collection
5. Skip the queue entirely!

**For Canteen Staff:**
- View all orders in real-time
- Update order status (preparing → ready)
- Manage daily menu
- Track revenue

---

## 🚀 Quick Start (TL;DR)

### 5-Minute Setup
```bash
# 1. Install MySQL from https://dev.mysql.com/downloads/windows/installer/
# 2. Create database (copy SQL from DATABASE_SCHEMA.sql into MySQL console)
# 3. Project setup
cd "e:\Student Canteen-Pre Order System"
setup.bat

# 4. Test
cd server && npm run dev           # Should show "Server on 5000"
# In another terminal:
cd client && npm start             # Should open React app on 3000
```

---

## 📋 Phase Breakdown

### Phase 1: Setup ✓ (You Are Here)
- [x] MySQL installation setup
- [x] Project folder structure
- [x] Database schema design
- [ ] **Your action:** Follow QUICK_START.md steps

### Phase 2: Authentication (Next)
- [ ] User login/signup API
- [ ] JWT token management
- [ ] React login page
- [ ] Auth context for state

### Phase 3: Menu & Products
- [ ] Display menu items
- [ ] Category filtering
- [ ] Search functionality
- [ ] Item details page

### Phase 4: Shopping Cart & Orders
- [ ] Add/remove from cart
- [ ] Checkout flow
- [ ] Mock payment system
- [ ] QR code generation

### Phase 5: Order History
- [ ] Order history page
- [ ] QR code display
- [ ] Order status tracking
- [ ] Order details view

### Phase 6: Admin Panel
- [ ] Admin login
- [ ] Orders dashboard
- [ ] Status update functionality
- [ ] Menu management

### Phase 7: Testing & Deployment
- [ ] Manual workflow testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Deployment setup

---

## 💻 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js | User interface |
| | React Router | Navigation |
| | Axios | API calls |
| | Tailwind CSS | Styling |
| **Backend** | Node.js | Runtime |
| | Express.js | API framework |
| | Sequelize | Database ORM |
| **Database** | MySQL | Data storage |
| **Authentication** | JWT | Secure tokens |
| **Other** | QRCode | Order collection |

---

## 📁 Project Structure

```
e:\Student Canteen-Pre Order System\
├── server/                    # Backend (Port 5000)
│   ├── src/
│   │   ├── index.js
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── package.json
│   └── .env                  (Database credentials)
│
├── client/                    # Frontend (Port 3000)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env                  (API URL)
│
├── DATABASE_SCHEMA.sql        # MySQL setup script
├── setup.bat                  # Automated setup
├── QUICK_START.md            # Start with this!
├── SETUP_INSTRUCTIONS.md
├── ARCHITECTURE_OVERVIEW.md
└── PHASE1_SUMMARY.md
```

---

## 🔧 Prerequisites

- [x] Node.js (you have this already)
- [ ] npm (comes with Node.js)
- [ ] MySQL 8.0+ (need to install)
- [ ] Text editor or IDE (VS Code recommended)
- [ ] Command Prompt / PowerShell
- [ ] ~100 MB disk space

---

## 📝 Setup Steps

### Step 1: Install MySQL
1. Download: https://dev.mysql.com/downloads/windows/installer/
2. Run installer and follow prompts
3. Choose "Server only" or "Full"
4. Configure for default port 3306
5. Remember the **root password**!

### Step 2: Create Database
```bash
mysql -u root -p
# Paste all SQL from DATABASE_SCHEMA.sql
```

### Step 3: Install Node Dependencies
```bash
cd "e:\Student Canteen-Pre Order System"
setup.bat
```

### Step 4: Create Environment Files
```
server/.env:
PORT=5000
DB_HOST=localhost
DB_USER=canteen_user
DB_PASSWORD=canteen_password_123
DB_NAME=canteen_db
JWT_SECRET=your_secret_key_change_in_production

client/.env:
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Test
```bash
# Terminal 1
cd server && npm run dev
# Should show: "Server running on port 5000"

# Terminal 2
cd client && npm start
# Should open http://localhost:3000
```

---

## 🎮 Running the Application

### Development (Recommended for coding)
```bash
# From project root
npm run dev
# Starts both backend and frontend with hot reload
```

### Backend Only
```bash
cd server
npm run dev
# With nodemon (auto-restart on changes)
```

### Frontend Only
```bash
cd client
npm start
# React development server with hot reload
```

### Production Build
```bash
npm run build
# Creates optimized frontend build
```

---

## 📊 Database Overview

### 9 Tables Created:
1. **users** - Student & admin accounts
2. **categories** - Food categories
3. **menu_items** - Food items with prices
4. **orders** - Customer orders
5. **order_items** - Items in each order
6. **carts** - Shopping carts
7. **cart_items** - Cart contents
8. **daily_menu** - Daily availability
9. **audit_logs** - Activity logs

### Sample Data Included:
- 5 categories (South Indian, North Indian, Beverages, Snacks, Desserts)
- 7 menu items (Dosa, Idli, Butter Chicken, etc.)

---

## 🔑 Default Credentials (Development Only)

**Database:**
- Host: localhost
- User: canteen_user
- Password: canteen_password_123
- Database: canteen_db

**Note:** Change these in production!

---

## 📚 API Endpoints (To Be Created)

### Authentication
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
```

### Menu
```
GET    /api/menu/categories
GET    /api/menu/items
GET    /api/menu/items/:id
```

### Orders
```
POST   /api/orders/create
GET    /api/orders/history
GET    /api/orders/:id
```

### Admin
```
GET    /api/admin/orders
PATCH  /api/admin/orders/:id
POST   /api/admin/menu/items
DELETE /api/admin/menu/items/:id
```

---

## 🐛 Troubleshooting

### MySQL Issues
```bash
# MySQL service not running?
# Open Services.msc → Find "MySQL80" → Start

# Can't connect to database?
mysql -u canteen_user -p canteen_db
# Password: canteen_password_123
```

### npm Issues
```bash
# npm install fails?
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Port already in use?
# Change PORT in server/.env
# Or: netstat -ano | findstr :5000
```

### Ports in Use
- Backend: 5000 (change in server/.env)
- Frontend: 3000 (usually free)
- MySQL: 3306 (usually free)

---

## 🎯 Success Criteria

Phase 1 is successful when:
- ✅ MySQL installed and database created
- ✅ Node packages installed in server/ and client/
- ✅ `npm run dev` starts backend on port 5000
- ✅ `npm start` starts frontend on port 3000
- ✅ Can access http://localhost:3000

---

## 📞 Getting Help

If stuck:
1. Check QUICK_START.md → SETUP_INSTRUCTIONS.md
2. Read the error message carefully
3. Search error in ARCHITECTURE_OVERVIEW.md troubleshooting section
4. Check MySQL service is running
5. Verify .env files exist and have correct credentials

---

## 🗓️ Development Timeline

| Phase | Tasks | Time | Status |
|-------|-------|------|--------|
| 1 | Setup, DB design | 30 min | 🔄 In Progress |
| 2 | Authentication | 2 hours | ⏳ Pending |
| 3 | Menu & Products | 2 hours | ⏳ Pending |
| 4 | Cart & Orders | 3 hours | ⏳ Pending |
| 5 | Order History | 1 hour | ⏳ Pending |
| 6 | Admin Panel | 2 hours | ⏳ Pending |
| 7 | Testing & Deploy | 2 hours | ⏳ Pending |
| **TOTAL** | **Full MVP** | **~12 hours** | |

---

## 🎓 Learning Resources

### React.js
- Official Docs: https://react.dev
- Context API Tutorial: https://react.dev/learn/passing-data-deeply-with-context

### Node.js & Express
- Express Guide: https://expressjs.com
- Sequelize ORM: https://sequelize.org

### MySQL
- MySQL Documentation: https://dev.mysql.com/doc
- SQL Tutorial: https://www.w3schools.com/sql

### JWT Authentication
- JWT.io: https://jwt.io
- JWT Best Practices: https://auth0.com/introduce/jwt

---

## ⚠️ Important Notes

1. **Environment Variables**
   - Keep .env files secure
   - Never commit to GitHub
   - Change secrets in production

2. **Database**
   - Backup regularly
   - Don't expose database directly
   - Use prepared statements to prevent SQL injection

3. **Security**
   - Always hash passwords (bcryptjs does this)
   - Validate user input
   - Use HTTPS in production

4. **Performance**
   - Index frequently queried columns
   - Cache menu items (rarely change)
   - Optimize QR code generation

---

## ✨ What's Next

After Phase 1 setup is complete:

1. **Phase 2** will create:
   - Backend: Login/signup endpoints
   - Frontend: Login and signup pages
   - JWT token handling

2. **Phase 3** will create:
   - Backend: Menu API endpoints
   - Frontend: Menu display component
   - Category filtering

3. **Phases 4-7** will build the complete MVP!

---

## 📧 Quick Commands Reference

```bash
# From project root

# Install dependencies
cd server && npm install
cd ../client && npm install

# Development (both backend + frontend)
npm run dev

# Backend only
cd server && npm run dev

# Frontend only
cd client && npm start

# Database
mysql -u canteen_user -p canteen_db

# Check if ports are open
netstat -ano | findstr :5000
netstat -ano | findstr :3000
netstat -ano | findstr :3306
```

---

## 🎉 Summary

You now have:
- ✅ Complete project structure
- ✅ Database schema designed
- ✅ Setup scripts created
- ✅ Documentation for all phases
- ✅ Clear implementation roadmap

**Next Action:** Follow the steps in **QUICK_START.md** to get everything running!

Once you've verified Phase 1 works, I'll create the Phase 2 code (authentication) and we'll keep building! 🚀

---

**Questions?** All documentation is in the project folder. Everything is here to help you succeed!

