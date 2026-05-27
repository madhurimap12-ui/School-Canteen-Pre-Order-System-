@echo off
REM Smart Canteen Pre-Order System - Automated Setup Script for Windows

echo ======================================
echo Canteen Pre-Order System - Setup
echo ======================================

REM Create server folder
if not exist "server" (
    mkdir server
    echo [✓] Created server folder
) else (
    echo [!] Server folder already exists
)

REM Create client folder
if not exist "client" (
    mkdir client
    echo [✓] Created client folder
) else (
    echo [!] Client folder already exists
)

echo.
echo ======================================
echo Step 1: Setting up Backend (Server)
echo ======================================

if exist "server\package.json" (
    echo [!] Server package.json already exists
) else (
    cd server
    call npm init -y
    echo [✓] Initialized server with npm
    cd ..
)

echo Installing backend dependencies...
cd server
call npm install express cors dotenv bcryptjs jsonwebtoken mysql2 sequelize qrcode --save
call npm install --save-dev nodemon
echo [✓] Backend dependencies installed
cd ..

echo.
echo ======================================
echo Step 2: Setting up Frontend (Client)
echo ======================================

if exist "client\package.json" (
    echo [!] Client package.json might exist. Checking...
    cd client
    call npm install
    cd ..
) else (
    cd client
    call npx create-react-app . --template minimal 2>nul || (
        echo Creating React app manually...
        call npm init -y
    )
    call npm install react-router-dom axios qrcode.react --save
    cd ..
)

echo [✓] Frontend dependencies installed

echo.
echo ======================================
echo Step 3: Creating Environment Files
echo ======================================

REM Create .env for server if it doesn't exist
if not exist "server\.env" (
    (
        echo PORT=5000
        echo NODE_ENV=development
        echo DB_HOST=localhost
        echo DB_USER=canteen_user
        echo DB_PASSWORD=canteen_password_123
        echo DB_NAME=canteen_db
        echo DB_PORT=3306
        echo JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
    ) > "server\.env"
    echo [✓] Created server/.env
) else (
    echo [!] server/.env already exists
)

REM Create .env for client if it doesn't exist
if not exist "client\.env" (
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
    ) > "client\.env"
    echo [✓] Created client/.env
) else (
    echo [!] client/.env already exists
)

echo.
echo ======================================
echo ✓ Setup Complete!
echo ======================================
echo.
echo Next Steps:
echo 1. Install MySQL: https://dev.mysql.com/downloads/windows/installer/
echo 2. Create database using commands in SETUP_PHASE1.md
echo 3. Run backend: cd server ^&^& npm run dev
echo 4. Run frontend: cd client ^&^& npm start (in another terminal)
echo.
pause
