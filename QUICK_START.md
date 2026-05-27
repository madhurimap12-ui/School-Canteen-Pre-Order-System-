# 🚀 QUICK START - Phase 1 Action Plan

## What You Need To Do NOW

### Step 1: Install MySQL (5 minutes)
1. Go to: https://dev.mysql.com/downloads/windows/installer/
2. Download: mysql-installer-community-8.0.x.msi
3. Run the installer
4. Choose "Server only" or "Full"
5. Configure MySQL Server (default settings fine)
6. **Remember the root password you set!**
7. Complete installation

### Step 2: Create Database (2 minutes)
1. Open Command Prompt
2. Run: `mysql -u root -p`
3. Enter root password you just set
4. Copy all SQL commands from `DATABASE_SCHEMA.sql` and paste into MySQL console
5. Should see: "Query OK" messages
6. Type: `EXIT;`

### Step 3: Verify MySQL Setup (1 minute)
```bash
mysql -u canteen_user -p canteen_db
# Password: canteen_password_123
# Type EXIT; to close
```

### Step 4: Auto Setup Node Packages (5-10 minutes)
1. Open Command Prompt
2. Navigate to project: `cd "e:\Student Canteen-Pre Order System"`
3. Run: `setup.bat`
4. Wait for completion (you'll see "✓ Setup Complete!")

OR if batch doesn't work, run manually:
```bash
mkdir server client

cd server
npm init -y
npm install express cors dotenv bcryptjs jsonwebtoken mysql2 sequelize qrcode
npm install --save-dev nodemon
cd ..

cd client
npm init -y
npm install react react-dom react-router-dom axios qrcode.react
npm install --save-dev react-scripts
cd ..
```

### Step 5: Create Environment Files (1 minute)

**Create `server\.env`:**
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=canteen_user
DB_PASSWORD=canteen_password_123
DB_NAME=canteen_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
```

**Create `client\.env`:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 6: Test Everything (3 minutes)

**Terminal 1 - Test Backend:**
```bash
cd server
npm run dev
# Should show: Server running on port 5000
# Press Ctrl+C to stop
```

**Terminal 2 - Test Frontend:**
```bash
cd client
npm start
# Should automatically open http://localhost:3000
# Should show React Welcome Page
# Press Ctrl+C to stop
```

---

## 📊 Time Estimate
- MySQL Installation: 5 minutes
- Database Setup: 2 minutes
- Node Setup (auto): 5-10 minutes
- Verification: 5 minutes
- **Total: 15-25 minutes**

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] MySQL installed and running
  ```bash
  mysql --version
  ```

- [ ] Database created
  ```bash
  mysql -u canteen_user -p canteen_db
  ```

- [ ] Node packages installed
  ```bash
  cd server && npm list --depth=0
  cd ../client && npm list --depth=0
  ```

- [ ] Environment files created
  - [ ] `server/.env` exists
  - [ ] `client/.env` exists

- [ ] Backend starts
  ```bash
  cd server && npm run dev
  # Should show: Server running on port 5000
  ```

- [ ] Frontend starts
  ```bash
  cd client && npm start
  # Should open http://localhost:3000
  ```

---

## 🆘 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| "mysql: command not found" | MySQL not installed or not in PATH. Reinstall MySQL. |
| "Cannot connect to database" | MySQL service not running. Check Windows Services. |
| "npm: command not found" | Node.js not installed. Install from nodejs.org |
| "Port 3306 already in use" | Change DB_PORT in server/.env to 3307 |
| "setup.bat doesn't work" | Run manual setup commands instead. |
| "npm install takes forever" | Normal first time. Network might be slow. Be patient. |

---

## 📝 Files Created for You

Already in project folder:
- ✅ `SETUP_INSTRUCTIONS.md` - Detailed guide
- ✅ `DATABASE_SCHEMA.sql` - Database creation script
- ✅ `setup.bat` - Automated setup script
- ✅ `PHASE1_SUMMARY.md` - Complete Phase 1 overview
- ✅ `QUICK_START.md` - This file

---

## 🎯 Next: Phase 2

Once Phase 1 is verified and working:
- I'll create backend starter code (Express server, database connection)
- I'll create React app starter structure
- We'll implement authentication (login/signup)

**Total estimated time for Phase 1: 20-30 minutes**

---

**Let me know once you've completed these steps!** 
Message me when:
1. MySQL is installed
2. Database is created
3. `npm run dev` starts the backend successfully
4. `npm start` starts the frontend successfully

Then we'll move to Phase 2! 🚀

