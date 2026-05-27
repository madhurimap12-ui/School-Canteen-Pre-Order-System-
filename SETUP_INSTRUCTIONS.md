# Phase 1 Complete Setup Instructions

## Quick Start (Windows)

### Option 1: Automated Setup (Recommended)
1. Open Command Prompt in project root
2. Run: `setup.bat`
3. This will automatically create folders and install dependencies

### Option 2: Manual Setup

#### 1. Install MySQL (One-time setup)
```bash
# Download from: https://dev.mysql.com/downloads/windows/installer/
# Run the MSI installer and complete the installation
# Remember the root password you set
```

#### 2. Create Database
```bash
# Open Command Prompt and run:
mysql -u root -p

# Inside MySQL console, run:
CREATE DATABASE canteen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'canteen_user'@'localhost' IDENTIFIED BY 'canteen_password_123';
GRANT ALL PRIVILEGES ON canteen_db.* TO 'canteen_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Project Setup
```bash
# In project root directory:
mkdir server client

# Setup Backend
cd server
npm init -y
npm install express cors dotenv bcryptjs jsonwebtoken mysql2 sequelize qrcode
npm install --save-dev nodemon
cd ..

# Setup Frontend  
cd client
npm init -y
npm install react react-dom react-router-dom axios qrcode.react
npm install --save-dev react-scripts
cd ..
```

#### 4. Create Environment Files

**server/.env**
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

**client/.env**
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Verification Steps

### 1. Check MySQL Connection
```bash
mysql -u canteen_user -p canteen_db
# Password: canteen_password_123
# Should connect successfully
# Type: EXIT; to close
```

### 2. Check Node.js Installation
```bash
node --version
npm --version
# Should show version numbers like v18.x.x and 9.x.x
```

### 3. Check Dependencies Installed
```bash
cd server && npm list --depth=0
cd ../client && npm list --depth=0
```

---

## Expected Folder Structure

After setup, you should have:

```
e:\Student Canteen-Pre Order System\
├── server/
│   ├── node_modules/
│   ├── package.json
│   ├── .env
│   └── (backend code files will be added next)
├── client/
│   ├── node_modules/
│   ├── package.json
│   ├── .env
│   └── (React files)
├── package.json
├── setup.bat
└── SETUP_PHASE1.md
```

---

## Next Phase (Phase 1B: Database Schema)

After dependencies are installed, we'll:
1. Create Sequelize models for: User, MenuItem, Order, OrderItem, Category
2. Set up database connection in Node.js
3. Create migration scripts
4. Seed sample data

---

## Troubleshooting

### "npm: command not found"
- Node.js not installed or not in PATH
- Restart computer after Node.js installation
- Verify: `node --version`

### "MySQL port 3306 in use"
- Change PORT in .env to 3307
- Or close other MySQL instance: `netstat -ano | findstr :3306`

### "Cannot find module" errors
- Delete node_modules and package-lock.json
- Run: `npm cache clean --force`
- Run: `npm install` again

### Database connection fails
- Verify MySQL service is running (Services → MySQL80)
- Check credentials in .env match database setup
- Test connection: `mysql -u canteen_user -p canteen_db`

---

## Important Notes

⚠️ **Security**: The database password and JWT_SECRET in this setup are for development only. Change them in production!

✓ **API Port**: Backend will run on http://localhost:5000
✓ **UI Port**: Frontend will run on http://localhost:3000
✓ **Proxy**: Frontend proxies API calls to backend automatically (configured in package.json)

