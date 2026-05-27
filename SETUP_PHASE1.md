# Phase 1 Setup Guide - Smart Canteen Pre-Order System

## Step 1: MySQL Installation & Setup

### 1.1 Download and Install MySQL
1. Go to https://dev.mysql.com/downloads/windows/installer/
2. Download "mysql-installer-community-8.0.x.msi"
3. Run installer and follow the setup wizard:
   - Choose "Server only" or "Full" installation
   - Configure MySQL Server (port 3306, default)
   - Create MySQL as a Windows Service (checked by default)
4. Remember the **root password** you set during installation

### 1.2 Verify MySQL Installation
Open Command Prompt and run:
```bash
mysql --version
```

Should show: `mysql  Ver 8.0.x for Win64 on x86_64`

### 1.3 Create Database
Open Command Prompt and connect to MySQL:
```bash
mysql -u root -p
```
(Enter your root password when prompted)

Then run these commands:
```sql
CREATE DATABASE canteen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'canteen_user'@'localhost' IDENTIFIED BY 'canteen_password_123';
GRANT ALL PRIVILEGES ON canteen_db.* TO 'canteen_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Verify:
```bash
mysql -u canteen_user -p canteen_db
```
(Enter password: canteen_password_123)

If connected successfully, type `EXIT;` to close.

---

## Step 2: Project Folder Structure Setup

Open Command Prompt in your project root (`e:\Student Canteen-Pre Order System`) and run:

```bash
# Create server and client folders if they don't exist
mkdir server client

# Navigate to server folder and initialize it
cd server
npm init -y
```

---

## Step 3: Backend (Server) Setup

From within the `server` folder, run:

```bash
# Install backend dependencies
npm install express cors dotenv bcryptjs jsonwebtoken mysql2 sequelize qrcode

# Install dev dependencies
npm install --save-dev nodemon
```

Then create the following folder structure inside `server`:
```
server/
├── src/
│   ├── index.js
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   └── OrderItem.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── controllers/
│   ├── middleware/
│   │   └── auth.js
│   └── utils/
│       └── qrcode.js
├── .env
└── package.json
```

Create `.env` file in `server` folder with:
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

---

## Step 4: Frontend (Client) Setup

From the project root, navigate to client folder:

```bash
cd client
npm install
```

Update `package.json` in client to include:
```json
{
  "name": "canteen-client",
  "version": "1.0.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "axios": "^1.6.0",
    "qrcode.react": "^1.0.1"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Install additional dependencies:
```bash
npm install react-router-dom axios qrcode.react
```

Create `.env` file in `client` folder:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Step 5: Verify Setup

### Test Backend
```bash
cd server
npm run dev
```
Should show: `Server running on port 5000`

### Test Frontend (in another terminal)
```bash
cd client
npm start
```
Should open React app on `http://localhost:3000`

---

## Folder Structure Overview (After All Setup)

```
e:\Student Canteen-Pre Order System\
├── server/
│   ├── src/
│   │   ├── index.js
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── .env
│   └── package.json
├── client/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
├── package.json (root)
├── README.md
└── SETUP_PHASE1.md (this file)
```

---

## Troubleshooting

### MySQL Connection Errors
- Verify MySQL service is running: `Services` (Windows) → search "MySQL80" → should be running
- Check if port 3306 is not blocked by firewall
- Verify username and password in `.env` file

### npm install fails
- Delete `node_modules` folder and `package-lock.json`
- Run `npm cache clean --force`
- Run `npm install` again

### Port 5000 already in use
- Change PORT in `.env` file to 5001, 5002, etc.
- Or find process using port 5000: `netstat -ano | findstr :5000` and kill it

---

## Next Steps
Once this setup is complete:
1. Create database schema (database.js)
2. Set up Sequelize models
3. Create authentication API endpoints
4. Build React components for login/signup

